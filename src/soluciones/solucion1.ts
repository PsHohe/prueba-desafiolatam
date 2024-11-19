import { ProjectService } from '../services/ProjectService';
import { Task, TaskStatus } from '../models/Task';
import { Project } from '../models/Project';

export const runSolution1 = () => {
  console.log(`
*****************************************************
*     Solución 1: Gestión de Proyectos y Tareas     *
*****************************************************
  `);

  // Cabe destacar que los modelos pueden encontrarse en src/models
  // Crear instancia del servicio
  const projectService = new ProjectService();

  // Crear tareas de ejemplo
  const task1: Task = {
    id: 5,
    description: "Crear el proyecto",
    status: TaskStatus.COMPLETED,
    dueDate: new Date(2024, 11, 15)
  };

  const task2: Task = {
    id: 6,
    description: "Crear el código",
    status: TaskStatus.IN_PROGRESS,
    dueDate: new Date(2024, 11, 10)
  };

  const task3: Task = {
    id: 7,
    description: "Entregar la prueba",
    status: TaskStatus.PENDING,
    dueDate: new Date(2024, 11, 5)
  };

  // Vamos a usar el proyecto existente de ejemplo
  const projectId = "P-001"

  // Añadir tareas
  projectService.addTaskToProject(projectId, task1);
  projectService.addTaskToProject(projectId, task2);
  projectService.addTaskToProject(projectId, task3);

  // Mostrar resumen
  console.log("** Resumen del proyecto: **")
  const projectSummary = projectService.generateProjectSummary(projectId);
  console.table(Object.entries(projectSummary || {}).map(([status, count]) => ({
    status,
    count
  })));

  // Mostrar tareas ordenadas
  const sortedTasks = projectService.sortTasksByDueDate(projectId);
  console.log("\n** Tareas ordenadas por fecha límite: **")
  console.table(sortedTasks?.map(task => ({
    id: task.id,
    description: task.description,
    dueDate: task.dueDate.toISOString().split('T')[0]
  })));

  // Mostrar proyecto completo
  console.log("\n** Proyecto completo: **");
  console.log(JSON.stringify(projectService.getProject(projectId), null, 2));
};
