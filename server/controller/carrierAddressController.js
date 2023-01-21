var Sequelize = require("sequelize");
const { CarrierAddress, Carrier } = require("../../models");
const Op = Sequelize.Op;
const fs = require("fs");

const getAllAddress = async (req, res) => {
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
    CarrierAddress.findAll({
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

const getOneUserAllAddress = async (req, res) => {
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
    CarrierAddress.findAll({
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

const getOneAddress = async (req, res) => {
    const { id } = req.params;
    const data = await CarrierAddress.findOne({ where: { id: id } });
    if (data) {
        CarrierAddress.findOne({
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
    const { welayat, etrap, address, lat, lang, CarrierId } = req.body;
    const data = await Carrier.findOne({ where: { id: CarrierId } });

    if (!data) {
        let text = "Bu Id-de ulanyjy yok.";
        res.json({
            msg: text,
        });
    } else {
        CarrierAddress.create({
            welayat,
            etrap,
            address,
            lat,
            lang,
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
    const { welayat, etrap, address, lat, lang, id } = req.body;
    const data = await CarrierAddress.findOne({ where: { id: id } });

    if (!data) {
        let text = "Bu Id-de address yok.";
        res.json({
            msg: text,
        });
    } else {
        CarrierAddress.update(
            {
                welayat,
                etrap,
                address,
                lat,
                lang,
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
    let data = await CarrierAddress.findOne({ where: { id: id } });
    if (data) {
        CarrierAddress.update(
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
    let data = await CarrierAddress.findOne({ where: { id: id } });
    if (data) {
        CarrierAddress.update(
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
    let data = await CarrierAddress.findOne({ where: { id: id } });
    if (data) {
        CarrierAddress.update(
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
exports.getAllAddress = getAllAddress;
exports.getOneUserAllAddress = getOneUserAllAddress;
exports.getOneAddress = getOneAddress;
exports.create = create;
exports.update = update;
exports.disActive = disActive;
exports.Active = Active;
exports.Delete = Delete;
