import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  public getAllTasks(): Task[] {
    return this.tasks;
  }

  public getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  public createTask(createTaskDto: CreateTaskDto): Task {
    const task: Task = {
      id: uuid(),
      ...createTaskDto,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }

  public async deleteTask(id: string): Promise<Task[]> {
    return this.tasks.filter((task) => task.id !== id);
  }

  public async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
