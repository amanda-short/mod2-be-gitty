const pool = require('../utils/pool');

class Post {
  id;
  body;

  constructor(row) {
    this.id = row.id;
    this.body = row.body;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * from posts;');
    console.log(rows);
    return rows.map((row) => new Post(row));
  }
}
//   static async getById(id) {
//     const { rows } = await pool.query('SELECT * from posts WHERE id = $1;', [
//       id,
//     ]);
//     if (!rows) return null;
//     return new Post(rows[0]);
//   }

//   async addPosts() {
//     const { rows } = await pool.query(
//       'SELECT * from post where github_user_id = $1',
//       [this.id]
//     );
//     this.posts = rows.map((row) => new Post(row));
//   }

//   static async insert({ body }) {
//     const { rows } = await pool.query(
//       `
//       INSERT INTO posts (body)
//       VALUES ($1)
//       RETURNING *
//       `,
//       [body]
//     );
//     return new Post(rows[0]);
//   }
// }

// module.exports = Post;
