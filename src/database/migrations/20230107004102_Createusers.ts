import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('users', table => {
        table.increments(),
        table.string('first_name').notNullable()
        table.string('last_name')
        table.string('email').unique().notNullable()
        table.string('password').notNullable()
        table.timestamps(false, true)
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('users')
}

