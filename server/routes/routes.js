const express = require("express");
// const { verify } = require("crypto");
const Func = require("../functions/functions");
const sequelize = require("../../config/db");
const router = express.Router();
const jwt = require("jsonwebtoken");
const cache = require("../../config/node-cache");
const path = require("path");

// Controllers
const UserControllers = require("../controller/userController");
const UserCodesControllers = require("../controller/userCodesController");
const UserAddressControllers = require("../controller/userAddressController");
const AdminControllers = require("../controller/adminController");
const AdminAddressControllers = require("../controller/adminAddressController");
const SellerControllers = require("../controller/sellerController");
const SellerAddressControllers = require("../controller/sellerAddressController");
const CarrierControllers = require("../controller/carrierController");
const CarrierAddressControllers = require("../controller/carrierAddressController");
const CarrierPhoneControllers = require("../controller/carrierPhonesController");
const CarrierPricesControllers = require("../controller/carrierPricesController");
const CategoriesControllers = require("../controller/categoryController");
const SubCategoriesControllers = require("../controller/subCategoryController");
const ProductsControllers = require("../controller/productsController");
const OrdersControllers = require("../controller/ordersController");

// // Routes

// User Routes
// router.get("/user/type",cache.get,UserTypeControllers.getUserType,cache.set);
router.get("/user/all", cache.get, UserControllers.getAllUser, cache.set);
router.get("/user/one/:id", cache.get, UserControllers.getOneUser, cache.set);
router.post("/user/create", UserControllers.create);
router.post("/user/login", UserControllers.login);
router.patch("/user/update", UserControllers.update);
router.patch("/user/forgot", UserControllers.forgot);
router.patch("/user/disActive/:id", UserControllers.disActive);
router.patch("/user/Active/:id", UserControllers.Active);

router.post("/send/code", UserCodesControllers.SendCode);
router.post("/check/code", UserCodesControllers.CheckCode);

//User Address
router.get(
    "/user/all/address",
    cache.get,
    UserAddressControllers.getAllAddress,
    cache.set
);
router.get(
    "/one/user/all/address/:id",
    cache.get,
    UserAddressControllers.getOneUserAllAddress,
    cache.set
);
router.get(
    "/user/one/address/:id",
    cache.get,
    UserAddressControllers.getOneAddress,
    cache.set
);
router.post("/user/create/address", UserAddressControllers.create);
router.patch("/user/update/address", UserAddressControllers.update);
router.patch("/user/disActive/address/:id", UserAddressControllers.disActive);
router.patch("/user/Active/address/:id", UserAddressControllers.Active);
router.delete("/user/delete/address/:id", UserAddressControllers.Delete);

//   Admin Routers
router.get("/admin/all", cache.get, AdminControllers.getAllUser, cache.set);
router.get("/admin/one/:id", cache.get, AdminControllers.getOneUser, cache.set);
router.post("/admin/create", AdminControllers.create);
router.post("/admin/login", AdminControllers.login);
router.patch("/admin/update", AdminControllers.update);
router.patch("/admin/disActive/:id", AdminControllers.disActive);
router.patch("/admin/Active/:id", AdminControllers.Active);

// AdminAddress
router.get(
    "/admin/all/address",
    cache.get,
    AdminAddressControllers.getAllAddress,
    cache.set
);
router.get(
    "/one/admin/all/address/:id",
    cache.get,
    AdminAddressControllers.getOneUserAllAddress,
    cache.set
);
router.get(
    "/admin/one/address/:id",
    cache.get,
    AdminAddressControllers.getOneAddress,
    cache.set
);
router.post("/admin/create/address", AdminAddressControllers.create);
router.patch("/admin/update/address", AdminAddressControllers.update);
router.patch("/admin/disActive/address/:id", AdminAddressControllers.disActive);
router.patch("/admin/Active/address/:id", AdminAddressControllers.Active);
router.delete("/admin/delete/address/:id", AdminAddressControllers.Delete);

