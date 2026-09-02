import { descopeClient } from "../config/descope.js";
import { getPool } from "../db/pool.js";
export const requireSession = async (req, res, next) => {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized", success: false });
    }
    const token = header.split(" ")[1];
    try {
        const authInfo = await descopeClient.validateSession(token);
        if (!authInfo) {
            return res.status(401).json({ message: "Unauthorized", success: false });
        }
        const claims = authInfo.token;
        const authUserId = String(claims.sub ?? "");
        const email = typeof claims.email === "string" ? claims.email : "";
        if (!authUserId) {
            return res.status(401).json({ message: "Unauthorized", success: false });
        }
        const userResult = await getPool().query(`
            INSERT INTO users (auth_user_id, email)
            VALUES ($1, $2)
            ON CONFLICT (auth_user_id)
            DO UPDATE SET email = EXCLUDED.email
            RETURNING id
            `, [authUserId, email || null]);
        const user = userResult.rows[0];
        req.auth = {
            authUserId,
            name: typeof claims.name === "string" ? claims.name : "",
            email,
            userId: user.id,
            token: claims,
        };
        next();
    }
    catch (error) {
        return res.status(401).json({ message: "Invalid token", success: false });
    }
};
