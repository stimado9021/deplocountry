import User from "../../Models/Users/User.model.js";
import { EncriptarPassword } from "../../../Utils/Bcrypt.Util.js";

class UserManager {
  async findAll() {
    try {
      return await User.findAll();
    } catch (error) {
      console.error('Error al obtener todos los usuarios:', error);
      throw error;
    }
  }

  async findById(id) {
    try {
      return await User.findByPk(id);
    } catch (error) {
      console.error(`Error al obtener el usuario con ID ${id}:`, error);
      throw error;
    }
  }

  async createOne(userData) {
    try {
        if(userData.password){
            userData.password = await EncriptarPassword(userData.password)
          }
      return await User.create(userData);
    } catch (error) {
      console.error('Error al crear el usuario:', error);
      throw error;
    }
  }

  async updateOne(id, updatedData) {
    try {
        if(data.password){
            data.password = await EncriptarPassword(data.password)
          }
      const user = await this.findById(id);
      if (!user) {
        throw new Error(`Usuario con ID ${id} no encontrado`);
      }
      return await user.update(updatedData);
    } catch (error) {
      console.error(`Error al actualizar el usuario con ID ${id}:`, error);
      throw error;
    }
  }

  async updateMany(condition, updatedData) {
    try {
      return await User.update(updatedData, {
        where: condition,
      });
    } catch (error) {
      console.error('Error al actualizar múltiples usuarios:', error);
      throw error;
    }
  }

  async deleteOne(id) {
    try {
      const user = await this.findById(id);
      if (!user) {
        throw new Error(`Usuario con ID ${id} no encontrado`);
      }
      await user.destroy();
      return { message: `Usuario con ID ${id} eliminado` };
    } catch (error) {
      console.error(`Error al eliminar el usuario con ID ${id}:`, error);
      throw error;
    }
  }

  async deleteAll() {
    try {
      await User.destroy({
        where: {},
        truncate: true,
      });
      return { message: 'Todos los usuarios han sido eliminados' };
    } catch (error) {
      console.error('Error al eliminar todos los usuarios:', error);
      throw error;
    }
  }
  async getUserByEmail(email) {
    try {
      return await User.findOne({
        where: {  email },
      });
    } catch (error) {
      console.error(`Error al obtener el usuario con el email ${email}:`, error);
      throw error;
    }
  }
}

export default new UserManager();
