import {videos} from "../db";
import routes from "../routes"


export const home=(req,res)=> {
    res.render("home",{pageTitle:"Home", videos}); 
};

export const search=(req,res)=>{
    // const searchBy=req.query.term;
    const {query:{term:searchingBy}}=req;
    res.render("search",{pageTitle:"Search", searchingBy, videos});
};

// export const videos=(req,res)=>res.render("videos",{pageTitle:"Videos"});

export const getUpload=(req,res)=>{
    res.render("upload",{pageTitle:"Upload"});
};

export const postUpload=(req,res)=>{
    console.log(req.body);
    const{
        body:{
            file,
            title,
            description
        }
    }=req;
    //to do : upload video and save it
    res.redirect(routes.videoDetail(11111))
};

export const videoDetail=(req,res)=>res.render("videoDetail",{pageTitle:"Video-Detail"});

export const editVideo=(req,res)=>res.render("editVideo",{pageTitle:"Edit-Video"});

export const deleteVideo=(req,res)=>res.remner("deleteVideo",{pageTitle:"Delete-Video"});

// render(    ,    )
/*
render 메서드는 처음 인자는 template이고 두번째는 template에 추가할 정보가 담긴 객체이다
따라서 render를 통해 template에 정보를 주고자 할 때 뒤에 정보가 담긴 객체를 추가해서 넘겨주면 된다
*/