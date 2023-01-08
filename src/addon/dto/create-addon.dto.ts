import { IsString, IsNumber } from "class-validator"
export class CreateAddonDto {
    @IsString()
    name: string

    @IsString()
    description?: string

    @IsNumber()
    price: number

    @IsString()
    category?: string
}