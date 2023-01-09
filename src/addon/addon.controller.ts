import { Controller, Post, Get, Delete, Patch, Param, Body, NotFoundException } from "@nestjs/common";
import { AddonService } from './addon.service';
import { failed, success } from 'src/common/dto'
import { CreateAddonDto } from './dto/create-addon.dto'
import { UpdateAddonDto } from './dto/update-addon.dto'
import { BrandService } from "src/brand/brand.service";
import { BrandAddonPipe, BrandPipe } from './dto/addon-param.dto'

@Controller('brands/:brandId/addons')
export class AddonController {
    // NOTE - Remember to add pagination to all getAll endpoints
    constructor(private addonService: AddonService, private brandService: BrandService) {}

    @Post()
    async createAddon(@Param() {brandId}: BrandPipe, @Body() payload: CreateAddonDto): Promise<any> {
        const existCat = await this.brandService.geCategory(brandId, payload.category)
        if(!existCat.length) throw new NotFoundException(failed(`category with name: ${payload.category} does not exist. Create a new category or fetch to see available categories`))
        const resp = await this.addonService.create({brandId, payload})
        return success(resp);
    }

    @Get()
    async fetchAddons(@Param() {brandId}: BrandPipe): Promise<any> {
        const resp = await this.addonService.getAll(brandId)
        return success(resp)
    }

    @Get(':addonId')
    async fetchSingleAddon(@Param() {addonId, brandId}: BrandAddonPipe): Promise<any> {
        const resp = await this.addonService.get(addonId)
        if(!resp) throw new NotFoundException(failed(`Addon with id ${addonId} does not exist`))
        return success(resp)
    }

    @Patch(':addonId')
    async updateAddon(@Param() {addonId, brandId}: BrandAddonPipe, @Body() payload: UpdateAddonDto): Promise<any> {
        const resp = await this.addonService.update({addonId, payload})
        return success(resp)
    }

    @Delete(':addonId')
    async deleteAddon(@Param() {addonId, brandId}: BrandAddonPipe): Promise<any> {
        const resp = await this.addonService.delete(addonId)
        return success(resp)
    }
}