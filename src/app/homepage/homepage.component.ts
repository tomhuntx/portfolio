import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NavButtonComponent } from '../nav-button/nav-button.component';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    NgbTooltipModule,
    NavButtonComponent,
    DropdownComponent,
    RouterOutlet,
  ],
})
export class HomepageComponent {}
