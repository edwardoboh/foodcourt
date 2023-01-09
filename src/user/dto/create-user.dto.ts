import { IsString, IsEmail, IsNotEmpty } from 'class-validator'
export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    first_name: string

    @IsString()
    last_name?: string

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string
}