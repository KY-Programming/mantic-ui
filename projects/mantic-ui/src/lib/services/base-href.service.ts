import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseHrefService {

    public get(): string {
        return document.head.querySelector('base')?.href ?? '';
    }
}
