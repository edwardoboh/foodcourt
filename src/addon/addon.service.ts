import { Injectable } from "@nestjs/common";

@Injectable()
export class AddonService {
    
    async create({brandId, payload}): Promise<any> {
        return
    }

    async get({brandId, addonId}): Promise<any> {
        return
    }

    async getAll({brandId}): Promise<any> {
        return
    }

    async update({brandId, addonId, payload}): Promise<any> {
        return
    }

    async delete({brandId, addonId}): Promise<any> {
        return
    }

}