import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss'
})
export class LogoComponent {
  @Input() imageSize: string = 'w-36';
  @Input() textSize: string = 'text-2xl';
  @Input() logoSrc: string = './assets/bandeau.jpg';
  @Input() logoAlt: string = 'RecycleHub';
}
