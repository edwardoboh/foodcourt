import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import AddonModel from 'src/database/models/addon.model'
import { failed } from "src/common/dto";

@Injectable()
export class AddonService {
    constructor(@Inject(AddonModel) private addon: typeof AddonModel) {}

    async create({brandId, payload}): Promise<any> {
        try{
            const addon = await this.addon.query().insert({brand_id: brandId, ...payload}).returning('*')
            return addon
        }catch(error){
            if(error.name == 'UniqueViolationError' && error.nativeError.code == '23505') throw new HttpException(`Addon with name: "${payload?.name}" already exists`, HttpStatus.BAD_REQUEST)
            throw new HttpException(failed("An error occured"), HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async get(addonId: number): Promise<any> {
        try{
            return this.addon.query().findById(addonId)
        }catch(error){
            throw new HttpException(failed('Error while fetching addon'), HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async getAll(brandId: number): Promise<any> {
        try{
            return this.addon.query().where({brand_id: brandId})
        }catch(error){
            throw new HttpException(failed('Error while fetching all brand addons'), HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async update({addonId, payload}): Promise<any> {
        try{
            return this.addon.query().update(payload).where({id: addonId}).returning('*')
        }catch(error){
            throw new HttpException(failed('Error while updating addon'), HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async delete(addonId: number): Promise<any> {
        try{
            return this.addon.query().delete().where({id: addonId})
        }catch(error){
            throw new HttpException(failed('Error while deleting addon'), HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

}