import { pool } from "../../../mysql";
import {hash, compare} from 'bcrypt';
import	{Request, Response, query} from 'express';

class VideosRepository{

postar(request: Request, response: Response){
    const {usuario, titulo, comentario} = request.body;

    pool.getConnection((err: any, connection: any) =>{
        connection.query(
            'INSERT INTO videos (id_user,titulo,descricao) VALUES (?,?,?)',
            [usuario, titulo, comentario],
            (error: any, result: any, fileds: any)=>{
                connection.release()
                if (error){
                    response.status(400).json(error)
                }
                response.status(200).json({success:true})  
            }
        )
        
    })
}

procurarTitulo(request: Request, response: Response){
    const { titulo } = request.body

    pool.getConnection((err: any, connection: any)=>{
        connection.query(
            'SELECT  * FROM videos WHERE titulo LIKE ?',
            [`%${titulo}%`],
            (error: any, result: any, fields: any)=>{

                if(error){
                    return response.status(400).json({error: "Video não encontrado"})
                }

                return response.status(200).json({message: "Aqui os resultados", videos: result})
                
            }

        )
    })
}

procurarUser(request: Request, response: Response){
    const { id_user } = request.params

    pool.getConnection((err: any, connection: any)=>{
        connection.query(
            'SELECT  * FROM videos WHERE id_user = ?',
            [id_user],
            (error: any, result: any, fields: any)=>{

                if(error){
                    return response.status(400).json({error: "Video não encontrado"})
                }

                return response.status(200).json({message: "Aqui os resultados", videos: result})
                
            }

        )
    })
}


}

export{ VideosRepository }