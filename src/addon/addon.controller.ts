import { Controller, Post, Get, Delete, Patch, Param, Body } from "@nestjs/common";
import { AddonService } from './addon.service';
import { success } from 'src/common/dto'

@Controller('brands/:brandId/addons')
export class AddonController {

    constructor(private addonService: AddonService) {}

    @Post()
    async createAddon(@Param('brandId') brandId, @Body() payload): Promise<any> {
        const resp = await this.addonService.create({brandId, payload})
        return success(resp);
    }

    @Get()
    async fetchAddons(@Param('brandId') brandId): Promise<any> {
        const resp = await this.addonService.getAll({brandId})
        return success(resp)
    }

    @Get(':addonId')
    async fetchSingleAddon(@Param() {addonId, brandId}): Promise<any> {
        const resp = await this.addonService.get({brandId, addonId})
        return success(resp)
    }

    @Patch(':addonId')
    async updateAddon(@Param() {addonId, brandId}, @Body() payload): Promise<any> {
        const resp = await this.addonService.update({brandId, addonId, payload})
        return success(resp)
    }

    @Delete(':addonId')
    async deleteAddon(@Param() {addonId, brandId}): Promise<any> {
        const resp = await this.addonService.delete({brandId, addonId})
        return success(resp)
    }
}