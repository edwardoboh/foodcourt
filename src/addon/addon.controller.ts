import { Controller, Post, Get, Delete, Patch, Param, Body } from "@nestjs/common";
import { AddonService } from './addon.service';
import { failed, success } from 'src/common/dto'
import { CreateAddonDto } from './dto/create-addon.dto'
import { UpdateAddonDto } from './dto/update-addon.dto'
import { BrandService } from "src/brand/brand.service";

@Controller('brands/:brandId/addons')
export class AddonController {
    // NOTE - Remember to add pagination to all getAll endpoints
    constructor(private addonService: AddonService, private brandService: BrandService) {}

    @Post()
    async createAddon(@Param('brandId') brandId, @Body() payload: CreateAddonDto): Promise<any> {
        // check that a brand with this id exists
        // const existBrand = await this.brandService.findOne(brandId)
        // if(!existBrand) failed(`Brand with id ${brandId} does not exist`)

        const resp = await this.addonService.create({brandId, payload})
        return success(resp);
    }

    @Get()
    async fetchAddons(@Param('brandId') brandId): Promise<any> {
        const resp = await this.addonService.getAll(brandId)
        return success(resp)
    }

    @Get(':addonId')
    async fetchSingleAddon(@Param() {addonId, brandId}): Promise<any> {
        const resp = await this.addonService.get(addonId)
        return success(resp)
    }

    @Patch(':addonId')
    async updateAddon(@Param() {addonId, brandId}, @Body() payload: UpdateAddonDto): Promise<any> {
        const resp = await this.addonService.update({addonId, payload})
        return success(resp)
    }

    @Delete(':addonId')
    async deleteAddon(@Param() {addonId, brandId}): Promise<any> {
        const resp = await this.addonService.delete(addonId)
        return success(resp)
    }
}