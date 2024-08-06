"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const UserRep_1 = require("../modules/user/repository/UserRep");
const userRoutes = (0, express_1.Router)();
exports.userRoutes = userRoutes;
const userRepository = new UserRep_1.UserRepository();
userRoutes.post('/cadastro', (request, response) => {
    userRepository.criar(request, response);
});
userRoutes.post('/login', (request, response) => {
    userRepository.logar(request, response);
});
