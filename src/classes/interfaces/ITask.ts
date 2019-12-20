import { IMission } from './IMission';

export interface ITask {
    id: string; 
    name: string; 
    priority: string; 
    mission_id: string;
    mission: IMission;
}
