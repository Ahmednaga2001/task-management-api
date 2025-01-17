import { IsEmail, IsString, IsUrl, Matches, Max, MaxLength, Min, MinLength} from "class-validator";

export class CreateUserDto {
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
    @Matches(/linkedin\.com/, { message: 'LinkedIn profile URL must belong to LinkedIn' })
    linkedinUrl : string
}
