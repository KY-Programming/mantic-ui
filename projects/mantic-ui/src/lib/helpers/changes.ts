import { SimpleChange } from '@angular/core';

/**
 * A type that represents changes of a component. A typed version of SimpleChange.
 * @template T - The type of the component.
 * @example
 * ```typescript
 * ngOnChanges(changes: Changes<MyComponent>) {
 *   if (changes.myInput) {
 *      //...
 *    }
 *  }
 *  ```
 */
export declare type Changes<T> = {
    [P in keyof T]?: SimpleChange;
};
