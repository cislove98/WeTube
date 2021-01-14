import routes from './routes';

export const localsMeddleware=(req,res,next)=>{
    res.locals.siteName="WeTube";
    res.locals.routes=routes;
    res.locals.user={
        isAuthenticated:true,
        id:1
    };
    next();
}

//middleware에 사용되는 함수를 외부적으로 만들고 local을 통해서 사용하고 싶은 것들을
// 전역적인 변수로 만들어 주어서 프로젝트에 사용하고 싶은 곳에 사용할 수 있게 해준다
// 전역 범위에 변수 추가 하는 방법이다
