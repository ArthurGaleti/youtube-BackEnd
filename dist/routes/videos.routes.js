"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videosRoutes = void 0;
const express_1 = require("express");
const videosRep_1 = require("../modules/videos/repository/videosRep");
const login_1 = require("../middleware/login");
const videosRoutes = (0, express_1.Router)();
exports.videosRoutes = videosRoutes;
const videosRepository = new videosRep_1.VideosRepository();
videosRoutes.post('/postar', login_1.login, (request, response) => {
    videosRepository.postar(request, response);
});
videosRoutes.get('/title-search', (request, response) => {
    videosRepository.procurarTitulo(request, response);
});
videosRoutes.get('/user-search/:id_user', (request, response) => {
    videosRepository.procurarUser(request, response);
});
