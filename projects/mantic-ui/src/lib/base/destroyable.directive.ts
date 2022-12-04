import { Directive } from '@angular/core';
import { Destroyable } from './destroyable';

/**
 * @deprecated Use Destroyable instead
 */
@Directive()
export abstract class DestroyableDirective extends Destroyable {
}
