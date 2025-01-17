import { IsEmail, IsString, IsUrl, Max, MaxLength, Min, MinLength} from "class-validator";

export class SignUpDto {
    

    @IsString({message : "Name must be a string"})
    @MinLength(3, {message : "Name must be at least 3 characters"})
    @MaxLength(20, {message : "Name must be at most 20 characters"})
    name : string;

    @IsString({message : "Email must be a string"})
    @IsEmail({},{message : "Email must be a valid email"})
    email : string;

    @IsString({message : "Password must be a string"})
    @MinLength(8, {message : "Password must be at least 8 characters"})
    @MaxLength(20, {message : "Password must be at most 20 characters"})
    password : string;

    @IsString({message : "LinkedinUrl must be a string"})
    @IsUrl({},{message : "LinkedinUrl must be a valid url"})
    linkedinUrl : string
}

export class SignInDto {
    @IsString({message : "Email must be a string"})
    @IsEmail({},{message : "Email must be a valid email"})
    email : string;

    @IsString({message : "Password must be a string"})
    @MinLength(8, {message : "Password must be at least 8 characters"})
    @MaxLength(20, {message : "Password must be at most 20 characters"})
    password : string;
}