var mysql = require('../mysql').pool
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
exports.signInUser = (req, res, next) => {
    mysql.getConnection(function (error, conn) {
        if (error) {
            return res.status(500).send({ error: error })
        }
        conn.query(
            `SELECT * FROM users WHERE email = ?`,
            [req.body.email],
            (error, results, fields) => {
                conn.release()
                if (error) {
                    return res.status(500).semd({ error: error })
                }
                if (results.length < 1) {
                    return res
                        .status(401)
                        .send({ message: 'Falha na autenticação' })
                }
                bcrypt.compare(
                    req.body.password,
                    results[0].password,
                    (err, result) => {
                        if (err) {
                            return res
                                .status(401)
                                .send({ error: 'Falha na autenticação' })
                        }
                        if (result) {
                            let token = jwt.sign(
                                {
                                    id: results[0].id,
                                    email: results[0].email,
                                },
                                process.env.JWT_KEY,
                                {
                                    expiresIn: '7d',
                                }
                            )
                            return res.status(200).send({
                                message: 'Autenticado com sucesso',
                                token: token,
                            })
                        }
                        return res
                            .status(401)
                            .send({ error: 'Falha na autenticação' })
                    }
                )
            }
        )
    })
}
exports.signUpUser = (req, res, next) => {
    mysql.getConnection(function (error, conn) {
        if (error) {
            return res.status(500).send({ error: error })
        }
        conn.query(
            'SELECT * FROM users WHERE email = ?',
            [req.body.email],
            (error, results) => {
                if (results.length > 0) {
                    res.status(401).send({ message: 'Usuário já cadastrado!' })
                } else {
                    bcrypt.hash(req.body.password, 10, (err, hash) => {
                        if (err) {
                            return res.status(500).send({ error: err })
                        }
                        conn.query(
                            `INSERT INTO users (usertype_id,name,email,password) VALUES (?,?,?,?)`,
                            [
                                req.body.usertype_id,
                                req.body.name,
                                req.body.email,
                                hash,
                            ],
                            (error, results) => {
                                conn.release()
                                if (error) {
                                    return res
                                        .status(500)
                                        .send({ error: error })
                                }
                                return res.status(201).send({
                                    message: 'Usuário cadastrado com sucess!',
                                    data: {
                                        id: results.insertId,
                                        name: req.body.name,
                                        email: req.body.email,
                                    },
                                })
                            }
                        )
                    })
                }
            }
        )
    })
}
