import AuthService from "../../Service/Auth/Auth.service.js";

export async function LoginControllerSession(req, res) {
    try {
        const { password, email } = req.body;
        const { user, token } = await AuthService.login(email, password);
        if (!user) {
            throw new Error("User not found");
        }
        req.session.jwt = token;

        console.log("User in the current session:", req.session.jwt);

        res.json({ user, token });
    } catch (error) {
        console.error("Error in login controller:", error);
        res.status(401).json({ message: "Invalid email or password" });
    }
}

export async function RegisterControllerSession(req, res) {
    try {
        const { email, firstName, lastName, password } = req.body;

        console.log("Body data:", email, firstName, lastName, password);

        const result = await AuthService.register(
            email,
            firstName,
            lastName,
            password
        );

        if (result.success) {
            res.status(200).json({
                success: true,
                message: "Registration successful",
                result: result.newUser,
            });
        } else {
            res.status(400).json({ success: false, error: result.error });
        }
    } catch (error) {
        console.error("Error in registration controller:", error);
        res.status(400).json({ success: false, error: "Registration error" });
    }
}

export async function LogOutControllerSession(req, res) {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Error logging out' });
        }
        res.status(200).json({ success: true, message: 'Logged out successfully' });
    });
}
