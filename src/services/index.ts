import { NotificationService } from "./NotificationService";
import { ProjectService } from "./ProjectService";

// Vamos a tener los servicios en un solo lugar y exportarlos desde aquí
export const projectService = new ProjectService();
export const notificationService = new NotificationService();