// Seller Routers
router.get("/seller/all", cache.get, SellerControllers.getAllSeller, cache.set);
router.get("/seller/one/:id", cache.get, SellerControllers.getOne, cache.set);
router.post("/seller/create", SellerControllers.create);
router.post("/seller/login", SellerControllers.login);
router.patch("/seller/update", SellerControllers.update);
router.patch("/seller/forgot", SellerControllers.forgot);
router.patch("/seller/disActive/:id", SellerControllers.disActive);
router.patch("/seller/Active/:id", SellerControllers.Active);

// Seller Address
router.get(
    "/seller/all/address",
    cache.get,
    SellerAddressControllers.getAllAddress,
    cache.set
);
router.get(
    "/one/seller/all/address/:id",
    cache.get,
    SellerAddressControllers.getOneUserAllAddress,
    cache.set
);
router.get(
    "/seller/one/address/:id",
    cache.get,
    SellerAddressControllers.getOneAddress,
    cache.set
);
router.post("/seller/create/address", SellerAddressControllers.create);
router.patch("/seller/update/address", SellerAddressControllers.update);
router.patch(
    "/seller/disActive/address/:id",
    SellerAddressControllers.disActive
);
router.patch("/seller/Active/address/:id", SellerAddressControllers.Active);
router.delete("/seller/delete/address/:id", SellerAddressControllers.Delete);

// Carrier Routers
router.get("/carrier/all", cache.get, CarrierControllers.getAll, cache.set);
router.get("/carrier/one/:id", cache.get, CarrierControllers.getOne, cache.set);
router.post("/carrier/create", CarrierControllers.create);
router.post("/carrier/login", CarrierControllers.login);
router.patch("/carrier/update", CarrierControllers.update);
router.patch("/carrier/forgot", CarrierControllers.forgot);
router.patch("/carrier/disActive/:id", CarrierControllers.disActive);
router.patch("/carrier/Active/:id", CarrierControllers.Active);

//Carrier Address
router.get(
    "/carrier/all/address",
    cache.get,
    CarrierAddressControllers.getAllAddress,
    cache.set
);
router.get(
    "/one/carrier/all/address/:id",
    cache.get,
    CarrierAddressControllers.getOneUserAllAddress,
    cache.set
);
router.get(
    "/carrier/one/address/:id",
    cache.get,
    CarrierAddressControllers.getOneAddress,
    cache.set
);
router.post("/carrier/create/address", CarrierAddressControllers.create);
router.patch("/carrier/update/address", CarrierAddressControllers.update);
router.patch(
    "/carrier/disActive/address/:id",
    CarrierAddressControllers.disActive
);
router.patch("/carrier/Active/address/:id", CarrierAddressControllers.Active);
router.delete("/carrier/delete/address/:id", CarrierAddressControllers.Delete);

// Carrier Phone
router.get(
    "/carrier/all/phone",
    cache.get,
    CarrierPhoneControllers.getAll,
    cache.set
);
router.get(
    "/one/carrier/all/phone/:id",
    cache.get,
    CarrierPhoneControllers.getOneUserAllPhones,
    cache.set
);
router.get(
    "/carrier/one/phone/:id",
    cache.get,
    CarrierPhoneControllers.getOnePhone,
    cache.set
);
router.post("/carrier/create/phone", CarrierPhoneControllers.create);
router.patch("/carrier/update/phone", CarrierPhoneControllers.update);
router.patch("/carrier/disActive/phone/:id", CarrierPhoneControllers.disActive);
router.patch("/carrier/Active/phone/:id", CarrierPhoneControllers.Active);
router.delete("/carrier/delete/phone/:id", CarrierPhoneControllers.Delete);

// Carrier Prices
router.get(
    "/carrier/all/price",
    cache.get,
    CarrierPricesControllers.getAll,
    cache.set
);
router.get(
    "/one/carrier/all/price/:id",
    cache.get,
    CarrierPricesControllers.getOneUserAllPrices,
    cache.set
);
router.get(
    "/carrier/one/price/:id",
    cache.get,
    CarrierPricesControllers.getOnePrice,
    cache.set
);
router.post("/carrier/create/price", CarrierPricesControllers.create);
router.patch("/carrier/update/price", CarrierPricesControllers.update);
router.patch(
    "/carrier/disActive/price/:id",
    CarrierPricesControllers.disActive
);
router.patch("/carrier/Active/price/:id", CarrierPricesControllers.Active);
router.delete("/carrier/delete/price/:id", CarrierPricesControllers.Delete);

