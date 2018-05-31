const express = require("express");
const exphbs = require("express-handlebars");
const logger = require("morgan");
const app = express();
const path = require("path");
const fs = require("fs");
const CronJob = require("cron").CronJob;

var scraper = require("./server/scraper.js");

new CronJob(
  "1 * * * * *",
  function() {
    scraper.scrape();
    console.log("Message every minute");
  },
  null,
  true,
  "America/Vancouver"
);

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var options = {
  dotfiles: "ignore",
  etag: false,
  extensions: ["htm", "html"],
  index: false
};

app.use(express.static(path.join(__dirname, "public"), options));

require("./server/routes")(app);
app.get("/", function(req, res) {
  var data = { routes: require("./data.json") };
  res.render("home", data);
});

app.listen(process.env.PORT || 8080, function() {
  console.log("Server started on port 8080!");
});
