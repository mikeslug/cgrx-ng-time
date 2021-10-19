import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Entry } from '../Entry';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class EntryService {
  private apiUrl = 'http://localhost:5000/entries';
  private subject = new Subject<any>();
  private showEditEntry: boolean = false;

  constructor(private http: HttpClient) {}

  getEntries(): Observable<Entry[]> {
    return this.http.get<Entry[]>(this.apiUrl);
  }

  deleteEntry(entry: Entry): Observable<Entry> {
    const url = `${this.apiUrl}/${entry.id}`;
    return this.http.delete<Entry>(url);
  }

  getEntry(entry: Entry): Observable<Entry> {
    const url = `${this.apiUrl}/${entry.id}`;
    return this.http.get<Entry>(url);
  }

  toggleEditEntry(entry: Entry): Observable<Entry> {
    const url = `${this.apiUrl}/${entry.id}`;
    this.showEditEntry = !this.showEditEntry;
    this.subject.next(this.showEditEntry);
    console.log('Show edit form?', url);
    return this.http.get<Entry>(url);
  }

  // toggleEditEntry(): void {
  //   this.showEditEntry = !this.showEditEntry;
  //   this.subject.next(this.showEditEntry);
  // }

  editEntry(entry: Entry): Observable<Entry> {
    const url = `${this.apiUrl}/${entry.id}`;
    return this.http.put<Entry>(url, entry, httpOptions);
  }

  updateEntryReminder(entry: Entry): Observable<Entry> {
    const url = `${this.apiUrl}/${entry.id}`;
    return this.http.put<Entry>(url, entry, httpOptions);
  }

  addEntry(entry: Entry): Observable<Entry> {
    return this.http.post<Entry>(this.apiUrl, entry, httpOptions);
  }

  onToggle(): Observable<any> {
    return this.subject.asObservable();
  }
}
