import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  // Create a Task
  async create(createTaskDto: CreateTaskDto, userId: string){
    
    const task = new this.taskModel({ ...createTaskDto, user: userId });
     await task.save();
     return {message : "Task created successfully" , data : task};
  }

  // Find all tasks for a user
  async findAll(userId: string){
    const tasks = await this.taskModel.find({ user: userId });
    const totalTasks = tasks.length;
    return { totalTasks , data : tasks };
  }

  // Find a single task
  async findOne(id: string, userId: string){
    const task = await this.taskModel.findOne({ _id: id, user: userId }).exec();
    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return {data : task};
  }

  // Update a task
  async update(id: string, updateTaskDto: UpdateTaskDto, userId: string){
    const task = await this.taskModel
      .findOneAndUpdate({ _id: id, user: userId }, updateTaskDto, { new: true })
    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return {message : "Task updated successfully" , data : task};
  }

  // Delete a task
  async remove(id: string, userId: string) {
    const result = await this.taskModel.deleteOne({ _id: id, user: userId }).exec();
    console.log(result);
    
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }
}
