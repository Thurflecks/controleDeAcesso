const express = require("express")
const { engine } = require("express-handlebars")
const app = express()
const path = require("path")
require('dotenv').config({ quiet: true });
const { PORT, passwordSession } = process.env;
const CoreRoutes = require("./routes/coreRoutes")
const session = require("express-session")
const flash = require('express-flash')
const port = PORT || 9000


app.use(express.static(path.join(__dirname, "public")))

app.engine("handlebars", engine({
    defaultLayout: "main",
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
    }
}))

app.set("view engine", "handlebars")

app.use(session({
    secret: passwordSession || 'SENHA123456',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(flash)
app.use(CoreRoutes)


app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
