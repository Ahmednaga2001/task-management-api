import { Controller, Get, Post, Body, Param, Delete, ValidationPipe, UseGuards, Request, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/guard/auth.guard';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  

 
  

  @Get('profile')
  async getProfile(@Request() req) {
    const userId = req.user.id; 
   
    
    
    return await this.userService.getProfile(userId);
  }

  
}
