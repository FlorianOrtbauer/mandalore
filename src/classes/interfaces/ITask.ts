import { IMission } from './IMission';

export interface ITask {
    id: string;
    mission_id: string;
    mission: IMission;
}
