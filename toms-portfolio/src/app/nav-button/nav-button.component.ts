import { Component, Input, ViewEncapsulation } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-nav-button',
  standalone: true,
  imports: [NgbModule],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './nav-button.component.html',
  styleUrls: ['./nav-button.component.scss']
})
export class NavButtonComponent {
  @Input() icon = '';
  @Input() tooltip = '';
  @Input() url = '';
  @Input() openNewTab = true;

  onClick(): void {
    window.open(this.url, this.openNewTab ? "_blank" : '');
  }
}