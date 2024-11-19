import { projectService } from 'services';
import { Task, TaskStatus } from '../models/Task';

// Funciones auxiliares para el filtrado de tareas
const isPendingTask = (task: Task) => task.status === TaskStatus.PENDING;
const isInProgress = (task: Task) => task.status === TaskStatus.IN_PROGRESS;


export const runSolution2 = () => {
  console.log(`
*****************************************************
*     Solución 2: Análisis Avanzado de Tareas       * 
*****************************************************
  `);

  // Vamos a usar el proyecto existente de ejemplo
  const projectId = "P-001";


  // Demostrar filtrado de tareas usando función de orden superior
  // Nótese que la función filtrarTareasProyecto se encuentra implementada en el servicio ProjectService
  // en el archivo src/services/ProjectService.ts
  console.log("\n** Tareas pendientes: **");
  const pendingTasks = projectService.filtrarTareasProyecto(projectId, isPendingTask);
  console.table(pendingTasks);

  console.log("\n** Tareas en progreso: **");
  const inProgressTasks = projectService.filtrarTareasProyecto(projectId, isInProgress);
  console.table(inProgressTasks);

  // Calcular tiempo restante total para tareas pendientes
  // Implementada en el servicio ProjectService
  const tiempoRestante = projectService.calcularTiempoRestante(projectId);
  console.log(`\nDías totales restantes para completar tareas pendientes: ${tiempoRestante}`);

  // Obtener tareas críticas (a menos de 3 días)
  // Implementada en el servicio ProjectService
  const tareasCriticas = projectService.obtenerTareasCriticas(projectId);
  console.log("\n** Tareas críticas (menos de 3 días para vencer): **");
  console.table(tareasCriticas);
};
