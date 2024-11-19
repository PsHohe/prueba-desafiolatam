import { Project } from '../models/Project';
import { Task, TaskStatus } from '../models/Task';

// Estos datos responden al punto 1 de la prueba

// Tareas iniciales
const initialTasks: Task[] = [
  {
    id: 1,
    description: "Matricularse en DesafíoLatam",
    status: TaskStatus.COMPLETED,
    dueDate: new Date(2024, 11, 2)
  },
  {
    id: 2,
    description: "Asistir a las primeras clases",
    status: TaskStatus.IN_PROGRESS,
    dueDate: new Date(2024, 11, 20)
  },
  {
    id: 3,
    description: "Entregar desafíos de clases",
    status: TaskStatus.PENDING,
    dueDate: new Date(2024, 11, 25)
  },
  {
    id: 4,
    description: "Completar la primera prueba",
    status: TaskStatus.PENDING,
    dueDate: new Date()
  }
];

// Proyecto inicial
export const initialProject: Project = {
  id: "P-001",
  name: "Desafío Latam 1.0",
  startDate: new Date(2024, 11, 1),
  tasks: initialTasks
};
