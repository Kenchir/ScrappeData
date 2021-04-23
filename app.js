const express = require("express");
const http = require("http");
const cors = require("cors");
const PORT = process.env.PORT || 8080;
const app = express();
const server = http.createServer(app);
const bodyParser = require("body-parser");

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
app.use(require("morgan")("dev"));
app.use(bodyParser.json());

// // Use routes for the API
app.use(require("./routes"));

app.use("/", (req, res, next) => {
  res.status("404").json({ message: "Not found" });
});
server.listen(PORT, () => console.log("Server running  on   port ", PORT));
