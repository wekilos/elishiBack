var Sequelize = require("sequelize");
const {
    Seller,
    Products,
    OrderedProducts,
    Orders,
    User,
    UserAddress,
    Carrier,
    SellerAddress,
} = require("../../models");
const Op = Sequelize.Op;
const fs = require("fs");

const getAll = async (req, res) => {
    const { active, deleted } = req.query;
    const Active = active
        ? {
              active: active,
          }
        : {
              active: true,
          };
    const Deleted = deleted
        ? {
              deleted: deleted,
          }
        : {
              deleted: false,
          };
    Orders.findAll({
        include: [
            { model: Seller, attributes: ["id", "name", "email", "phone"] },
            { model: SellerAddress },
            { model: User, attributes: ["id", "name", "email", "phone"] },
            { model: UserAddress },
            {
                model: Carrier,
                attributes: ["id", "name", "email", "phone"],
            },
            {
                model: OrderedProducts,
                include: [
                    {
                        model: Products,
                    },
                ],
            },
        ],
        where: {
            [Op.and]: [Active, Deleted],
        },
        order: [["id", "DESC"]],
    })
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            console.log(err);
            res.json({ error: err });
        });
};

const getOneUserOrders = async (req, res) => {
    const { active, deleted } = req.query;
    const { id } = req.params;
    const Active = active
        ? {
              active: active,
          }
        : {
              active: true,
          };
    const Deleted = deleted
        ? {
              deleted: deleted,
          }
        : {
              deleted: false,
          };
    Orders.findAll({
        include: [
            { model: Seller, attributes: ["id", "name", "email", "phone"] },
            { model: SellerAddress },
            { model: User, attributes: ["id", "name", "email", "phone"] },
            { model: UserAddress },
            {
                model: Carrier,
                attributes: ["id", "name", "email", "phone"],
            },
            {
                model: OrderedProducts,
                include: [
                    {
                        model: Products,
                    },
                ],
            },
        ],
        where: {
            [Op.and]: [Active, Deleted, { UserId: id }],
        },
        order: [["id", "DESC"]],
    })
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            console.log(err);
            res.json({ error: err });
        });
};

const getOneSellerOrders = async (req, res) => {
    const { active, deleted } = req.query;
    const { id } = req.params;
    const Active = active
        ? {
              active: active,
          }
        : {
              active: true,
          };
    const Deleted = deleted
        ? {
              deleted: deleted,
          }
        : {
              deleted: false,
          };
    Orders.findAll({
        include: [
            { model: Seller, attributes: ["id", "name", "email", "phone"] },
            { model: SellerAddress },
            { model: User, attributes: ["id", "name", "email", "phone"] },
            { model: UserAddress },
            {
                model: Carrier,
                attributes: ["id", "name", "email", "phone"],
            },
            {
                model: OrderedProducts,
                include: [
                    {
                        model: Products,
                    },
                ],
            },
        ],
        where: {
            [Op.and]: [Active, Deleted, { SellerId: id }],
        },
        order: [["id", "DESC"]],
    })
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            console.log(err);
            res.json({ error: err });
        });
};

const getOneCarrierOrders = async (req, res) => {
    const { active, deleted } = req.query;
    const { id } = req.params;
    const Active = active
        ? {
              active: active,
          }
        : {
              active: true,
          };
    const Deleted = deleted
        ? {
              deleted: deleted,
          }
        : {
              deleted: false,
          };
    Orders.findAll({
        include: [
            { model: Seller, attributes: ["id", "name", "email", "phone"] },
            { model: SellerAddress },
            { model: User, attributes: ["id", "name", "email", "phone"] },
            { model: UserAddress },
            {
                model: Carrier,
                attributes: ["id", "name", "email", "phone"],
            },
            {
                model: OrderedProducts,
                include: [
                    {
                        model: Products,
                    },
                ],
            },
        ],
        where: {
            [Op.and]: [Active, Deleted, { CarrierId: id }],
        },
        order: [["id", "DESC"]],
    })
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            console.log(err);
            res.json({ error: err });
        });
};
const getOneOrder = async (req, res) => {
    const { id } = req.params;
    const data = await Orders.findOne({ where: { id: id } });
    if (data) {
        Orders.findOne({
            include: [
                { model: Seller, attributes: ["id", "name", "email", "phone"] },
                { model: SellerAddress },
                { model: User, attributes: ["id", "name", "email", "phone"] },
                { model: UserAddress },
                {
                    model: Carrier,
                    attributes: ["id", "name", "email", "phone"],
                },
                {
                    model: OrderedProducts,
                    include: [
                        {
                            model: Products,
                        },
                    ],
                },
            ],
            where: {
                id: id,
            },
        })
            .then((data) => {
                res.json(data);
            })
            .catch((err) => {
                console.log(err);
                res.json({ error: err });
            });
    } else {
        res.send("BU ID boyuncha Product yok!");
    }
};

