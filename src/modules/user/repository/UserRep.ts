import { pool } from "../../../mysql";
import {hash, compare} from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import	{Request, Response} from 'express';

class UserRepository{

criar(request: Request, response: Response){
const {nome, email, senha} = request.body;

pool.getConnection((err: any, connection: any) =>{
    hash(senha, 12, (err, hash)=>{
        if (err){
            response.status(400).json(err)
        }

        connection.query(
            'INSERT INTO users (nome, email,senha) VALUES (?,?,?)',
            [nome, email, hash],
            (error: any, result: any, fileds: any)=>{
                connection.release()
                if (error){
                    response.status(500).json(error)
                }
            
                response.status(200).json({success:true})
            }
        )
    })        
})
}

logar(request: Request, response: Response){
pool.getConnection((err: any, connection: any) =>{
    const {email, senha} = request.body;

    pool.getConnection((err: any, connection: any)=>{
        connection.query(
            'SELECT * FROM users WHERE email = ?',
            [email],
            (error: any, results: any, fileds: any)=>{
                if (error){
                    response.status(400).json({error: "email não encontrado"})
                }

                compare(senha, results[0].senha, (err, result)=>{
                    if (error){
                        response.status(400).json({error: "senha incorreta"})
                    }

                    if (result){
                        const token = sign({
                            id: results[0].id_user,
                            email: results[0].email
                        }, process.env.SECRET as string, {expiresIn: "100d"})
                    
                        console.log(token)
                        response.status(200).json({token:token})
                    }
                })
            }
        )
        
    })


})
    
}

info(request: any, response:any){
    const decode: any = verify(request.headers.authorization, process.env.SECRET as string)

    if(decode.email){
        pool.getConnection((error, conn) => {
            conn.query(
                'SELECT * FROM users WHERE email=?',
                [decode.email],
                (error, result, fields) => {
                    conn.release();
                    if(error){
                        response.status(400).send({
                            error: error,
                            response: null
                        })
                    }

                    return response.status(201).send({
                        user:{
                            nome: result[0].nome,
                            email: result[0].email,
                            id: result[0].id_user
                        }
                    })
                }
            )
        })
    }
}

}

export{ UserRepository }