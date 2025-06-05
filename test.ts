import db from '@utils/knex.ts';

async function fetchUsers() {
    const users = await db.select('*').from('messages').count();
    console.log(users);
}
void fetchUsers()
