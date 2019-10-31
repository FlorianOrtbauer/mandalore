import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api-service.service';
import { interval } from 'rxjs';




@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {
  showVar : boolean = false;
  alive = true;

  toggleChild(){
    this.showVar = !this.showVar;
}

  constructor(private conn: ApiService) { 
    // secondsCounter.subscribe(n =>{ this.showConfig()});
    this.showConfig();
  }
  
  showConfig() {
    this.conn.getConfig()
      .subscribe(data => {


        let temp = document.getElementsByClassName("status-circle") as HTMLCollectionOf<HTMLElement>
        // console.log("temp");
        temp[0].style.backgroundColor ="green";
     return;
     
      });

  }
  
  
  

  ngOnInit() {
  }

}


const secondsCounter = interval(10000);
