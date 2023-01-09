import { BadRequestException, Inject, Injectable, NestMiddleware, NotFoundException } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { failed } from 'src/common/dto'
import BrandModel from 'src/database/models/brand.model'
import * as Joi from 'joi'

@Injectable()
export class CheckBrandMiddleware implements NestMiddleware {
    constructor(@Inject(BrandModel) private readonly brand: typeof BrandModel){}

    async use(req: Request, res: Response, next: NextFunction) {
        const {brandId} = req.params
        const { error } = Joi.object({brandId: Joi.number().required()}).validate({brandId})
        if(error) throw new BadRequestException(failed(error.details[0].message))

        const brand = await this.brand.query().findById(brandId)
        if(!brand) throw new NotFoundException(failed(`Brand with Id: ${brandId} does not exist`))
        next()
    }
}