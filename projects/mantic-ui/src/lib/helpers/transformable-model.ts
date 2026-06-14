import { linkedSignal, OutputEmitterRef, Signal } from '@angular/core';

export interface TransformableModel<TRead, TWrite> extends Signal<TRead> {
    set(value: TWrite): void;
    update(updateFn: (value: TRead) => TRead): void;
    asReadonly(): Signal<TRead>;
}

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