const create = async (req, res) => {
    const {
        status,
        carrier_status,
        carrier_price,
        carrier_take,
        UserId,
        UserAddressId,
        SellerId,
        SellerAddressId,
        orderedProducts,
    } = req.body;
    const CarrierId = req.body?.CarrierId ? req.body?.CarrierId : null;
    const seller = await Seller.findOne({ where: { id: SellerId } });
    const sellerAddress = await SellerAddress.findOne({
        where: { id: SellerAddressId },
    });
    const user = await User.findOne({ where: { id: UserId } });
    const userAddress = await UserAddress.findOne({
        where: { id: UserAddressId },
    });

    if (!seller) {
        res.send("Bu SellerId yok!");
    }
    if (!sellerAddress) {
        res.send("Bu sellerAddressId yok!");
    }
    if (!user) {
        res.send("Bu userId yok!");
    }
    if (!userAddress) {
        res.send("Bu suserAddressId yok!");
    }

    if (seller && sellerAddress && userAddress && user) {
        Orders.create({
            status,
            carrier_status,
            carrier_price,
            carrier_take,
            UserId,
            UserAddressId,
            SellerId,
            SellerAddressId,
            CarrierId,
            active: true,
            deleted: false,
        })
            .then(async (data) => {
                orderedProducts?.map(async (ordered, i) => {
                    let product = await Products.findOne({
                        id: ordered.ProductId,
                    });
                    let price = 0;
                    if (product?.is_sale) {
                        price = product?.sale_price;
                    } else {
                        price = product?.price;
                    }
                    OrderedProducts.create({
                        price: price,
                        amount: ordered.amount,
                        ProductId: ordered.ProductId,
                        OrderId: data.id,
                    })
                        .then((data) => {
                            i + 1 == orderedProducts.length && res.json(data);
                        })
                        .catch((err) => {
                            console.log(err);
                            res.json({ error: err });
                        });
                });
            })
            .catch((err) => {
                console.log(err);
                res.json("create order", err);
            });
    }
};

const update = async (req, res) => {
    const { status, carrier_status, carrier_price, carrier_take, id } =
        req.body;
    const data = await Orders.findOne({ where: { id: id } });
    if (data) {
        const CarrierId = req.body?.CarrierId
            ? req.body?.CarrierId
            : data.CarrierId;
        Orders.update(
            {
                status,
                carrier_status,
                carrier_price,
                carrier_take,
                CarrierId,
                active: true,
                deleted: false,
            },
            {
                where: {
                    id: id,
                },
            }
        )
            .then(async (data) => {
                res.json(data);
            })
            .catch((err) => {
                console.log(err);
                res.json("create Order", err);
            });
    } else {
        res.send("Bu Id boyuncha Order yok!");
    }
};

const disActive = async (req, res) => {
    const { id } = req.params;
    let data = await Orders.findOne({ where: { id } });
    if (data) {
        Orders.update(
            {
                active: false,
            },
            {
                where: {
                    id: id,
                },
            }
        )
            .then(() => {
                res.json("DisActived!");
            })
            .catch((err) => {
                console.log(err);
                res.json({ err: err });
            });
    } else {
        res.json("Bu Id Boyuncha Order yok!");
    }
};

const Active = async (req, res) => {
    const { id } = req.params;
    let data = await Orders.findOne({ where: { id } });
    if (data) {
        Orders.update(
            {
                active: true,
            },
            {
                where: {
                    id: id,
                },
            }
        )
            .then(() => {
                res.json("Actived!");
            })
            .catch((err) => {
                console.log(err);
                res.json({ err: err });
            });
    } else {
        res.json("Bu Id Boyuncha Order yok!");
    }
};

const Delete = async (req, res) => {
    const { id } = req.params;
    let data = await Orders.findOne({ where: { id } });
    if (data) {
        Orders.update(
            {
                active: false,
                deleted: true,
            },
            {
                where: {
                    id: id,
                },
            }
        )
            .then(() => {
                res.json("Deleted!");
            })
            .catch((err) => {
                console.log(err);
                res.json({ err: err });
            });
    } else {
        res.json("Bu Id Boyuncha Order yok!");
    }
};

exports.getAll = getAll;
exports.getOneUserOrders = getOneUserOrders;
exports.getOneSellerOrders = getOneSellerOrders;
exports.getOneCarrierOrders = getOneCarrierOrders;
exports.getOneOrder = getOneOrder;
exports.create = create;
exports.update = update;
exports.disActive = disActive;
exports.Active = Active;
exports.Delete = Delete;
