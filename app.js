const http = require("http");
const path = require("path");
const bodyParser = require("body-parser");
const express = require("express");

const app = express();
const errorController = require("./controllers/error.js");
const mongoConnect = require("./util/database.js").mongoConnect;
const User = require("./models/user.js");

app.set("view engine", "ejs");
app.set("views");
const adminRoutes = require("./routes/admin.js");
const shopRoutes = require("./routes/shop.js");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("5baa2528563f16379fc8a610")
    .then((user) => {
      req.user = new User(user.name, user.email, user.cart, user._id);
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);

const routes = require("./old/routes.js");

const server = http.createServer(app);

mongoConnect(() => {
  app.listen(3000);
});
