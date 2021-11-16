exports.up = async (knex) => {
  await knex.schema
    .createTable("users", (users) => {
      users.increments("user_id");
      users.string("username", 200).notNullable();
      users.string("password", 200).notNullable();
      users.timestamps(false, true);
    })
    .createTable("items", (items) => {
      items.increments("item_id");
      items.string("name", 200).notNullable();
      items.string("description", 200).notNullable();
      items.integer("price", 200).notNullable();
    });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists("items");
  await knex.schema.dropTableIfExists("users");
};
