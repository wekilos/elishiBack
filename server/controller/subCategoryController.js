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
    SubCategories.findAll({
        include: [
            {
                model: Categories,
            },
        ],
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

const getOneSubCategory = async (req, res) => {
    const { id } = req.params;
    const data = await SubCategories.findOne({ where: { id: id } });
    if (data) {
        SubCategories.findOne({
            include: [
                {
                    model: Categories,
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
        res.send("BU ID boyuncha SubCategories yok!");
    }
};

const create = async (req, res) => {
    const { name_tm, name_ru, name_en, CategoryId } = req.body;

    const data = await Categories.findOne({ where: { id: CategoryId } });
    if (data) {
        SubCategories.create({
            name_tm,
            name_ru,
            name_en,
            CategoryId,
            active: true,
            deleted: false,
        })
            .then(async (data) => {
                res.json(data);
            })
            .catch((err) => {
                console.log(err);
                res.json({ "create SubCategories": err });
            });
    } else {
        res.json("Bu Id boyuncha Categories yok!");
    }
};

const update = async (req, res) => {
    const { name_tm, name_ru, name_en, id } = req.body;
    const data = await SubCategories.findOne({ where: { id: id } });

    if (!data) {
        let text = "Bu Id-de SubCategories yok.";
        res.json({
            msg: text,
        });
    } else {
        SubCategories.update(
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
                res.json("update SubCategories", err);
            });
    }
};

const disActive = async (req, res) => {
    const { id } = req.params;
    let data = await SubCategories.findOne({ where: { id: id } });
    if (data) {
        SubCategories.update(
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
        res.json("Bu Id Boyuncha SubCategories yok!");
    }
};

const Active = async (req, res) => {
    const { id } = req.params;
    let data = await SubCategories.findOne({ where: { id: id } });
    if (data) {
        SubCategories.update(
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
        res.json("Bu Id Boyuncha SubCategories yok!");
    }
};

const Delete = async (req, res) => {
    const { id } = req.params;
    let data = await SubCategories.findOne({ where: { id: id } });
    if (data) {
        SubCategories.update(
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
        res.json("Bu Id Boyuncha SubCategories yok!");
    }
};
exports.getAll = getAll;
exports.getOneSubCategory = getOneSubCategory;
exports.create = create;
exports.update = update;
exports.disActive = disActive;
exports.Active = Active;
exports.Delete = Delete;
