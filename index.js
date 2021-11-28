const express = require('express');
const ejs = require('ejs');

// Init app
const app = express();

// EJS
app.set("views", "./src/views");
app.set("view engine", "ejs");

// Public Folder
app.use(express.static('./public'));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/js", express.static(__dirname + "public/js"));

const Router = require("./src/routes/covid");
app.use("/", Router);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server started on port ${port}`));