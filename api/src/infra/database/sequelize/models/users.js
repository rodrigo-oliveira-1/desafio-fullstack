'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
    }
  }
  Users.init({
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true  
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at'
    },
    createdBy: {
      type: DataTypes.UUID,
      field: 'created_by' 
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at'
    },
    updatedBy: {
      type: DataTypes.UUID,
      field: 'updated_by' 
    },
    deletedAt: {
      type: DataTypes.DATE,
      field: 'deleted_at'
    },
    deletedBy: {
      type: DataTypes.UUID,
      field: 'deleted_by' 
    },
    name: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    cpf: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    bornDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: 'born_date'
    },
    street: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    number: {
      type: DataTypes.STRING(6),
      allowNull: false
    },
    neighborhood: {
      type: DataTypes.STRING(60),
      allowNull: false
    }, 
    reference: {
      type: DataTypes.STRING(60)
    },
    city: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    state: {
      type: DataTypes.STRING(2),
      allowNull: false
    },
    zipCode: {
      type: DataTypes.INTEGER,
      field: 'zip_code'
    },
  }, {
    sequelize,
    modelName: 'Users',
    tableName: 'users',
    timestamps: false,
  });

  return Users;
};