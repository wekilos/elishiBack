var Sequelize = require("sequelize");
const { Categories, SubCategories } = require("../../models");
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
    Categories.findAll({
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

const getOneCategory = async (req, res) => {
    const { id } = req.params;
    const data = await Categories.findOne({ where: { id: id } });
    if (data) {
        Categories.findOne({
            include: [
                {
                    model: SubCategories,
                    // attributes: ["id"],
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
        res.send("BU ID boyuncha address yok!");
    }
};

const create = async (req, res) => {
    const { name_tm, name_ru, name_en } = req.body;

    Categories.create({
        name_tm,
        name_ru,
        name_en,
        active: true,
        deleted: false,
    })
        .then(async (data) => {
            res.json(data);
        })
        .catch((err) => {
            console.log(err);
            res.json({ "create Categories": err });
        });
};

const update = async (req, res) => {
    const { name_tm, name_ru, name_en, id } = req.body;
    const data = await Categories.findOne({ where: { id: id } });

    if (!data) {
        let text = "Bu Id-de Categories yok.";
        res.json({
            msg: text,
        });
    } else {
        Categories.update(
            {
                name_tm,
                name_ru,
                name_en,
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
                res.json("update Categories", err);
            });
    }
};

const disActive = async (req, res) => {
    const { id } = req.params;
    let data = await Categories.findOne({ where: { id: id } });
    if (data) {
        Categories.update(
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
        res.json("Bu Id Boyuncha Categories yok!");
    }
};

const Active = async (req, res) => {
    const { id } = req.params;
    let data = await Categories.findOne({ where: { id: id } });
    if (data) {
        Categories.update(
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
        res.json("Bu Id Boyuncha Categories yok!");
    }
};

const Delete = async (req, res) => {
    const { id } = req.params;
    let data = await Categories.findOne({ where: { id: id } });
    if (data) {
        Categories.update(
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
        res.json("Bu Id Boyuncha Categories yok!");
    }
};
exports.getAll = getAll;
exports.getOneCategory = getOneCategory;
exports.create = create;
exports.update = update;
exports.disActive = disActive;
exports.Active = Active;
exports.Delete = Delete;
