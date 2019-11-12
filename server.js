const express = require("express");

var app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/main.html"));
});

app.listen(PORT, function() {
  console.log("App now listening at localhost:" + PORT);
});
