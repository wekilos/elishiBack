var Sequelize = require("sequelize");
const { User, UserCodes } = require("../../models");
var sequelize = require("../../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Func = require("../functions/functions");
const Op = Sequelize.Op;

const mailSend = require("../functions/mailSend");

const SendCode = async (req, res) => {
    const { email, phone } = req.body;
    const userCode = UserCodes.findOne({ where: { email: email } });
    if (userCode) {
        UserCodes.destroy({
            where: {
                email: email,
            },
        })
            .then(() => {
                let randomNumber = Math.floor(100000 + Math.random() * 900000);
                UserCodes.create({
                    email: email,
                    phone: phone,
                    code: randomNumber,
                })
                    .then(() => {
                        let data = {
                            email: email,
                            subject: "Email verification code: " + randomNumber,
                            text:
                                "Siziň Tassyklaýyş kodyňyz: " +
                                randomNumber +
                                "\n",
                        };

                        mailSend.SendMail(data);
                        res.send("Successfully!");
                    })
                    .catch((err) => {
                        console.log(err);
                        res.json({ error: err });
                    });
            })
            .catch((err) => {
                console.log(err);
                res.json({ error: err });
            });
    } else {
        let randomNumber = Math.floor(100000 + Math.random() * 900000);
        UserCodes.create({
            email: email,
            phone: phone,
            code: randomNumber,
        })
            .then(() => {
                let data = {
                    email: email,
                    subject: "Email verification code: " + randomNumber,
                    text: "Siziň Tassyklaýyş kodyňyz: " + randomNumber + "\n",
                };

                mailSend.SendMail(data);
                res.send("Successfully!");
            })
            .catch((err) => {
                console.log(err);
                res.json({ error: err });
            });
    }
};

const CheckCode = async (req, res) => {
    const { code, email, phone } = req.body;
    const usercode = await UserCodes.findOne({
        where: {
            [Op.and]: [{ code: code }, { email: email }, { phone: phone }],
        },
    });

    if (usercode) {
        res.send(true);
    } else {
        res.send(false);
    }
};

exports.SendCode = SendCode;
exports.CheckCode = CheckCode;
