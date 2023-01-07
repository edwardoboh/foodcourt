import { RelationMappings, RelationMappingsThunk, Model } from 'objection'
import BaseModel from './base.model'
import UserModel from './user.model'

export default class BrandModel extends BaseModel {
    static tableName = "brands"

    name: string
    owner_id: number

    static relationMappings: RelationMappings | RelationMappingsThunk = {
        owner : {
            modelClass: UserModel,
            relation: Model.BelongsToOneRelation,
            join: {
                from: 'brands.owner_id',
                to: 'users.id'
            }
        }
    }
}