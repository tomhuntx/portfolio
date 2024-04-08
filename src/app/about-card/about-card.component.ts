import { Component, OnInit } from '@angular/core';
import { LinkComponent } from '../link/link.component';

@Component({
  selector: 'app-about-card',
  standalone: true,
  imports: [LinkComponent],
  templateUrl: './about-card.component.html',
  styleUrls: ['./about-card.component.scss'],
})
export class AboutCardComponent implements OnInit {
  age = 23;
  birthDate = new Date('11/06/2000');

  ngOnInit(): void {
    this.age = this.getAge();
  }

  private getAge(): number {
    const today = new Date();
    const birthDate = new Date(this.birthDate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }

  helloThere(): void {
    let audio = new Audio();
    audio.src = 'assets/audio/hello-there.mp3';
    audio.load();
    audio.play();
  }
}
