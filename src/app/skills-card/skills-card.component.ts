import { Component } from '@angular/core';
import { LinkComponent } from '../link/link.component';

@Component({
  selector: 'app-skills-card',
  standalone: true,
  imports: [LinkComponent],
  templateUrl: './skills-card.component.html',
  styleUrls: ['./skills-card.component.scss'],
})
export class SkillsCardComponent {}
