import { IMission } from './IMission';

export interface ITask {
    id: string;
    remark: string;
    mission: IMission;
    mission_id: string;
}
