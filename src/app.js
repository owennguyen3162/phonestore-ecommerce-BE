const express = require("express");
const hbs = require("express-handlebars");
const path = require("path");
const app = express();
const route = require("./router");
const db = require("./app/configs/db/db");
const methodOverride = require("method-override");

app.listen(3000, (req, res) => console.log("3000 OK"));
//connect database;
db.connect();

//setup handlebar
app.engine(
  "hbs",
  hbs.engine({
    extname: "hbs",
    helpers: {
      getImage: (array) => array[0].image,
      count: (numberA, number) => (numberA += number),
      checkStatus: (value) => {
        return value === "unconfimred" ? true : false;
      },
      selected: (a, b) => {
        return a === b ? "checked" : "";
      },

      selected2: (a, b) => {
        return a === b ? "selected" : "";
      },
    },
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resource", "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "../uploads")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(methodOverride("_method"));

route(app);
