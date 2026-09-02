import { getPool } from "../db/pool.js";

export type CurrentUserRowInfo = {
    id: string;
    auth_user_id: string;
    email: string | null;
    created_at: Date;
}

export async function ensureUser(input: { authUserId: string, email: string }): Promise<CurrentUserRowInfo> {
    const result = await getPool().query<CurrentUserRowInfo>(
        // Check if the user with the given auth_user_id already exists in the database, if not insert a new record
        `
        INSERT INTO users (auth_user_id, email)
        VALUES ($1, $2)
        ON CONFLICT (auth_user_id) 
        DO UPDATE SET email = COALESCE(EXCLUDED.email, users.email)
        RETURNING *
        `,
        [input.authUserId, input.email]
    );

    return result.rows[0];
}