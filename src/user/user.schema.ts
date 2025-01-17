import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

// Define the document type
export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({
    required: true,
    type: String,
    min: [3, 'Name must be at least 3 characters'],
    max: [20, 'Name must be at most 20 characters'],
  })
  name: string;

  @Prop({ unique: true, required: true, type: String })
  email: string;

  @Prop({
    required: true,
    type: String,
    min: [8, 'Password must be at least 8 characters'],
    max: [20, 'Password must be at most 20 characters'],
  })
  password: string;

  @Prop({ required: true , type : String })
  
  linkedinUrl: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
