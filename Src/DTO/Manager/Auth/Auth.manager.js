import UserManager from "../Users/User.manager.js";
import bcrypt from "bcrypt"
class sessionManager{

    async login(email, password) {
        try {
          const user = await UserManager.getUserByEmail(email);
          if (!user) {
            console.error("Usuario no encontrado con el email proporcionado");
            return null;
          }
    
          console.log("Contraseña ingresada:", password);
          console.log("Contraseña almacenada:", user.password);  
    
          if (!password || !user.password) {
            console.error("Contraseña ingresada o almacenada no está definida");
            return null;
          }
    
          const passwordMatch = await bcrypt.compare(password, user.password);
          console.log("Coincidencia de contraseñas:", passwordMatch);
    
          if (!passwordMatch) {
            console.error("La contraseña no coincide");
            return null;
          }
    
          return user;
        } catch (error) {
          console.error("Error en el manager de inicio de sesión:", error);
          throw error; 
        }
      }
}

const SessionManager = new sessionManager()
export default SessionManager;