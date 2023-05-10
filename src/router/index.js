const api = require("./api.mobile.router");
const orderRouter = require("./order.router");
const siteRouter = require("./site.router");
const adminRouter = require("./admin.router");
const productRouter = require("./product.router");
const userRouter = require("./user.router");

const route = (app) => {
    app.use("/api",api);
    app.use("/order",orderRouter);
    app.use("/admin",adminRouter);
    app.use("/product",productRouter);
    app.use("/user",userRouter);
    app.use("/",siteRouter);
}

module.exports = route;