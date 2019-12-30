import { IMission } from './IMission';

export interface ITask {
    id: string;
    name: string;
    priority: string;
    short_desc: string;
    instruction: string;
    mission_id: string;
    mission: IMission;
}
