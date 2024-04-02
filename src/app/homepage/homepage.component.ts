import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NavButtonComponent } from "../nav-button/nav-button.component";
import { DropdownComponent } from "../dropdown/dropdown.component";

@Component({
    selector: 'app-homepage',
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.scss'],
    standalone: true,
    encapsulation: ViewEncapsulation.None,
    imports: [NgbTooltipModule, NavButtonComponent, DropdownComponent]
})
export class HomepageComponent implements OnInit {
  ngOnInit(): void {}
}
