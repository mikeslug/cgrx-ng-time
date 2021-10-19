import { Component, OnInit } from '@angular/core';
import { EntryService } from '../../services/entry.service';
import { Subscription } from 'rxjs';
import { Entry } from '../../Entry';
import { Router } from '@angular/router';

@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.css'],
})
export class EntriesComponent implements OnInit {
  entries: Entry[] = [];
  showEditEntry: boolean = false;
  subscription: Subscription;
  constructor(private entryService: EntryService, private router: Router) {
    this.subscription = this.entryService
      .onToggle()
      .subscribe((value) => (this.showEditEntry = value));
  }

  ngOnInit(): void {
    this.entryService
      .getEntries()
      .subscribe((entries) => (this.entries = entries));
  }

  deleteEntry(entry: Entry) {
    this.entryService
      .deleteEntry(entry)
      .subscribe(
        () => (this.entries = this.entries.filter((t) => t.id != entry.id))
      );
  }

  toggleEditEntry(entry: Entry) {
    this.entryService.toggleEditEntry(entry);
    // this.entryService.editEntry(entry).subscribe();
    console.log('edit entry!');
  }

  toggleReminder(entry: Entry) {
    entry.reminder = !entry.reminder;
    this.entryService.updateEntryReminder(entry).subscribe();
  }

  addEntry(entry: Entry) {
    this.entryService
      .addEntry(entry)
      .subscribe((entry) => this.entries.push(entry));
  }
  editEntry(entry: Entry) {
    this.entryService
      .editEntry(entry)
      .subscribe((entry) => this.entries.push(entry));
  }
}
