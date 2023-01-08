import { Inject, Injectable, HttpException, HttpStatus, BadRequestException } from "@nestjs/common";
import UserModel from "src/database/models/user.model";
import { UniqueViolationError } from 'objection'
import { CreateUserDto, UpdateUserDto } from "./dto";
import { failed } from "src/common/dto";

@Injectable()
export class UserService {
    constructor(@Inject(UserModel) private database: typeof UserModel) {}

    async createUser(user: CreateUserDto): Promise<any> {
        try{
            const newUser = await this.database.query()
                .returning(['first_name', 'last_name', 'email'])
                .insert(user)
            return newUser
        }catch(error){
            console.log(error.nativeError)
            if(error.name == 'UniqueViolationError' && error.nativeError.code == '23505')
                throw new BadRequestException(failed(`User with email ${user.email} already exists. Try again wuth a different email`));
            throw new HttpException(failed("Error creating a new user"), HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
    
    async updateUser(id: number, payload: UpdateUserDto): Promise<any> {
        try{
            const newUser = await this.database.query()
                .update(payload)
                .where({id})
                .returning(['first_name', 'last_name', 'email'])
            return newUser
        }catch(error){
            console.log(error)
            // TODO - check for user not found exception
            throw new HttpException(failed("Error updating user information"), HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }  
}