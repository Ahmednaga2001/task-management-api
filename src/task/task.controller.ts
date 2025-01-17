import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, ValidationPipe } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from 'src/guard/auth.guard';

@Controller('tasks')
@UseGuards(AuthGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  // Create Task
  @Post()
  async create(@Body(new ValidationPipe()) createTaskDto: CreateTaskDto, @Request() req: any) {

    const userId = req.user.id; 
    return this.taskService.create(createTaskDto, userId);
  }

  // Get all tasks for the logged-in user
  @Get()
  async findAll(@Request() req: any) {
    
    const userId = req.user.id;
    return this.taskService.findAll(userId);
  }

  // Get a specific task
  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req: any) {
    const userId = req.user.id;
    return this.taskService.findOne(id, userId);
  }

  // Update a specific task
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto, @Request() req: any) {
    const userId = req.user.id;
    return this.taskService.update(id, updateTaskDto, userId);
  }

  // Delete a specific task
  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req: any) {
    const userId = req.user.id;
    return this.taskService.remove(id, userId);
  }
}
