import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api-service.service';



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

  constructor(private conn: ApiService) { 
    this.showConfig();
  }

 

  showConfig() {
    this.conn.getConfig()
      .subscribe(data => {
        console.log("what is dis?")

      });
  }
    
    
    
    
    
    
    // = () => {
    //   this.conn.getconnection().subscribe (data => {
    //       this.sites = data;
    //       console.log("connection success"); 
    //     },
    //     error => {
    //       console.log("what is dis");
    //     }
    //   )
    // }
  

  ngOnInit() {
  }

}

export interface Config {
  heroesUrl: string;
  textfile: string;
}
