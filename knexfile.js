require('dotenv').config();
module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/database.db3'
    },
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    },
    useNullAsDefault: true
  },

  test: {
    client: 'sqlite3',
    connection: {
      filename: './data/testdb.db3'
    },
    migrations: {
      directory: './data/test_migrations'
    },
    seeds: {
      directory: './data/test_seeds'
    },
    useNullAsDefault: true
  },

  production: {
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './data/prod/migrations'
    },
    seeds: {
      directory: './data/prod/seeds'
    },
    client: 'pg',
    connection: `${process.env.DATABASE_URL}?ssl=true`

    // production: {
    //   pool: {
    //     min: 2,
    //     max: 10
    //   },
    //   migrations: {
    //     directory: './data/prod/migrations'
    //   },
    //   seeds: {
    //     directory: './data/prod/seeds'
    //   },
    //   client: 'pg',
    //   version: '11',
    //   connection: {
    //     host: '127.0.0.1',
    //     user: 'ikechukwu',
    //     password: '',
    //     database: 'ikechukwu'
    //   }
  }
};
