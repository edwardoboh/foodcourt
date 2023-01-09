import { IsString, IsNumber, IsNotEmpty } from "class-validator"
export class CreateAddonDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    description?: string

    @IsNumber()
    @IsNotEmpty()
    price: number

    @IsString()
    category?: string
}