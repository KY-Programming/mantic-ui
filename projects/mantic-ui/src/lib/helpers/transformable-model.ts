import { computed, linkedSignal, OutputEmitterRef, Signal, signal, WritableSignal } from '@angular/core';
import { BooleanLike } from '../models/boolean-like';
import { toBoolean } from './to-boolean';

export interface TransformableModel<TRead, TWrite> extends Signal<TRead> {
    set(value: TWrite): void;
    update(updateFn: (value: TRead) => TRead): void;
    asReadonly(): Signal<TRead>;
}

export interface InheritableModel<TRead, TWrite> extends TransformableModel<TRead, TWrite> {
    setInherited(value: TWrite): void;
}

const createModel = <TRead, TWrite>(
    source: Signal<TRead>,
    change: OutputEmitterRef<TRead>,
    transform: (value: TWrite) => TRead
): TransformableModel<TRead, TWrite> => {
    const state = linkedSignal(() => source());
    const setState = state.set.bind(state);
    const model = state as unknown as TransformableModel<TRead, TWrite>;
    model.set = (value: TWrite): void => {
        const next = transform(value);
        if (Object.is(next, state())) {
            return;
        }
        setState(next);
        change.emit(next);
    };
    model.update = (updateFn: (value: TRead) => TRead): void => {
        const next = updateFn(state());
        if (Object.is(next, state())) {
            return;
        }
        setState(next);
        change.emit(next);
    };
    return model;
};

/**
 * A writable signal that behaves like `model()` but supports a `transform`.
 *
 * `input()` and `output()` are compiler-recognised initializer APIs and must stay as direct
 * class-field initializers — they cannot be created inside a helper. So declare them on the class
 * and hand them to this factory, which wires up the writable state and the change emission:
 *
 * ```ts
 * public readonly activeInput = input<boolean, BooleanLike>(false, { alias: 'active', transform: toBoolean });
 * public readonly activeChange = output<boolean>();
 * public readonly active = transformableModel(this.activeInput, this.activeChange, toBoolean);
 * ```
 *
 * Read with `active()`, write with `active.set(<BooleanLike>)`. A binding on the aliased input flows
 * in (already coerced by the input's own transform) and resets the value WITHOUT re-emitting; an
 * imperative `set`/`update` coerces the value and emits the change output (model two-way semantics).
 */
export const transformableModel = <TRead, TWrite>(
    source: Signal<TRead>,
    change: OutputEmitterRef<TRead>,
    transform: (value: TWrite) => TRead
): TransformableModel<TRead, TWrite> => createModel(source, change, transform);

/**
 * A `transformableModel` for boolean state a container can also impose on the component, like the
 * `readonly`/`disabled` an `m-field` applies to the control it wraps.
 *
 * The container writes through `setInherited`, NOT `set`: an imperative `set` is a value change (it
 * emits, and it outranks the input until the input itself changes), so a container pushing its own
 * default `false` with it would permanently override the component's `[readonly]="true"` binding and
 * emit a change nobody asked for. `setInherited` is a second source instead: the effective value is
 * the component's own input OR the inherited one, so the two can't clobber each other, and no change
 * is emitted — the component's value didn't change, its surroundings did.
 */
export const inheritableBooleanModel = (
    source: Signal<boolean>,
    change: OutputEmitterRef<boolean>
): InheritableModel<boolean, BooleanLike> => {
    const inherited: WritableSignal<boolean> = signal(false);
    const model = createModel<boolean, BooleanLike>(
        computed(() => source() || inherited()),
        change,
        toBoolean
    ) as InheritableModel<boolean, BooleanLike>;
    model.setInherited = (value: BooleanLike): void => inherited.set(toBoolean(value));
    return model;
};
