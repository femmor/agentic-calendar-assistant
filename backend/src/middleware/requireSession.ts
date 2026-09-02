import { NextFunction, Request, Response } from "express";
import { descopeClient } from "../config/descope.js";
import { ensureUser } from "../repositories/user.repository.js";

export type AuthContext = {
    authUserId: string;
    name: string;
    email: string;
    userId: string;
    token: Record<string, unknown>;
}

declare global {
    namespace Express {
        interface Request {
            auth?: AuthContext;
        }
    }
}

export const requireSession = async (req: Request, res: Response, next: NextFunction) => {
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

        const claims = authInfo.token as Record<string, unknown>;
        const authUserId = String(claims.sub ?? "");

        const email = typeof claims.email === "string" ? claims.email : "";

        // Ensure the user exists in the database and retrieve their information
        const user = await ensureUser({ authUserId, email });

        // Add auth info to the request object for downstream middleware and route handlers
        req.auth = {
            authUserId,
            name: String(claims.name ?? ""),
            email,
            userId: user.id,
            token: claims,
        };

        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token", success: false });
    }
}