var Sequelize = require("sequelize");
const {
    Seller,
    Products,
    Categories,
    SubCategories,
    ProductImg,
} = require("../../models");
var sequelize = require("../../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Func = require("../functions/functions");
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
    Products.findAll({
        include: [
            { model: Seller, attributes: ["id", "name", "email", "phone"] },
            { model: Categories },
            { model: SubCategories },
            { model: ProductImg },
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

const getOneUserProducts = async (req, res) => {
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
    Products.findAll({
        include: [
            { model: Seller, attributes: ["id", "name", "email", "phone"] },
            { model: Categories },
            { model: SubCategories },
            { model: ProductImg },
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

const getOneCategoryProducts = async (req, res) => {
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
    Products.findAll({
        include: [
            { model: Seller, attributes: ["id", "name", "email", "phone"] },
            { model: Categories },
            { model: SubCategories },
            { model: ProductImg },
        ],
        where: {
            [Op.and]: [Active, Deleted, { CategoryId: id }],
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

const getOneSubCategoryProducts = async (req, res) => {
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
    Products.findAll({
        include: [
            { model: Seller, attributes: ["id", "name", "email", "phone"] },
            { model: Categories },
            { model: SubCategories },
            { model: ProductImg },
        ],
        where: {
            [Op.and]: [Active, Deleted, { SubCategoryId: id }],
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
const getOneProduct = async (req, res) => {
    const { id } = req.params;
    const data = await Products.findOne({ where: { id: id } });
    if (data) {
        Products.findOne({
            include: [
                { model: Seller, attributes: ["id", "name", "email", "phone"] },
                { model: Categories },
                { model: SubCategories },
                { model: ProductImg },
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
        name,
        description,
        welayat,
        etrap,
        address,
        lat,
        lang,
        currency,
        unit,
        is_sale,
        sale_until,
        sale_price,
        price,
        status,
        toleg,
        SellerId,
        CategoryId,
        SubCategoryId,
    } = req.body;
    const seller = await Seller.findOne({ where: { id: SellerId } });
    const category = await Categories.findOne({ where: { id: CategoryId } });
    const subCategory = await SubCategories.findOne({
        where: { id: SubCategoryId },
    });
    if (!seller) {
        res.send("Bu SellerId yok!");
    }
    if (!category) {
        res.send("Bu categoryId yok!");
    }
    if (!subCategory) {
        res.send("Bu subCategoryId yok!");
    }
    if (seller && category && subCategory) {
        Products.create({
            name,
            description,
            welayat,
            etrap,
            address,
            lat,
            lang,
            currency,
            unit,
            is_sale,
            sale_until,
            sale_price,
            price,
            status,
            toleg,
            SellerId,
            CategoryId,
            SubCategoryId,
            active: true,
            deleted: false,
        })
            .then(async (data) => {
                res.json(data);
            })
            .catch((err) => {
                console.log(err);
                res.json("create product", err);
            });
    }
};

const uploadPictures = async (req, res) => {
    const { id } = req.params;
    const imgs =
        req.files.imgs.constructor === Array
            ? req.files.imgs
            : [req.files.imgs];

    imgs?.map(async (file, i) => {
        let randomNumber = Math.floor(Math.random() * 999999999999);
        let fileDirection = `./uploads/` + randomNumber + `${file.name}`;
        fs.writeFile(fileDirection, file.data, function (err) {
            console.log(err);
        });
        await ProductImg.create({
            img: fileDirection,
            ProductId: id,
            active: true,
            deleted: false,
        })
            .then(() => {
                i + 1 == imgs.length && res.json("Succesfully!");
            })
            .catch((err) => {
                console.log(err);
                res.json(err);
            });
    });
};
const update = async (req, res) => {
    const {
        name,
        description,
        welayat,
        etrap,
        address,
        lat,
        lang,
        currency,
        unit,
        is_sale,
        sale_until,
        sale_price,
        price,
        status,
        toleg,
        id,
    } = req.body;
    const data = await Products.findOne({ where: { id: id } });
    if (data) {
        Products.update(
            {
                name,
                description,
                welayat,
                etrap,
                address,
                lat,
                lang,
                currency,
                unit,
                is_sale,
                sale_until,
                sale_price,
                price,
                status,
                toleg,
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
                res.json("create product", err);
            });
    } else {
        res.send("Bu Id boyuncha Product yok!");
    }
};

const disActive = async (req, res) => {
    const { id } = req.params;
    let data = await Products.findOne({ where: { id } });
    if (data) {
        Products.update(
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
        res.json("Bu Id Boyuncha Product yok!");
    }
};

const Active = async (req, res) => {
    const { id } = req.params;
    let data = await Products.findOne({ where: { id } });
    if (data) {
        Products.update(
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
        res.json("Bu Id Boyuncha Product yok!");
    }
};

const Delete = async (req, res) => {
    const { id } = req.params;
    let data = await Products.findOne({ where: { id } });
    if (data) {
        Products.update(
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
        res.json("Bu Id Boyuncha Product yok!");
    }
};

exports.getAll = getAll;
exports.getOneUserProducts = getOneUserProducts;
exports.getOneCategoryProducts = getOneCategoryProducts;
exports.getOneSubCategoryProducts = getOneSubCategoryProducts;
exports.getOneProduct = getOneProduct;
exports.create = create;
exports.uploadPictures = uploadPictures;
exports.update = update;
exports.disActive = disActive;
exports.Active = Active;
exports.Delete = Delete;
