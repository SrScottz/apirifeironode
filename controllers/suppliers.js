var mysql = require('../mysql').pool

exports.insertSupplier = (req, res, next) => {
    mysql.getConnection(function (error, conn) {
        if (error) {
            return res.status(500).send({ error: error })
        }
        conn.query(
            'INSERT INTO suppliers (name) VALUES (?)',
            [req.body.name],
            (error, result, field) => {
                conn.release()
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null,
                    })
                }
                res.status(201).send({
                    message: 'Fornecedor cadastrado com sucesso!',
                    data: {
                        id: result.insertId,
                        ...req.body
                    },
                })
            }
        )
    })
}
exports.getSupplier = (req, res, next) => {
    let id = req.params.id_check
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({ error: error })
        }
        conn.query(
            `SELECT * FROM suppliers WHERE id = ${id}`,
            (error, result, fields) => {
                if (error) {
                    return res.status(500).send({ error: error })
                }
                if (result.length == 0) {
                    return res.status(404).send({
                        message: 'Fornecedor não encontrado',
                    })
                }
                return res.status(200).send(...result)
            }
        )
    })
}
exports.getSuppliers = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({ error: error })
        }
        conn.query('SELECT * FROM suppliers', (error, result, fields) => {
            if (error) {
                return res.status(500).send({ error: error })
            }
            return res.status(200).send(result)
        })
    })
}
exports.updateSupplier = (req, res, next) => {
    let id = req.params.id_check
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({ error: error })
        }
        conn.query(
            `UPDATE suppliers SET name = ? WHERE id = ${id}`,
            [req.body.name],
            (error, result, fields) => {
                if (error) {
                    return res.status(500).send({ error: error })
                }
                return res
                    .status(202)
                    .send({ message: 'Fornecedor atualizado com sucesso' })
            }
        )
    })
}
exports.deleteSupplier = (req, res, next) => {
    let id = req.params.id_check
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({ error: error })
        }
        conn.query(
            `DELETE FROM suppliers WHERE id = ${id}`,
            (error, result, fields) => {
                if (error) {
                    return res.status(500).send({ error: error })
                }
                return res
                    .status(202)
                    .send({ message: 'Fornecedor removido com sucesso' })
            }
        )
    })
}
