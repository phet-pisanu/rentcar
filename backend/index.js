require("dotenv").config();
const express = require("express");
const db = require("./models");
const cors = require("cors");

const app = express();

let allowdOrgins = ["http://localhost:3000"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowdOrgins.indexOf(origin) === -1) {
        let mes = "you can not access";
        return callback(new Error(mes), false);
      }
      return callback(null, true);
    },
  })
);

db.sequelize.sync({ force: true }).then(() => {
  app.listen(process.env.PORT),
    () => {
      console.log(`server is running at port:${process.env.PORT}`);
    };
});
