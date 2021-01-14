import express from "express";
import routes from "../routes";
import {home,search} from "../controllers/videoControllers";
import {getLogin,postLogin,logout,getJoin,postJoin} from "../controllers/userControllers";


const globalRouter =express.Router();



globalRouter.post(routes.join,postJoin);
globalRouter.get(routes.join,getJoin);


globalRouter.post(routes.login,postLogin);
globalRouter.get(routes.login,getLogin);


globalRouter.get(routes.home,home);
globalRouter.get(routes.logout,logout);
globalRouter.get(routes.search,search);



export default globalRouter;