const express = require("express");
const mysql = require("mysql");
const path = require("path");

class Database {
  constructor( config ) {
      this.connection = mysql.createConnection( config );
  }
  query( sql, args ) {
      return new Promise( ( resolve, reject ) => {
          this.connection.query( sql, args, ( err, rows ) => {
              if ( err )
                  return reject( err );
              resolve( rows );
          } );
      } );
  }
  close() {
      return new Promise( ( resolve, reject ) => {
          this.connection.end( err => {
              if ( err )
                  return reject( err );
              resolve();
          } );
      } );
  }
};

if (process.env.JAWSDB_URL) {
  db = new Database(process.env.JAWSDB_URL);
} else {
    db = new Database({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "burger_db"
  });
};

var PORT = process.env.PORT || 8080;

var app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./views/layouts/main.html"));
});

app.post("/log", async function(req, res) {
  let temp = await db.query(`INSERT INTO burgers (description, devoured) VALUES ("${req.body.burgerName}", FALSE)`);
});

app.post("/devour", async function(req, res) {
  let temp = await db.query(`UPDATE burgers SET devoured = TRUE WHERE description = "${req.body.burgerName}"`);
});

app.get("/loadBurgers", async function (req, res) {
  let burgerList = await db.query("SELECT * FROM burgers");
  res.json(burgerList);
});

app.listen(PORT, function() {
  console.log("App now listening at localhost:" + PORT);
});
