import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { failed, success } from 'src/common/dto';
import { BrandPipe } from 'src/addon/dto/addon-param.dto';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('brands')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post()
  async create(@Body() createBrandDto: CreateBrandDto) {
    const brand = await this.brandService.create(createBrandDto);
    return success(brand)
  }

  @Get()
  async findAll() {
    const brands = await this.brandService.findAll();
    return success(brands)
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const resp = await this.brandService.findOne(+id);
    if(!resp)
      throw new NotFoundException(failed(`Brand with id: ${id} not found`));
    return success(resp)
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBrandDto: UpdateBrandDto) {
    const brand = await this.brandService.update(+id, updateBrandDto);
    return success(brand)
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const resp = await this.brandService.remove(+id);
    return success(`deleted: ${resp}`)
  }
  
  // TODO - We can split category features into it's own module later

  @Post(':brandId/addon-categories')
  async createCategory(@Param() {brandId}: BrandPipe, @Body() payload: CreateCategoryDto): Promise<any> {
    const resp = await this.brandService.createCategory({brandId, payload})
    return success(resp);
  }

  @Get(':brandId/addon-categories')
  async fetchCategories(@Param() {brandId}: BrandPipe): Promise<any> {
    const resp = await this.brandService.fetchCategories(brandId)
    return success(resp)
  }
}
