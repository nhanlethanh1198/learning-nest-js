import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task as TaskData } from './tasks.entity';
import { Task, TaskStatus } from './tasks.model';
import { TasksService } from './tasks.service';
@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({
    status: 200,
    description: 'Get All Tasks.',
    type: TaskData,
    isArray: true,
  })
  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): Promise<Task[]> {
    return this.tasksService.deleteTask(id);
  }

  @Patch('/:id/status')
  async updateTaskStatus(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ): Promise<Task> {
    return this.tasksService.updateTaskStatus(id, status);
  }
}
