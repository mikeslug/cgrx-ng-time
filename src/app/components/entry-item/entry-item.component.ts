import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Entry } from '../../Entry';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-entry-item',
  templateUrl: './entry-item.component.html',
  styleUrls: ['./entry-item.component.css'],
})
export class EntryItemComponent implements OnInit {
  @Input() entry: Entry;
  @Output() onDeleteEntry: EventEmitter<Entry> = new EventEmitter();
  @Output() onEditEntry: EventEmitter<Entry> = new EventEmitter();
  @Output() onToggleReminder: EventEmitter<Entry> = new EventEmitter();
  faTimes = faTimes;
  faEdit = faEdit;
  constructor() {}

  ngOnInit(): void {}

  onDelete(entry: Entry) {
    this.onDeleteEntry.emit(entry);
  }
  toggleEditEntry(entry: Entry) {
    this.onEditEntry.emit(entry);
  }
  onToggle(entry: any) {
    this.onToggleReminder.emit(entry);
  }
}
