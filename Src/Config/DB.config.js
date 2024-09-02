import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import User from '../DTO/Models/Users/User.model.js';

dotenv.config();
console.log(process.env.DB_HOST)
export const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST || 'localhost',
  dialect: 'postgres',
  port: process.env.DB_PORT || 5432,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: true // Usa esto solo en desarrollo
    }
  },
  logging: console.log 
});


sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos exitosa.');
  })
  .catch(err => {
    console.error('No se pudo conectar a la base de datos:',);
  });

  sequelize.sync({ force: false })  
  .then(() => {
    console.log('Tablas sincronizadas correctamente.');
  })
  .catch((error) => {
    console.error('Error al sincronizar la base de datos:', error);
  });