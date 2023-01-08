import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('brands', table => {
        table.increments()
        table.string('name').unique().notNullable()
        table.integer('owner_id').unsigned().references('id').inTable('users').notNullable()
        table.timestamps(false, true)
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('brands')
}

