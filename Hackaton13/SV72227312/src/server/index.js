const express = require("express");
const mongoose = require('mongoose');
const routesUsers = require("../modules/users/route");
const routesCourse = require("../modules/courses/route"); 
const routesOrder = require("../modules/orders/route"); 
const routesCoupon = require("../modules/coupon/route"); 
const routesPayment = require("../modules/payment/route"); 


class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.originPath = "/api";
        this.mongoUri = `${process.env.DATABASE_URI}/${process.env.DATABASE_NAME}`;
        this.userPath = `${this.originPath}/users`;
        this.coursePath = `${this.originPath}/courses`;
        this.orderPath = `${this.originPath}/order`;
        this.couponPath = `${this.originPath}/coupon`;
        this.paymentPath = `${this.originPath}/payment`;

        this.middleware();
        this.routes();
        this.db();
    }

    middleware() {
        this.app.use(express.json());
    }

    async db() {
        await mongoose.connect(this.mongoUri).then(() => {
            console.log("Base de datos conectada!!");
        });
    }

    routes() {
        this.app.use(this.userPath, routesUsers);
        this.app.use(this.coursePath, routesCourse);
        this.app.use(this.orderPath, routesOrder);
        this.app.use(this.couponPath, routesCoupon);
        this.app.use(this.paymentPath, routesPayment);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}`);
        });
    }
}

module.exports = Server;