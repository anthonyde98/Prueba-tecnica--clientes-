const express = require("express");
require("dotenv").config();
require("./connection/connection");
const cors = require('cors');
const customerRoutes = require("./routes/customer");

const app = express();
const port = process.env.PORT || 8000;

app.use(cors())
app.use(express.json());
app.use('/api/v1/customer', customerRoutes)

app.listen(port, () => console.log("server listening on port", port));