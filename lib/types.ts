export interface Task {
    title: string;
    priority: 'Critical' | 'High' | 'Medium' | 'Low';
    status: 'Complete' | 'Incomplete' | 'In Progress';
    children?: Task[];
    parentId?: number
    id: number
    tags?: Tag[],
    createdAt?: Date
    updatedAt?: Date
}
  
export interface Tag {
    key: string;
    value: string;
}

export interface CreateTaskRequest {
    title: string;
    priority: 'Critical' | 'High' | 'Medium' | 'Low';
    tags?: Tag[]
    parentId?: number
}

export type ApiResponse = {
    status: 200 | 999;
    data?: any
    message?: string
}