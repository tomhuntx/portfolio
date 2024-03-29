import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NavButtonComponent } from "../nav-button/nav-button.component";

@Component({
    selector: 'app-homepage',
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.scss'],
    standalone: true,
    encapsulation: ViewEncapsulation.None,
    imports: [NgbTooltipModule, NavButtonComponent]
})
export class HomepageComponent implements OnInit {
  ngOnInit(): void {}
}
