export enum TaskStatus {
  PENDING = 'pendiente',
  IN_PROGRESS = 'en progreso',
  COMPLETED = 'completada'
}

export interface Task {
  id: number;
  description: string;
  status: TaskStatus;
  dueDate: Date;
}