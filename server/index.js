const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cookieParser = require("cookie-parser");
app.use(cookieParser());

const routes = require("./router/route")

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET"],
    credentials: true,
    exposedHeaders: "Authorization",
  })
);

const port = process.env.PORT || 5000;

app.use("/",routes)

app.listen(port, () => {
  console.log(`server starting in port ${port}`);
});
