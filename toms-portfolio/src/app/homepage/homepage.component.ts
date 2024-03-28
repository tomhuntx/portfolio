import { Component, OnInit } from '@angular/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  standalone: true,
	imports: [NgbTooltipModule],
})
export class HomepageComponent implements OnInit {
  ngOnInit(): void {}
}
