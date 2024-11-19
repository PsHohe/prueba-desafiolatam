import { NotificationService } from '../services/NotificationService';
import { Task, TaskStatus } from '../models/Task';
import { Project } from '../models/Project';
import { projectService, notificationService } from '../services';
import { actualizarEstadoTarea, cargarDetallesProyecto } from 'utils/asyncFunctions';

export const runSolution3 = async () => {
  console.log(`
*****************************************************
*   Solución 3: Sincronización y Actualizaciones    *
*****************************************************
  `);

  // Nuevamente vamos a usar el proyecto existente de ejemplo
  const projectId = "P-001";

  // Configurar listeners de notificaciones
  // Le pasamos un callback a nuestro servicio de notificaciones que usa EventEmitter
  notificationService.onTaskCompleted((task) => {
    console.log(`\n🔔 Notificación: Tarea completada - ${task.description}`);
  });

  notificationService.onTaskUpdated((task) => {
    console.log(`\n🔔 Notificación: Tarea actualizada - ${task.description} (${task.status})`);
  });

  // Simular carga asíncrona de proyecto
  // Las funciones se encuentran en src/utils/asyncFunctions.ts
  console.log("\n1. Cargando detalles del proyecto...");
  try {
    const project = await cargarDetallesProyecto(projectId);
    console.log("Proyecto cargado exitosamente:", project);


    // Crear y añadir una tarea
    const task: Task = {
      id: 1,
      description: "Probar las funciones asíncronas",
      status: TaskStatus.PENDING,
      dueDate: new Date(2024, 11, 20)
    };
    projectService.addTaskToProject(projectId, task);

    // 2. Actualizar estado de tarea
    console.log("\n2. Actualizando estado de tarea...");
    console.log("Estado inicial:");
    console.table(task);
    try {
      await actualizarEstadoTarea(task, TaskStatus.IN_PROGRESS);
      notificationService.notifyTaskUpdated({...task, status: TaskStatus.IN_PROGRESS});
      console.log("Estado actualizado:");
      console.table(task);

      // Simular completar la tarea después de un tiempo
      console.log("\n3. Completando tarea después de 2 segundos...");
      setTimeout(async () => {
        try {
          await actualizarEstadoTarea(task, TaskStatus.COMPLETED);
          notificationService.notifyTaskCompleted({...task, status: TaskStatus.COMPLETED});
          console.log("Estado actualizado:");
          console.table(task);
        } catch (error) {
          console.error("Error al completar la tarea:", error);
        }
      }, 2000);

      // Esperar un segundo
      console.log("\n5. Esperando 3 segundos...");
      await new Promise(resolve => setTimeout(resolve, 3000));

      // simular un error al actualizar la tarea
      console.log("\n4. Simulando un error al actualizar la tarea...");
      setTimeout(async () => {
        try {
          await actualizarEstadoTarea(task, TaskStatus.COMPLETED, true); // true aquí para simular un error
        } catch (error) {
          console.error("Error al actualizar la tarea:", error);
        } finally { // El finally corre incluso si falló la tarea
          console.log("\n\n******** Prueba finalizada ********");
        }
      }, 1000);

    } catch (error) {
      console.error("Error al actualizar la tarea:", error);
    }

  } catch (error) {
    console.error("Error al cargar el proyecto:", error);
  }
};

