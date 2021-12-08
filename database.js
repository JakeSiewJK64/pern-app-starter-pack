const Pool = require('pg').Pool;
const pool = new Pool({
    user: "dlndhisnezlfir",
    host: "ec2-54-161-189-150.compute-1.amazonaws.com",
    password: "97dc6c2cce0633cf9f147f4e3038d106401edd808a33ed18fd008a6d7e59dd0e",
    port: 5432,
    database: "d9ie64bk2fabqo",
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = pool;