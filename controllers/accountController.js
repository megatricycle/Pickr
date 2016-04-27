/*
    Controller for the model "account".
*/

import express from 'express';
import nodemailer from 'nodemailer';
let router  = express.Router();

// be sure to import your model here
import * as error from '../src/constants/ErrorTypes';
import { Account } from '../models';

exports.insert = (req, res) => {
    if (!req.body.fname && !req.body.mi && !req.body.lname && !req.body.username
    && !req.body.email && !req.body.password) {
        res.status(error.INC_DATA.code).send({INC_DATA: error.INC_DATA.message});
    }

    Account.findOne({
        where: {
            username: req.body.username
        }
    }).then((user) => {
        if(user) {
            res.status(error.DUP_ENTRY.code).send({DUP_ENTRY: error.DUP_ENTRY.message});
        } else {
            Account.create({
                Fname:        req.body.fname,
                MI:           req.body.mi,
                Lname:        req.body.lname,
                Username:     req.body.username,
                EmailAddress: req.body.email,
                Password:     req.body.password
            }).then((account) => {
                res.status(200).send(account);
            }).catch((err) => {
                res.status(error.NO_RECORD_CREATED.code).send({NO_RECORD_CREATED: error.NO_RECORD_CREATED.message});
            });
        }
    }).catch((err) =>{
        res.status(error.SERVER_ERR.code).send({SERVER_ERR: error.SERVER_ERR.message});
    });
}

exports.login = (req, res) => {
    Account.findOne({
        where: {
            username: req.body.username
        }
    }).then((user) => {
        if(!user && !req.session.user) {
            res.status(error.INV_USER.code).send({INV_USER: error.INV_USER.message});
        } else {
            Account.findOne({
                where: {
                    username: req.body.username,
                    password: req.body.password
                }
            }).then((user) => {
                if(!user && !req.session.user) {
                    res.status(error.INV_PASS.code).send({INV_PASS: error.INV_PASS.message})
                } else {
                    if (!req.session.user) {
                        req.session.user = req.body.username;
                        res.status(200).send({username:user.dataValues.Username, status:'logged in'});
                    } else {
                        res.status(error.UNAUTH.code).send({UNAUTH: error.UNAUTH.message});
                    }
                }
            }).catch((err) => {
                res.status(error.LOG_FAIL.code).send({LOG_FAIL: error.LOG_FAIL.message});
            });
        }
    }).catch((err) => {
        res.status(error.LOG_FAIL.code).send({LOG_FAIL: error.LOG_FAIL.message});
    });
}

exports.logout = (req, res) => {
    if (req.session.user) {
        req.session.destroy();
        res.status(200).send({status:'logged out'});
    } else {
        res.status(error.UNAUTH.code).send({UNAUTH: error.UNAUTH});
    }

}

exports.changePassword = (req, res) => {
    console.log(req.body.email);
    Account.findOne({ where: {EmailAddress: req.body.email} })
    .then((user) => {
        if(user) {
            return user;
        }
        else {
            res.sendStatus(404);
        }
    })
    .then((user) => {
        if(user) {
            let transporter = nodemailer.createTransport('smtps://cmsc128ab3l@gmail.com:icsuseruser@smtp.gmail.com');

            let mailOptions = {
                from: '"Pickr👥" <cmsc128ab3l@gmail.com>', // sender address
                to: user.dataValues.EmailAddress, // list of receivers
                subject: 'Password Reset ✔', // Subject line
                text: 'Hello world 🐴', // plaintext body
                html: '<b>Hello world 🐴</b>' // html body
            };

            // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                    res.send(error);
                }
                else {
                    console.log('Message sent: ' + info.response);
                    res.send(info.response);
                }
            });
        }
        else {
            res.sendStatus(400);
        }
    })
    .catch((err) => {
        res.sendStatus(500);
    });
}
