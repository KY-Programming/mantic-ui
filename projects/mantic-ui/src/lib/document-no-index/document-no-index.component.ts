import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'm-document-no-index',
  template: ''
})
export class DocumentNoIndexComponent implements OnInit, OnDestroy {

  public ngOnInit(): void {
    const robotsMetaElement = document.querySelector('meta[name=robots]') as HTMLMetaElement;
    if (robotsMetaElement) {
      robotsMetaElement.content = 'noindex';
    } else {
      const element = document.createElement('meta') as HTMLMetaElement;
      element.name = 'robots';
      element.content = 'noindex';
      document.head.appendChild(element);
    }
  }

  public ngOnDestroy(): void {
    const robotsMetaElement = document.querySelector('meta[name=robots]') as HTMLMetaElement;
    if (robotsMetaElement) {
      robotsMetaElement.content = 'index';
    }
  }

}
