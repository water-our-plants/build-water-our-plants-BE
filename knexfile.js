module.exports = {

    development: {
        client: 'sqlite3',
        connection: {
          filename: './data/water-plants.db3'
        },
        useNullAsDefault: true,
        migrations: {
          directory: './data/migrations'
        },
        seeds: {
          directory: './data/seeds'
        }
      },
  };
  