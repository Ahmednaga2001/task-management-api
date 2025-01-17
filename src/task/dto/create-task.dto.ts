import { IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  @Length(10, 30, {
    message: 'Title must be between 10 and 30 characters',
  })
  title: string;

  @IsNotEmpty()
  @IsString()
  @Length(20, 200, {
    message: 'Description must be between 20 and 200 characters',
  })
  desc: string;

  @IsNotEmpty()
  @IsEnum(['Personal', 'Work' , 'Shopping'], {
    message: 'Type must be either "Personal" or "Worke" or "Shopping"',
  })
  type: string;
}
