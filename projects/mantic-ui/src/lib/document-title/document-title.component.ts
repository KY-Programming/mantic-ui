import { Component, DoCheck, ElementRef, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'm-document-title',
  templateUrl: './document-title.component.html',
  styleUrls: ['./document-title.component.scss']
})
export class DocumentTitleComponent implements DoCheck, OnDestroy {
  private previousTitle: string;
  private value: string;
  private title: string;

  public constructor(
      private readonly element: ElementRef<HTMLElement>,
      private readonly titleService: Title
  ) {
  }

  public ngDoCheck(): void {
    const newValue = this.element.nativeElement.innerText;
    if (newValue !== this.value) {
      this.value = newValue;
      if (this.previousTitle === undefined) {
        this.previousTitle = this.titleService.getTitle();
      }
      this.title = this.value;
      this.titleService.setTitle(this.title);
    }
  }

  public ngOnDestroy(): void {
    if (this.titleService.getTitle() === this.title) {
      this.titleService.setTitle(this.previousTitle);
    }
  }
}
