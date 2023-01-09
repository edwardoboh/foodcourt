import { RelationMappings, RelationMappingsThunk, Model } from "objection";
import BaseModel from "./base.model";
import BrandModel from './brand.model'

export default class CategoryModel extends BaseModel {
    static tableName = 'categories';

    name: string
    description?: string

    brand_id: number

    static relationMappings: RelationMappings | RelationMappingsThunk = {
        brand: {
            modelClass: BrandModel,
            relation: Model.BelongsToOneRelation,
            join: {
                from: 'categories.brand_id',
                to: 'brands.id'
            }
        }
    }
}