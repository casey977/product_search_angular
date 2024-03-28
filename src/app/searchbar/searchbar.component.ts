import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.css'
})
export class SearchbarComponent {
  constructor() {}
  
  searchTerm:string = '';

  @Output() newSearch = new EventEmitter<string>();

  searchChange():void {
    this.newSearch.emit(this.searchTerm);
  }
}