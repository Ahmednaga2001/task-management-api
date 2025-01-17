import { HttpException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/user.schema';
import { SignInDto, SignUpDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
      constructor(@InjectModel(User.name) private userModel: Model<User> , private JwtService : JwtService) {}
      async signUp(signUpDto : SignUpDto) {
        const user = await this.userModel.findOne({email : signUpDto.email});
        if(user){
           throw new HttpException("User already exists",400);
        }
        const password = await bcrypt.hash(signUpDto.password, 10);
        const newUser = await this.userModel.create({...signUpDto, password});
        return {message : "User created successfully", data : newUser};
      }

      async signIn(signInDto : SignInDto) {
        const user = await this.userModel.findOne({email : signInDto.email});
        if(!user){
          throw new NotFoundException('User not found');
        }
        const isMatch = await bcrypt.compare(signInDto.password, user.password);
        if(!isMatch){
          throw new UnauthorizedException()
                }
        const payload = {email : user.email, id : user._id};
        const token = this.JwtService.sign(payload , {secret : process.env.JWT_SECRET});
        return {message : "Login successful", data : user , access_token : token};
      }
    
}
