const express = require('express');
const router = require('./router');
const cors = require('cors')
const db = require('./db');
const app = express();
const port = 3000;


// Middleware
app.use(express.json());
app.use(cors());
app.use(router);




// Start server
db
.then(() => {
    app.listen(port, () => console.log(`Node server running on http://localhost:${port}`));
})
.catch((err) => console.log(err.message))