// Category Routes
router.get("/category/all", cache.get, CategoriesControllers.getAll, cache.set);
router.get(
    "/category/one/:id",
    cache.get,
    CategoriesControllers.getOneCategory,
    cache.set
);
router.post("/category/create", CategoriesControllers.create);
router.patch("/category/update", CategoriesControllers.update);
router.patch("/category/disActive/:id", CategoriesControllers.disActive);
router.patch("/category/Active/:id", CategoriesControllers.Active);
router.delete("/category/delete/:id", CategoriesControllers.Delete);

// SubCategory Routes
router.get(
    "/subCategory/all",
    cache.get,
    SubCategoriesControllers.getAll,
    cache.set
);
router.get(
    "/subCategory/one/:id",
    cache.get,
    SubCategoriesControllers.getOneSubCategory,
    cache.set
);
router.post("/subCategory/create", SubCategoriesControllers.create);
router.patch("/subCategory/update", SubCategoriesControllers.update);
router.patch("/subCategory/disActive/:id", SubCategoriesControllers.disActive);
router.patch("/subCategory/Active/:id", SubCategoriesControllers.Active);
router.delete("/subCategory/delete/:id", SubCategoriesControllers.Delete);

// . Products Routes
router.get("/product/all", cache.get, ProductsControllers.getAll, cache.set);
router.get(
    "/product/all/seller/:id",
    cache.get,
    ProductsControllers.getOneUserProducts,
    cache.set
);
router.get(
    "/product/all/category/:id",
    cache.get,
    ProductsControllers.getOneCategoryProducts,
    cache.set
);
router.get(
    "/product/all/subCategory/:id",
    cache.get,
    ProductsControllers.getOneSubCategoryProducts,
    cache.set
);
router.get(
    "/product/one/:id",
    cache.get,
    ProductsControllers.getOneProduct,
    cache.set
);
router.post("/product/create", ProductsControllers.create);
router.post("/product/img/create/:id", ProductsControllers.uploadPictures);
router.patch("/product/update", ProductsControllers.update);
router.patch("/product/disActive/:id", ProductsControllers.disActive);
router.patch("/product/Active/:id", ProductsControllers.Active);
router.delete("/product/delete/:id", ProductsControllers.Delete);

// Orders Routes
router.get("/orders/all", cache.get, OrdersControllers.getAll, cache.set);
router.get(
    "/orders/all/user/:id",
    cache.get,
    OrdersControllers.getOneUserOrders,
    cache.set
);
router.get(
    "/orders/all/seller/:id",
    cache.get,
    OrdersControllers.getOneSellerOrders,
    cache.set
);
router.get(
    "/orders/all/carrier/:id",
    cache.get,
    OrdersControllers.getOneCarrierOrders,
    cache.set
);
router.get(
    "/orders/one/:id",
    cache.get,
    OrdersControllers.getOneOrder,
    cache.set
);
router.post("/orders/create", OrdersControllers.create);
router.patch("/orders/update", OrdersControllers.update);
router.patch("/orders/disActive/:id", OrdersControllers.disActive);
router.patch("/orders/Active/:id", OrdersControllers.Active);
router.delete("/orders/delete/:id", OrdersControllers.Delete);

// For Token

function verifyToken(req, res, next) {
    const bearerHeader =
        req.headers["authorization"] || req.headers["Authorization"];
    if (typeof bearerHeader !== "undefined") {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];

        jwt.verify(bearerToken, Func.Secret(), (err, authData) => {
            if (err) {
                res.json("err");
                console.log(err);
            } else {
                req.id = authData.id;
            }
        });
        next();
    } else {
        res.send("<center><h2>This link was not found! :(</h2></center>");
    }
}

module.exports = router;
