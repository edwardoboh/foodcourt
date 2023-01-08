import { IsString, IsNumber, isString } from "class-validator"

export class CreateBrandDto {
    @IsString()
    name: string

    @IsNumber()
    owner_id: number

    created_at?: Date
    updated_at?: Date
}
