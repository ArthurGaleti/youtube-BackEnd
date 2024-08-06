"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const mysql_1 = require("../../../mysql");
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
class UserRepository {
    criar(request, response) {
        const { nome, email, senha } = request.body;
        mysql_1.pool.getConnection((err, connection) => {
            (0, bcrypt_1.hash)(senha, 12, (err, hash) => {
                if (err) {
                    response.status(400).json(err);
                }
                connection.query('INSERT INTO users (nome, email,senha) VALUES (?,?,?)', [nome, email, hash], (error, result, fileds) => {
                    connection.release();
                    if (error) {
                        response.status(500).json(error);
                    }
                    response.status(200).json({ success: true });
                });
            });
        });
    }
    logar(request, response) {
        mysql_1.pool.getConnection((err, connection) => {
            const { email, senha } = request.body;
            mysql_1.pool.getConnection((err, connection) => {
                connection.query('SELECT * FROM users WHERE email = ?', [email], (error, results, fileds) => {
                    if (error) {
                        response.status(400).json({ error: "email não encontrado" });
                    }
                    (0, bcrypt_1.compare)(senha, results[0].senha, (err, result) => {
                        if (error) {
                            response.status(400).json({ error: "senha incorreta" });
                        }
                        if (result) {
                            const token = (0, jsonwebtoken_1.sign)({
                                id: results[0].id_user,
                                email: results[0].email
                            }, process.env.SECRET, { expiresIn: "100d" });
                            console.log(token);
                            response.status(200).json({ token: token });
                        }
                    });
                });
            });
        });
    }
}
exports.UserRepository = UserRepository;
