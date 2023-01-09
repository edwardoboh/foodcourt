import 'dotenv/config'
import { Module, Global } from '@nestjs/common'
import AddonModel from './models/addon.model';
import BrandModel from './models/brand.model';
import BaseModel from './models/base.model';
import UserModel from './models/user.model';
import CategoryModel from './models/category.model';
import { ObjectionModule } from '@willsoto/nestjs-objection'

@Global()
@Module({
    imports: [
        ObjectionModule.register({
            Model: BaseModel,
            config: {
                client: "postgresql",
                connection: {
                    host: process.env.DB_HOST,
                    port: +process.env.DB_PORT || 5432,
                    database: process.env.DB_NAME,
                    user: process.env.DB_USER,
                    password: process.env.DB_PASSWORD
                },
                pool: {
                    min: 2,
                    max: 10
                },
                migrations: {
                    tableName: "knex_migrations"
                }
            }
        }),
        ObjectionModule.forFeature([AddonModel, BrandModel, UserModel, CategoryModel])
    ],
    exports: [ObjectionModule]
})
export class DatabaseModule {}