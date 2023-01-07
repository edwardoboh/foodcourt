import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('addons', table => {
        table.increments()
        table.string('name').unique().notNullable()
        table.text('description')
        table.decimal('price').notNullable()
        table.string('category')
        table.integer('brand_id').unsigned().references('id').inTable('brands').notNullable()
        table.timestamps()
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('addons')
}

