import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EntryService } from '../../services/entry.service';
import { Subscription } from 'rxjs';
import { Entry } from '../../Entry';

@Component({
  selector: 'app-edit-entry',
  templateUrl: './edit-entry.component.html',
  styleUrls: ['./edit-entry.component.css'],
})
export class EditEntryComponent implements OnInit {
  @Input() entry: Entry;
  @Output() onEditEntry: EventEmitter<Entry> = new EventEmitter();
  project: string;
  payType: string;
  reminder: boolean = false;
  date: string;
  timer: boolean = false;
  timerTimer: number;
  hours: string;
  minutes: string;
  notes: string;
  showEditEntry: boolean;
  subscription: Subscription;
  projects = [
    'WCON-Egyptian Telephone Coop Association',
    'WCON-CenturyLink',
    'WCON-TDS',
    'WCON-Shawnee Communications',
    'WCON-Hiawatcha Telephone Company',
  ];
  payTypes = ['REG', 'Per Diem', 'Prevailing Wage'];

  constructor(private entryService: EntryService) {
    this.subscription = this.entryService
      .onToggle()
      .subscribe((value) => (this.showEditEntry = value));
  }

  ngOnInit(): void {
    this.entryService
      .getEntry(this.entry)
      .subscribe((entry) => (this.entry = entry));
  }

  // ngOnInit(): void {}

  ngOnDestroy() {
    // Unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

  onSubmit() {
    const editedEntry = {
      project: this.project,
      payType: this.payType,
      reminder: this.reminder,
      date: this.date,
      timer: this.timer,
      timerTime: this.timerTimer,
      hours: this.hours,
      minutes: this.minutes,
      notes: this.notes,
    };

    this.entryService.editEntry(editedEntry);

    this.reminder = false;
    this.project = '';
    this.payType = '';
    this.date = '';
    this.timer = false;
    this.timerTimer = 0;
    this.hours = '';
    this.minutes = '';
    this.notes = '';
  }
}
