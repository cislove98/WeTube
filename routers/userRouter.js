import express from "express";
import routes from "../routes";
import {users,userDetail,editProfile,changePassword} from "../controllers/userControllers";
const userRouter= express.Router();


userRouter.get(routes.users,users);
userRouter.get(routes.editProfile,editProfile);
//edit-profile URL실행시에 users/:id/edit-profile로 실행되는 경우 발생 따라서 editProfile을
//userDetail보다 위로 두어서 먼저 실행되게 끔 설정함으로 해당경우 해결
userRouter.get(routes.changePassword,changePassword);
userRouter.get(routes.userDetail(),userDetail);





export default userRouter;

/*
userRouter.get("/",(req, res)=>res.send("user index"));
userRouter.get("/edit",(req, res)=>res.send("user edit"));
userRouter.get("/password",(req, res)=>res.send("user password"));
//위와 같은 방식이 익명 메서드 방식
*/
