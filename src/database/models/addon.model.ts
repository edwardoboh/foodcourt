import { RelationMappings, RelationMappingsThunk, Model } from "objection";
import BaseModel from "./base.model";
import BrandModel from './brand.model'

export default class AddonModel extends BaseModel {
    static tableName = 'addons';

    name: string
    description?: string
    price: number
    category?: string

    brand_id: number

    static relationMappings: RelationMappings | RelationMappingsThunk = {
        brand: {
            modelClass: BrandModel,
            relation: Model.BelongsToOneRelation,
            join: {
                from: 'addons.brand_id',
                to: 'brands.id'
            }
        }
    }
}