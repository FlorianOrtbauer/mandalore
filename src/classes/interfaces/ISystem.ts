import { IArea } from './IArea';

export interface ISystem {
    id: string; 
    name: string; 
    priority: string; 
    area_id: string;
    area: IArea;  
}
