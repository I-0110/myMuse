import connection from '../config/connection.js';
import { User, Post } from '../models/index.js';
import { getRandomName, getRandomPost } from './data.js';

connection.on('error', (error) => error);

connection.once('open', async () => {
    // delete the collections if they exist
    let postCheck = await connection.db?.listCollections({ name: 'posts' }).toArray();
    if (postCheck?.length) {
        await connection.dropCollection('posts');
    }

    let userCheck = await connection.db?.listCollections({ name: 'users' }).toArray();
    if (userCheck?.length) {
        await connection.dropCollection('users');
    }

    const users = [];
    const posts = getRandomPost(15); 

    for (let i =0; i < 20; i++) {
        const fullName = getRandomName();
        const first = fullName.split(' ')[0];
        const last = fullName.split(' ')[1];

        users.push({
            first,
            last,
            age: Math.floor(Math.random() * (99 - 18 + 1) + 18),
        });
    }

    await User.insertMany(users);
    await Post.insertMany(posts);
    console.table(users);
    console.table(posts);
    console.info('Seeded users and posts! 🌱');
    process.exit(0);
}); 
