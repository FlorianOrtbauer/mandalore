import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-nav-element',
  templateUrl: './nav-element.component.html',
  styleUrls: ['./nav-element.component.scss']
})
export class NavElementComponent{
  @Input() icon: string; 
  @Input() name: string; 
  @Input() link: string; 
}
