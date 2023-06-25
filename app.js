const express = require("express");
const route = express();
const mysql = require("mysql");
const cors = require("cors");

route.use(cors());
route.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "userinfo",
});

route.post("/createUser", (req, res) => {
  const name = req.body.name;
  const sector = req.body.sector;
  const agree = req.body.agree;

  db.query(
    "INSERT INTO user (name, sector, agree) VALUES (?,?,?)",
    [name, sector, agree],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Value inserted");
      }
    }
  );
});

route.get("/getUser", (req, res) => {
  db.query("SELECT * FROM user", (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

route.put("/updateUser", (req, res) => {
  db.query(
    "UPDATE user SET name = ?, sector=?, agree=? WHERE id=?",
    [req.body.name, req.body.sector, req.body.agree, req.body.id],
    (err, result) => {
      if (err) console.log(err);
      else res.send(result);
    }
  );
});

route.get("/getSectors", (req, res) => {
  db.query("SELECT * FROM sectors", (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

route.listen("3001", () => {
  console.log("listening server on 3001");
});
