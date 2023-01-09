import { IsString, IsNumber, IsNotEmpty } from "class-validator"

export class CreateBrandDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsNumber()
    @IsNotEmpty()
    owner_id: number

    created_at?: Date
    updated_at?: Date
}
