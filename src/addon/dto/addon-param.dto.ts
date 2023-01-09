import { IsNotEmpty, IsNumber, IsNumberString } from 'class-validator'
import { PickType } from '@nestjs/mapped-types'

export class BrandAddonPipe {
    @IsNumberString()
    @IsNotEmpty()
    brandId: number

    @IsNumberString()
    @IsNotEmpty()
    addonId: number
}

export class BrandPipe extends PickType(BrandAddonPipe, ['brandId'] as const) {}