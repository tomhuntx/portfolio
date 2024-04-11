import { Component } from '@angular/core';
import { LinkComponent } from '../link/link.component';

@Component({
  selector: 'app-projects-card',
  standalone: true,
  imports: [LinkComponent],
  templateUrl: './projects-card.component.html',
  styleUrls: ['./projects-card.component.scss'],
})
export class ProjectsCardComponent {}
