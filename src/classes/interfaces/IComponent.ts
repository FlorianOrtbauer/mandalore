import { ISystem } from './ISystem';

export interface IComponent {
    id: string; 
    name: string; 
    priority: string; 
    system: ISystem; 
}