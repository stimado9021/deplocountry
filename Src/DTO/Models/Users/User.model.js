import { DataTypes } from 'sequelize';
import { sequelize } from '../../../Config/DB.config.js';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('User', 'Admin', 'Producer'),
    defaultValue: 'User',
  },
  lastConnection: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  latitude: {
    type: DataTypes.DECIMAL(10, 8),
    allowNull: true,
  },
  longitude: {
    type: DataTypes.DECIMAL(11, 8),
    allowNull: true,
  },
}, {
  tableName: 'users',  
  timestamps: true,   // Sequelize agrega automáticamente campos de timestamps (createdAt, updatedAt)
});

export default User;
