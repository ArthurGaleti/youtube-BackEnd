import { Router } from "express";
import { VideosRepository } from "../modules/videos/repository/videosRep";
import { login } from "../middleware/login";

const videosRoutes = Router();
const videosRepository = new VideosRepository();

videosRoutes.post('/postar', login, (request, response)=> {
    videosRepository.postar(request, response)
})

videosRoutes.get('/title-search', (request, response)=>{
    videosRepository.procurarTitulo(request, response)
})

videosRoutes.get('/user-search/:id_user', (request, response)=>{
    videosRepository.procurarUser(request, response)
})




export { videosRoutes }