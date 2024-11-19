import { Project } from '../models/Project';
import { Task, TaskStatus } from '../models/Task';
import { initialProject } from '../data/initialData';

export class ProjectService {
  private projects: Project[] = [initialProject];

  // Añadir proyecto
  addProject(project: Project): void {
    this.projects.push(project);
  }

  // Obtener un proyecto por ID
  getProject(projectId: string): Project | undefined {
    return this.projects.find(p => p.id === projectId);
  }

  // Añadir tarea a un proyecto
  addTaskToProject(projectId: string, task: Task): boolean {
    const project = this.projects.find(p => p.id === projectId);
    if (!project) return false;

    project.tasks.push(task);
    return true;
  }

  // Generar resumen del proyecto
  generateProjectSummary(projectId: string): Record<TaskStatus, number> | null {
    const project = this.projects.find(p => p.id === projectId);
    if (!project) return null;

    return project.tasks.reduce((summary, task) => {
      summary[task.status] = (summary[task.status] || 0) + 1;
      return summary;
    }, {} as Record<TaskStatus, number>);
  }

  // Ordenar tareas por fecha límite
  sortTasksByDueDate(projectId: string): Task[] | null {
    const project = this.projects.find(p => p.id === projectId);
    if (!project) return null;

    return [...project.tasks].sort((a, b) =>
      a.dueDate.getTime() - b.dueDate.getTime()
    );
  }

  // ** Las siguientes funciones son parte de la SOLUCIÓN 2 **
  // Están en español porque así estaban requeridas en la prueba

  // Filtrar tareas en base a una función de orden superior
  public filtrarTareasProyecto(projectId: string, filterFn: (task: Task) => boolean): Task[] {
    const project = this.getProject(projectId);
    if (!project) return [];
    return project.tasks.filter(filterFn);
  }

  // Calcular tiempo restante
  // En este caso, como hablamos en clase, vamos a sumar los días restantes de las tareas pendientes
  // Si bien esto genera un número de poca utilidad real, es una demostración de reduce
  public calcularTiempoRestante(projectId: string): number {
    const project = this.getProject(projectId);
    if (!project) return 0;

    return project.tasks
      .filter(task => task.status === TaskStatus.PENDING)
      .reduce((total, task) => {
        const daysLeft = Math.max(0, Math.ceil(
          (task.dueDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
        ));
        return total + daysLeft;
      }, 0);
  }

  // Obtener tareas críticas
  public obtenerTareasCriticas(projectId: string): Task[] {
    const project = this.getProject(projectId);
    if (!project) return [];

    const DIAS_CRITICOS = 3;
    return project.tasks.filter(task => {
      if (task.status === TaskStatus.COMPLETED) return false;

      const diasRestantes = Math.ceil(
        (task.dueDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
      );
      return diasRestantes <= DIAS_CRITICOS;
    });
  }
}
