import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UiService } from '../../services/ui.service';
import { Subscription } from 'rxjs';
import { Entry } from '../../Entry';

@Component({
  selector: 'app-add-entry',
  templateUrl: './add-entry.component.html',
  styleUrls: ['./add-entry.component.css'],
})
export class AddEntryComponent implements OnInit {
  @Output() onAddEntry: EventEmitter<Entry> = new EventEmitter();
  project: string;
  payType: string;
  reminder: boolean = false;
  date: string;
  timer: boolean = false;
  timerTimer: number;
  hours: string;
  minutes: string;
  notes: string;
  showAddEntry: boolean;
  subscription: Subscription;
  projects = [
    'WCON-Egyptian Telephone Coop Association',
    'WCON-CenturyLink',
    'WCON-TDS',
    'WCON-Shawnee Communications',
    'WCON-Hiawatcha Telephone Company',
  ];
  payTypes = ['REG', 'Per Diem', 'Prevailing Wage'];

  constructor(private uiService: UiService) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showAddEntry = value));
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    // Unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

  onSubmit() {
    const newEntry = {
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

    this.onAddEntry.emit(newEntry);

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
