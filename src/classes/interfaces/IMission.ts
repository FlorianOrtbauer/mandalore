import { IComponent } from './IComponent';

export interface IMission{
    name: string;  
    priority: string;
    short_desc: string; 
    instruction: string; 
    mission_type: string; 
    component: IComponent; 
 }