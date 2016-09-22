import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import sequelizeConfig from '../sequelize_config';

const ENV = process.env.NODE_ENV;
const config = sequelizeConfig[ENV];
const basename = path.basename(module.filename);
const db = {};
const dbUrl = process.env[config.use_env_variable];

let sequelize;

//Pass through db config url to setup a connection pool
if (dbUrl) {
  sequelize = new Sequelize(dbUrl);
} else {
  const line = (ENV === 'development') ? 3 : 11;
  throw new Error('use_env_variable is not defined', 'sequelize_config.js', line);
}

/* 
 * Imports models into the instance of sequelize and 
 * sets a reference to the model on the db object. 
 */
fs
  .readdirSync(__dirname)
  .filter((file) =>
    (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
  )
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

//Associate a model to the db if necessary
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

sequelize.sync().then(() => {
  console.log('Postgres Database synced with models');
})
.catch((err) => {
  console.log(err);
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;