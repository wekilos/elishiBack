var Sequelize = require("sequelize");
const { User } = require("../../models");
var sequelize = require("../../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Func = require("../functions/functions");
const Op = Sequelize.Op;
const fs = require("fs");

const getAllUser = async (req, res) => {
    const { active } = req.query;
    User.findAll({
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
    const user = await User.findOne({ where: { id: id } });
    if (user) {
        User.findOne({
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
    const { name, email, phone, password } = req.body;
    const img = req.files?.img;
    let fileDirection = "";
    const existUser = await User.findOne({
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
                if (req.files?.img) {
                    let randomNumber = Math.floor(Math.random() * 999999999999);
                    fileDirection = `./uploads/` + randomNumber + `${img.name}`;
                    fs.writeFile(fileDirection, img.data, function (err) {
                        console.log(err);
                    });
                }

                User.create({
                    name,
                    email,
                    phone,
                    password,
                    img: fileDirection,
                    password: hashpassword,
                    active: true,
                    deleted: false,
                })
                    .then(async (data) => {
                        jwt.sign(
                            {
                                id: data.id,
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

    await User.findOne({
        where: { phone: phone },
    })
        .then(async (data) => {
            if (!data.active) {
                res.json({ msg: "Siz DisActive edilen!" });
                return 0;
            }

            if (await bcrypt.compare(password, data.password)) {
                const token = jwt.sign(
                    {
                        id: data.id,
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
    const { name, email, phone, id } = req.body;
    const img = req.files?.img;
    let fileDirection = "";
    const user = await User.findOne({ where: { id: id } });
    if (!user) {
        res.json("Bu Id boyuncha User yok1");
    } else {
        if (req.files?.img) {
            if (user.img) {
                fs.unlink(user.img, (err) => {
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
        User.update(
            {
                name,
                email,
                phone,
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
};

const forgot = async (req, res) => {
    const { password, phone } = req.body;

    const user = await User.findOne({ where: { phone: phone } });
    if (!user) {
        res.json("Bu nomurda boyuncha User yok1");
    }
    const salt = bcrypt.genSaltSync();
    bcrypt.hash(password, salt, (err, hashpassword) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ msg: "Error", err: err });
        } else {
            User.update(
                {
                    password: hashpassword,
                    active: true,
                    deleted: false,
                },
                {
                    where: {
                        phone: phone,
                    },
                }
            )
                .then(async (data) => {
                    jwt.sign(
                        {
                            id: user.id,
                            name: user.name,
                            phone: user.phone,
                            email: user.email,
                        },
                        Func.Secret(),
                        (err, token) => {
                            res.status(200).json({
                                msg: "Suссessfully",
                                token: token,
                                id: user.id,
                                name: user.name,
                                phone: user.phone,
                                email: user.email,
                            });
                        }
                    );
                    // res.json("updated")
                })
                .catch((err) => {
                    console.log(err);
                    res.json("create user", err);
                });
        }
    });
};

const disActive = async (req, res) => {
    const { id } = req.params;
    let user = await User.findOne({ where: { id } });
    if (user) {
        User.update(
            {
                active: false,
            },
            {
                where: {
                    id,
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
        res.json("Bu Id Boyuncha User yok!");
    }
};

const Active = async (req, res) => {
    const { id } = req.params;
    let user = await User.findOne({ where: { id } });
    if (user) {
        User.update(
            {
                active: true,
            },
            {
                where: {
                    id,
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
        res.json("Bu Id Boyuncha User yok!");
    }
};

exports.getAllUser = getAllUser;
exports.getOneUser = getOneUser;
exports.create = create;
exports.login = login;
exports.update = update;
exports.forgot = forgot;
exports.disActive = disActive;
exports.Active = Active;
