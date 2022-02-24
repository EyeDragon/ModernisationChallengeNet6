
export interface ITask {
    id?: number;
    dateCreated?: Date;
    dateModified?: Date;
    dateDeleted?: Date;
    completed?: boolean;
    details?: string;
}