import { Module, Global, HttpException, HttpStatus, DynamicModule } from '@nestjs/common'
import { Model } from 'objection';
import * as glob from 'glob'
import * as Knex from 'knex';

@Global()
@Module({
    providers: [],
    exports: []
})
export class DatabaseModule {
    static forRoot(entities = [], options?): DynamicModule {
        let providers;
        glob('**/*.ts', { cwd: './src/database/models', ignore: ['base.model.ts'] }, (error, files: string[]) => {
            if(error) throw new HttpException('Server Error', HttpStatus.INTERNAL_SERVER_ERROR)

            providers = files.map((file: string) => {
                // eslint-disable-next-line @typescript-eslint/no-var-requires
                const model = require(`${__dirname}/models/${file.split('.ts')[0]}.js`)
                return {
                    provide: model.name,
                    useValue: model
                }
            })

            providers.push({
                provide: 'KnexConnection',
                useFactory: async () => {
                    const knex = Knex.knex({
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
                    })
                    Model.knex(knex);
                    return knex;
                }
            })
        })
        return {
            module: DatabaseModule,
            providers,

        }
    }
}