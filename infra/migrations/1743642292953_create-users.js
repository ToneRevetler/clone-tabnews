
exports.up = (pgm) => {
  pgm.createTable('users', {
    id: {
      type: "uuid",
      primaryKey: true,
      notNull: true,
      default: pgm.func("gen_random_uuid()")
    },

    // For reference, GitHub limits username to 39 characters.
    username:{
      type: "varchar(30)",
      notNull: true,
      unique: true,
    },

    //The maximum lenght of an email addres is 254 charaters.
    email:{
      type: "varchar(254)",
      notNull: true,
      unique: true,
    },

    password: {
      type: "varchar(72)",
      notNull: true,
    },

    create_at: {
      type: "timestamptz",
      default: pgm.func("now()"),
      notNull: true,
    },

    update_at: {
      type: "timestamptz",
      default: pgm.func("now()"),
      notNull: true,

    },
  });
  
};

exports.down = false;
