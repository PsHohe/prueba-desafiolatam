import { Project } from "models/Project";
import { Task, TaskStatus } from "models/Task";
import { projectService } from "services";

// Funciones que simulan operaciones asíncronas (API)
export const cargarDetallesProyecto = (id: string): Promise<Project|null> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(projectService.getProject(id) || null);
    }, 1000);
  });
};

// Nota: Agregué un parámetro 'fails' para simular un error. Esto, obviamente no tiene sentido en un proyecto real.
export const actualizarEstadoTarea = (task: Task, newStatus: TaskStatus, fails = false): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!fails) { // Para simular un error
        task.status = newStatus;
        resolve();
      } else {
        reject(new Error("Error en la actualización de la tarea"));
      }
    }, 500);
  });
};
