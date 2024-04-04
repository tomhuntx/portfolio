import { Component, Input, ViewChild } from '@angular/core';
import { NgbDropdown, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [NgbDropdownModule],
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent {
  @Input() icon = '';
  isOpen = false;
  @ViewChild(NgbDropdown) dropdown: NgbDropdown;

  onClick(): void {
  }

  checkDropdown(): void {
    this.isOpen = this.dropdown.isOpen();
  }
}
