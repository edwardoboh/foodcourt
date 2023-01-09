import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import BrandModel from 'src/database/models/brand.model'
import { failed } from 'src/common/dto';
import CategoryModel from 'src/database/models/category.model';

@Injectable()
export class BrandService {

  constructor(@Inject(BrandModel) private readonly brand: typeof BrandModel, @Inject(CategoryModel) private readonly category: typeof CategoryModel) {}

  async create(createBrandDto: CreateBrandDto) {
    try{
      const newBrand = await this.brand.query().insert(createBrandDto).returning('*')
      return newBrand
    }catch(error){
      console.log(error)
      if(error.name == 'ForeignKeyViolationError' && error.nativeError.code == '23503') throw new HttpException("provided owner id deos not exists", HttpStatus.NOT_FOUND)
      // TODO - check for unique field exception
      throw new HttpException(failed("Error Creating brand"), HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findAll() {
    try{
      const allBrands = await this.brand.query()
      return allBrands
    }catch(error){
      throw new HttpException(failed("Error fetching all brands"), HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findOne(id: number) {
    try{
      const brand = await this.brand.query().findById(id)
      return brand
    }catch(error){
      throw new HttpException(failed("Error fetching brand information"), HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async update(id: number, updateBrandDto: UpdateBrandDto) {
    try{
      const updatedBrand = await this.brand.query().update(updateBrandDto).where({id}).returning('*')
      return updatedBrand;
    }catch(error){
      throw new HttpException(failed("Error updating brand"), HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async remove(id: number) {
    try{
      const del = await this.brand.query().delete().where({id})
      return del
    }catch(error){
      throw new HttpException(failed("Error deleting brand"), HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  // TODO - We can split category features into it's own module later

  async createCategory({brandId, payload}): Promise<any> {
    try{
      return this.category.query().insert({brand_id: brandId, ...payload}).returning('*')
    }catch(error){
      throw new HttpException(failed('Error while creating addon'), HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async fetchCategories(brandId: number): Promise<any> {
    try{
      return this.category.query().where({brand_id: brandId})
    }catch(error){
      throw new HttpException(failed('Error while creating addon'), HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

}
