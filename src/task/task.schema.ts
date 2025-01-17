import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/user/user.schema';

// Define the document type
export type TaskDocument = HydratedDocument<Task>;

@Schema({ timestamps: true })
export class Task {
  @Prop({
    required: true,
    type: String,
    min: [10, 'Name must be at least 10 characters'],
    max: [30, 'Name must be at most 20 characters'],
  })
  title: string;

 

  @Prop({
    required: true,
    type: String,
    min: [20, 'Description must be at least 20 characters'],
    max: [200, 'Description must be at most 200 characters'],
  })
  desc: string;

  @Prop({
    type : mongoose.Schema.Types.ObjectId,
    ref : User.name
  })
  user : string

  @Prop({ required: true , enum: ['Personal', 'Work' , 'Shopping']  })
  type: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
