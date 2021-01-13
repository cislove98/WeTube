import express from "express";
import routes from "../routes";
import {users,userDetail,editProfile,changePassword} from "../controllers/userControllers";
const userRouter= express.Router();


userRouter.get(routes.users,users);
userRouter.get(routes.userDetail,userDetail);
userRouter.get(routes.editProfile,editProfile);
userRouter.get(routes.changePassword,changePassword);





export default userRouter;

/*
userRouter.get("/",(req, res)=>res.send("user index"));
userRouter.get("/edit",(req, res)=>res.send("user edit"));
userRouter.get("/password",(req, res)=>res.send("user password"));
//위와 같은 방식이 익명 메서드 방식
*/
