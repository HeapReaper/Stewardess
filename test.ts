import { SQL } from "bun";

const db = new SQL({
    conn: "postgres://myuser:mypassword@localhost:5432/mydatabase",
    maxConnections: 20,
    idleTimeout: 30000,
    connectionTimeout: 30000,
    // remove tls unless you actually need it
});

async function test() {
    try {
        const result = await db.begin(async tx => {
            "SELECT 1"
        });
        console.log("DB connected:", result);
    } catch (err) {
        console.error("Failed to connect:", err);
    }
}

test();
