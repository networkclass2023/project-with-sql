const http = require("http");
const path = require("path");
const bodyParser = require("body-parser");
const sequelize = require("./util/database.js");
const express = require("express");
const adminRoutes = require("./routes/admin.js");
const shopRoutes = require("./routes/shop.js");
const Product = require("./models/product.js");
const Cart = require("./models/cart.js");
const CartItem = require("./models/cart-item.js");
const Order = require("./models/order.js");
const OrderItem = require("./models/order-item.js");
const User = require("./models/user.js");
const app = express();
const errorController = require("./controllers/error.js");

app.set("view engine", "ejs");
app.set("views");

// sequelize.execute("SELECT * FROM products")
// .then((result) => {
// console.log(result);
// })
// .catch((err) => {
// console.log(err);
// });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);

const routes = require("./old/routes.js");

const server = http.createServer(app);

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });

sequelize
  // .sync({ force: true })
  .sync()
  .then((result) => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "MAX", email: "test@test.com" });
    }
    return user;
  })
  .then((user) => {
    return user.createCart();
  })
  .then((cart) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
