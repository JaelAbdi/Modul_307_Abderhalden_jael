//Add module
const express = require('express');
//Important: DO NOT FORGET round braces!
const app = express();
const port = process.env.PORT || 3000;

// Auf den Port hören
app.listen(port);
console.log(`Running at port ${port}`);

