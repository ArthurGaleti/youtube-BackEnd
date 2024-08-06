"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideosRepository = void 0;
const mysql_1 = require("../../../mysql");
class VideosRepository {
    postar(request, response) {
        const { usuario, titulo, comentario } = request.body;
        mysql_1.pool.getConnection((err, connection) => {
            connection.query('INSERT INTO videos (id_user,titulo,descricao) VALUES (?,?,?)', [usuario, titulo, comentario], (error, result, fileds) => {
                connection.release();
                if (error) {
                    response.status(400).json(error);
                }
                response.status(200).json({ success: true });
            });
        });
    }
    procurarTitulo(request, response) {
        const { titulo } = request.body;
        mysql_1.pool.getConnection((err, connection) => {
            connection.query('SELECT  * FROM videos WHERE titulo LIKE ?', [`%${titulo}%`], (error, result, fields) => {
                if (error) {
                    return response.status(400).json({ error: "Video não encontrado" });
                }
                return response.status(200).json({ message: "Aqui os resultados", videos: result });
            });
        });
    }
    procurarUser(request, response) {
        const { id_user } = request.params;
        mysql_1.pool.getConnection((err, connection) => {
            connection.query('SELECT  * FROM videos WHERE id_user = ?', [id_user], (error, result, fields) => {
                if (error) {
                    return response.status(400).json({ error: "Video não encontrado" });
                }
                return response.status(200).json({ message: "Aqui os resultados", videos: result });
            });
        });
    }
}
exports.VideosRepository = VideosRepository;
