import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-action-menu',
  templateUrl: './action-menu.component.html',
  styleUrls: ['./action-menu.component.scss']
})
export class ActionMenuComponent {
  isMenuOpen: boolean = false;

  @Input() requestId!: string;
  @Output() edit = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  onEdit(): void {
    this.edit.emit(this.requestId);
    this.isMenuOpen = false;
  }

  onDelete(): void {
    this.delete.emit(this.requestId);
    this.isMenuOpen = false;
  }
}
