import { Router } from "express";
import { UserRepository } from "../modules/user/repository/UserRep";
import { login } from "../middleware/login";

const userRoutes = Router();
const userRepository = new UserRepository();

userRoutes.post('/cadastro', (request, response)=> {
    userRepository.criar(request, response)
})

userRoutes.post('/login', (request, response)=>{
    userRepository.logar(request, response)
})

userRoutes.get('/get-user', login, (request, response)=>{
    userRepository.info(request, response)
})




export { userRoutes }