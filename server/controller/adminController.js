var Sequelize = require("sequelize");
var sequelize = require("../../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Func = require("../functions/functions");
const { Admin } = require("../../models");
const Op = Sequelize.Op;
const fs = require("fs");

const getAllUser = async (req, res) => {
    const { active } = req.query;
    Admin.findAll({
        where: {
            active: active,
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

const getOneUser = async (req, res) => {
    const { id } = req.params;
    const user = await Admin.findOne({ where: { id: id } });
    if (user) {
        Admin.findOne({
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
        res.send("BU ID boyuncha User yok!");
    }
};

const create = async (req, res) => {
    const { name, email, phone, superAdmin, operator, password } = req.body;
    const img = req.files?.img;
    let fileDirection = "";
    const existUser = await Admin.findOne({
        where: {
            phone: phone,
        },
    });

    const salt = bcrypt.genSaltSync();
    bcrypt.hash(password, salt, (err, hashpassword) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ msg: "Error", err: err });
        } else {
            if (existUser) {
                let text = "Bu emailde ulanyjy onden bar.";
                res.json({
                    msg: text,
                });
            } else {
                if (img) {
                    let randomNumber = Math.floor(Math.random() * 999999999999);
                    fileDirection = `./uploads/` + randomNumber + `${img.name}`;
                    fs.writeFile(fileDirection, img.data, function (err) {
                        console.log(err);
                    });
                }
                Admin.create({
                    name,
                    email,
                    phone,
                    superAdmin,
                    operator,
                    password: hashpassword,
                    img: fileDirection,
                    active: true,
                    deleted: false,
                })
                    .then(async (data) => {
                        let role = {
                            superAdmin: data.superAdmin,
                            operator: data.operator,
                        };
                        jwt.sign(
                            {
                                id: data.id,
                                role: role,
                                name: data.name,
                                phone: data.phone,
                                email: data.email,
                            },
                            Func.Secret(),
                            (err, token) => {
                                res.status(200).json({
                                    msg: "Suссessfully",
                                    token: token,
                                    id: data.id,
                                    role: role,
                                    name: data.name,
                                    phone: data.phone,
                                    email: data.email,
                                });
                            }
                        );
                    })
                    .catch((err) => {
                        console.log(err);
                        res.json("create user", err);
                    });
            }
        }
    });
};

const login = async (req, res) => {
    const { phone, password } = req.body;

    await Admin.findOne({
        where: { phone: phone },
    })
        .then(async (data) => {
            if (!data.active) {
                res.json("You DisActived!");
                return 0;
            }
            let role = {
                superAdmin: data.superAdmin,
                operator: data.operator,
            };

            if (await bcrypt.compare(password, data.password)) {
                const token = jwt.sign(
                    {
                        id: data.id,
                        role: role,
                        name: data.name,
                        phone: data.phone,
                        email: data.email,
                    },
                    Func.Secret()
                );

                return res.json({
                    id: data.id,
                    token: token,
                    id: data.id,
                    role: role,
                    name: data.name,
                    phone: data.phone,
                    email: data.email,
                    login: true,
                });
            } else {
                let text = "Siziň ulanyjy adyňyz ýa-da açar sözüňiz nädogry!";
                res.send({
                    msg: text,
                    login: false,
                });
            }
        })
        .catch((err) => {
            let text = "Hasaba alynmadyk ulanyjy!";
            res.send({ login: false, msg: text, err: err });
        });
};

const update = async (req, res) => {
    const { name, email, phone, superAdmin, operator, password, id } = req.body;
    const img = req.files?.img;
    let fileDirection = "";

    const admin = await Admin.findOne({ where: { id: id } });
    const salt = bcrypt.genSaltSync();
    if (admin) {
        bcrypt.hash(password, salt, (err, hashpassword) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ msg: "Error", err: err });
            } else {
                if (req.files?.img) {
                    if (admin.img) {
                        console.log(admin.img);
                        fs.unlink(admin.img, (err) => {
                            console.log(err);
                        });
                    }
                    let randomNumber = Math.floor(Math.random() * 999999999999);
                    fileDirection = `./uploads/` + randomNumber + `${img.name}`;
                    fs.writeFile(fileDirection, img.data, function (err) {
                        console.log(err);
                    });
                } else {
                    fileDirection = admin.img;
                }
                Admin.update(
                    {
                        name,
                        email,
                        phone,
                        superAdmin,
                        operator,
                        password: hashpassword,
                        img: fileDirection,
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
                        res.json("updated");
                    })
                    .catch((err) => {
                        console.log(err);
                        res.json("create user", err);
                    });
            }
        });
    } else {
        res.send("BU ID boyuncha Admin yok!");
    }
};

const disActive = async (req, res) => {
    const { id } = req.params;
    let user = await Admin.findOne({ where: { id: id } });
    if (user) {
        Admin.update(
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
        res.json("Bu Id Boyuncha Admin yok!");
    }
};

const Active = async (req, res) => {
    const { id } = req.params;
    let user = await Admin.findOne({ where: { id: id } });
    if (user) {
        Admin.update(
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
        res.json("Bu Id Boyuncha Admin yok!");
    }
};

exports.getAllUser = getAllUser;
exports.getOneUser = getOneUser;
exports.create = create;
exports.login = login;
exports.update = update;
exports.disActive = disActive;
exports.Active = Active;
