import SessionManager from "../../DTO/Manager/Auth/Auth.manager.js";
import UserManager from "../../DTO/Manager/Users/User.manager.js";
import { generateTokenJWT } from "../../Utils/Jwt.Util.js";

class SessionService {
    async login(email, password) {
        try {
            const user = await SessionManager.login(email, password);
            if (!user) {
                throw new Error("Invalid email or password");
            }
            const token = generateTokenJWT({ id: user.id, email: user.email });
            return { user, token };
        } catch (error) {
            console.error("Error in login service:", error);
            throw error;
        }
    }
    
    async register(email, firstName, lastName, password) {
        try {
            const existingUser = await UserManager.getUserByEmail(email);
            if (existingUser) {
                return {
                    success: false,
                    error: "User already exists",
                };
            }

            const newUser = await UserManager.createOne({
                email,
                firstName,
                lastName,
                password,
            });

            return {
                success: true,
                message: "Registration successful",
                newUser,
            };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
}

export default new SessionService();
