import { IComponent } from './IComponent';

export interface IMission{
    id: string; 
    name: string;  
    priority: string;
    short_desc: string; 
    instruction: string; 
    mission_type: string; 
    component: IComponent; 
 }