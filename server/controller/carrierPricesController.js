var Sequelize = require("sequelize");
const { CarrierPrices, Carrier } = require("../../models");
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
    CarrierPrices.findAll({
        where: { [Op.and]: [Active, Deleted] },
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

const getOneUserAllPrices = async (req, res) => {
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
    CarrierPrices.findAll({
        include: [
            {
                model: Carrier,
                attributes: ["id", "name", "email", "phone"],
            },
        ],
        where: { [Op.and]: [Active, Deleted, { CarrierId: id }] },
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

const getOnePrice = async (req, res) => {
    const { id } = req.params;
    const data = await CarrierPrices.findOne({ where: { id: id } });
    if (data) {
        CarrierPrices.findOne({
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
        res.send("BU ID boyuncha address yok!");
    }
};

const create = async (req, res) => {
    const { price, description, CarrierId } = req.body;
    const data = await Carrier.findOne({ where: { id: CarrierId } });

    if (!data) {
        let text = "Bu Id-de ulanyjy yok.";
        res.json({
            msg: text,
        });
    } else {
        CarrierPrices.create({
            price,
            description,
            CarrierId,
            active: true,
            deleted: false,
        })
            .then(async (data) => {
                res.json(data);
            })
            .catch((err) => {
                console.log(err);
                res.json("create address", err);
            });
    }
};

const update = async (req, res) => {
    const { price, description, id } = req.body;
    const data = await CarrierPrices.findOne({ where: { id: id } });

    if (!data) {
        let text = "Bu Id-de address yok.";
        res.json({
            msg: text,
        });
    } else {
        CarrierPrices.update(
            {
                price,
                description,
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
                res.json("update address", err);
            });
    }
};

const disActive = async (req, res) => {
    const { id } = req.params;
    let data = await CarrierPrices.findOne({ where: { id: id } });
    if (data) {
        CarrierPrices.update(
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
        res.json("Bu Id Boyuncha Address yok!");
    }
};

const Active = async (req, res) => {
    const { id } = req.params;
    let data = await CarrierPrices.findOne({ where: { id: id } });
    if (data) {
        CarrierPrices.update(
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
        res.json("Bu Id Boyuncha Address yok!");
    }
};

const Delete = async (req, res) => {
    const { id } = req.params;
    let data = await CarrierPrices.findOne({ where: { id: id } });
    if (data) {
        CarrierPrices.update(
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
        res.json("Bu Id Boyuncha Address yok!");
    }
};
exports.getAll = getAll;
exports.getOneUserAllPrices = getOneUserAllPrices;
exports.getOnePrice = getOnePrice;
exports.create = create;
exports.update = update;
exports.disActive = disActive;
exports.Active = Active;
exports.Delete = Delete;
