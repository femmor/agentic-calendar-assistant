import { config } from "dotenv";
import { readdirSync, readFileSync } from "fs";
import { resolve } from "path";
import { getPool } from "../src/db/pool";

config({
    path: resolve(process.cwd(), ".env"),
})

async function main() {
    const sqlDir = resolve(process.cwd(), "sql");
    const files = readdirSync(sqlDir).filter(fileName => fileName.endsWith(".sql")).sort();
    const pool = getPool();

    for (const fileName of files) {
        const filePath = resolve(sqlDir, fileName);
        const sql = readFileSync(filePath, "utf-8");
        console.log(`Running migration: ${fileName}`);
        await pool.query(sql);
    }

    console.log("All migrations completed successfully.");
    await pool.end();
}

main().catch(error => {
    console.error("Migration failed:", error);
    process.exit(1);
});