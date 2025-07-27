import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { db, client } from './index';
async function runMigration() {
    console.log('Running migrations...');
    try {
        await migrate(db, { migrationsFolder: './drizzle' });
        console.log('Migrations completed successfully');
    }
    catch (error) {
        console.error('Migration failed:', error);
    }
    finally {
        await client.end();
    }
}
runMigration();
