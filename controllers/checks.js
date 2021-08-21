var mysql = require('../mysql').pool

exports.insertCheck = (req, res, next) => {
    mysql.getConnection(function (error, conn) {
        if (error) {
            return res.status(500).send({ error: error })
        }
        conn.query(
            'INSERT INTO checks (code, value, supplier_id, due_date, launch_date, created_by) VALUES (?,?,?,?,?,?)',
            [
                req.body.code,
                req.body.value,
                req.body.supplier_id,
                req.body.due_date,
                req.body.launch_date,
                req.body.created_by,
            ],
            (error, result, field) => {
                conn.release()
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null,
                    })
                }
                res.status(201).send({
                    message: 'Cheque cadastrado com sucesso!',
                    data: req.body,
                })
            }
        )
    })
}
exports.getCheck = (req, res, next) => {
    let id = req.params.id_check
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({ error: error })
        }
        conn.query(
            `SELECT * FROM checks WHERE id = ${id}`,
            (error, result, fields) => {
                if (error) {
                    return res.status(500).send({ error: error })
                }
                if (result.length == 0) {
                    return res.status(404).send({
                        message: 'Cheque não encontrado',
                    })
                }
                return res.status(200).send(...result)
            }
        )
    })
}
exports.getChecks = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({ error: error })
        }
        conn.query('SELECT * FROM checks', (error, result, fields) => {
            if (error) {
                return res.status(500).send({ error: error })
            }
            return res.status(200).send(result)
        })
    })
}
exports.updateCheck = (req, res, next) => {
    let id = req.params.id_check
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({ error: error })
        }
        conn.query(
            `UPDATE checks SET value = ? WHERE id = ${id}`,
            [req.body.value],
            (error, result, fields) => {
                if (error) {
                    return res.status(500).send({ error: error })
                }
                return res
                    .status(202)
                    .send({ message: 'Produto atualizado com sucesso' })
            }
        )
    })
}
exports.deleteCheck = (req, res, next) => {
    let id = req.params.id_check
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({ error: error })
        }
        conn.query(
            `DELETE FROM checks WHERE id = ${id}`,
            (error, result, fields) => {
                if (error) {
                    return res.status(500).send({ error: error })
                }
                return res
                    .status(202)
                    .send({ message: 'Produto removido com sucesso' })
            }
        )
    })
}
