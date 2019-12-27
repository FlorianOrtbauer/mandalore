import { IComponent } from './IComponent';

export interface IMission{
    id: string; 
    name: string;  
    priority: string;
    short_desc: string; 
    instruction: string; 
    component: IComponent;
    component_id: string;
 }