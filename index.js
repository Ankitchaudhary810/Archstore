const express = require("express");
const app = express();


app.use(express.json());
const dataRouter = require("./routes/Get");

app.use('/', dataRouter)

app.listen(8888, () => {
    console.log("Server is running at 8888");
})