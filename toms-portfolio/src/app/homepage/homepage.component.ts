import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  standalone: true,
	imports: [NgbTooltipModule],
  encapsulation: ViewEncapsulation.None
})
export class HomepageComponent implements OnInit {
  ngOnInit(): void {}
}
