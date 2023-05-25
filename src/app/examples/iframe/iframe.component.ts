import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-iframe',
    standalone: true,
    imports: [CommonModule, RouterOutlet],
    templateUrl: './iframe.component.html',
    styleUrls: ['./iframe.component.scss']
})
export class SemanticIframeComponent {

}
