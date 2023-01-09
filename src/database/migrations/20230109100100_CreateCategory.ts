import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('categories', (table) => {
        table.increments()
        table.string('name').unique().index().notNullable()
        table.text('description')
        table.integer('brand_id').unsigned().references('id').inTable('brands').notNullable()
        table.timestamps(false, true)
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('categories')
}

