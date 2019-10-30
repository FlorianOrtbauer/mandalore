import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {
  showVar : boolean = false;
  
  toggleChild(){
    this.showVar = !this.showVar;
}

  constructor() { }

  ngOnInit() {
  }

}
