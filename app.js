import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import bodyParser  from "body-parser";
import cookieParser from "cookie-parser";
//import {userRouter} from "./routers/userRouter";       //default로 export 하지 않았기 때문에 {userRouter}로 import 해아한다.
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import routes from "./routes";
import {localsMeddleware} from "./middlewares";
const app = express();
//const PORT=4000;

//const handleListening = () => console.log(`Listening on : http://localhost:${PORT}`);

/*
function betweenHome(req,res,next){
    console.log("I'm between");
    //res.send("I'm between");
    //middleware에 res.send를 사용하게 되면 연결을 끊을 수 있다.
    next();
}
*/

/*
function md1(req,res,next){
    console.log("1");y
    next();
}

function md2(req,res,next){
    console.log("2");
    next();
}
function md3(req,res,next){
    console.log("3");
    next();
}
function md4(req,res,next){
    console.log("4");
    next();
}
function md5(req,res,next){
    console.log("5");
    next();
}
*/

//const handleHome = (req, res) => res.send("hello from home");

//const handleProfile = (req, res) => res.send("you ar on my profile");

// app.use(function(req,res,next){
//     res.setHeader("content_security_policy", "default-src 'self' style-src 'self' 'unsafe-inline'");
//     return next();
// });
app.use(function(req, res, next) {
    res.setHeader("Content-Security-Policy", "style-src 'unsafe-inline'", "img-src 'unsafe-inline'", "script-src 'none' https://archive.org");
    return next();
});
// app.use( helmet({ contentSecurityPolicy: false }));     //helmet의 보안정책으로 인해 contentSecurityPolicy: false 추가
// app.use(                //fontawsome을 사용하기 위해 helmet의 default설정을 변경
//     helmet.contentSecurityPolicy({
//         directives: {
//             defaultSrc: ["'self'", "http://*.fontawesome.com"],
//             scriptSrc: ["'self'", "http://*.fontawesome.com"],
//             styleSrc: ["'self'", "'unsafe-inline'"],
//             upgradeInsecureRequests: [],
//         },
//     })
// );
app.set("view engine","pug");
app.use(cookieParser());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}));          //bodyParser는 설정을 통해 user가 보내온 data가 무엇인지 이해하는 방법이다
app.use(morgan("dev"));
//app.use([md1,md2,md3,md4,md5]);
//app.use는 원하는 middleware를 모든 route에 사용할 수 있다


app.use(localsMeddleware);
/*
localMiddleware라는 함수를 따로 만들어서 local변수를 통해 global 변수로 만들어 준다.
이를 통해서 우리는 template에서 routes변수를 사용해서 url을 조작할 수 있게 한다
그래서 template에서는 url을 직접 작성하는 것이 아니라 routes.js에 있는 변수로서 url을 조작하게 만들어 준다
*/



//app.get("/",betweenHome,handleHome);
//app.get("/",handleHome);
//app.get("/profile",handleProfile);
app.use(routes.home,globalRouter)
app.use(routes.users,userRouter);  //"/user"로 접속하면 app.use는 userRouter전체를 사용한다는 의미이다.
app.use(routes.videos,videoRouter);
//app.listen(4000,handleListening);

export default app;     //다른 파일에서도 사용할 수 있게 하는 js module방식(es6)
/*
import express from "express";
const app = express();

app.listen(4000,handleListening);
------------------------------------
express를 실행시켜 app으로 받아서 4000번 포트로 서버를 생성한다.
이때 root로 설정한 것이 없음으로 cannot get / 을 return 받게 되고
계속 해서 실행되는 상태이다

call back을 설정해 주어서 app이 4000번 port로 listen될때
call back 함수인 handleListening이 실행된다.
*/



/*
HTTP protocol에서 서버에 무엇을 전달하고자 할 때 GET과 POST 두가지 방식을 보통 사용하게 된다
이때 HTTP패킷을 사용하게 되는데 패킷의 구조는 크게 HEADER 와 BODY로 나누어진다.
HEADER는 여러가지 정보와 어떤 방식의 메소드를 사용했는지 기록되고,
BODY는 사용되는 메소드의 방식에 따라 사용 유무가 결정된다.

GET은 URL에 Parameter를 붙어서 정보를 전송하는 방식이다
따라서 HTTP패킷의 BODY를 사용하지 않게 된다. 하지만 대용량의 데이터 전송은 불가능 하다.
또한 SELECT 적인 측면 즉 idempotent(멱등성)을 가진 방식이다.
이는 서버에 동일한 요청을 여러번 전송하더라도 결과 값이 바뀌지 않는다는 특성을 가진다.
따라서 개발을 할 때 데이터가 변경되지 않는 즉 서버의 값이나 상태를 바꾸지 않는 것을 개발하는데 사용된다.
예를 들어 개시판의 글보기 기능등에 사용된다.
또한 GET은 Link의 문제를 수행 할 때도 사용된다. 누군가에서 URL을 복사해서 줄 수 있어야 하는데
POST방식은 내부적으로 값이 전달되기 때문에 URL만 전달할 수 없다. 따라서 URL을 제공하고자 할 때
GET방식을 사용한다.

POST는 HTTP message의 BODY에 담아서 정보를 전송하는 방식이다.
HTTP message에는 길이 제한이 없음으로 대용량의 데이터를 전송할 수 있다.
또한 POST로 요청을 보낼때에는 Content-Type에 요청 데이터의 타입을 표시해야한다.
(내 생각으로는 bodyParser가 이 역할을 하는것으로 예상)
그리고 POST는 Non-Idempotent하게 설정된 방식이다.
이는 서버에 동일한 요청을 보낼때 반환되는 서버의 값이나 상태가 항상 다를 수 있는 특성을 가진다
따라서 개발을 할 때 서버의 상태나 데이터를 변경시킬때 사용된다.

마지막으로 GET방식이 POST방식보다 빠르다고 하는데 이것을 GET은 캐싱이 가능하고 POST는 불가능 하기 때문이다
캐싱으로 인해 한 번 접근했던 정보에 대해 다시 접근할 때 빠르게 가져올 수 있기 때문에 POST방식 보다 빠르다고 하는 것이다.
*/

/*
express에서는 middleware가 존재한다.
본문에서는 req(요청)객체,res(응답)객체 도중 그 다음의 미들웨어 함수에 대한 엑세스 권한을 갖는 함수라고 설명한다.
이는 간단하게 말하자면 client에게 req가 오고 그 req를 보내기 위해 res하려는 중간(middle)에 목적에 맞게 처리를 하는,
거처가는 함수들이라고 생각하면 된다. 모든 함수는 middleware가 될 수 있다.

app.get("/",md1,handleHome);
위의 code는 가장 간단한 구조이다.
md1은 client의 "/"요청과 handleHome 사이에서 존재하게 된다.
이때 우리는 웹 브라우저로 부터 req한 것을 계속해서 처리할것인지 권한을 주지 않게 되면
md1함수가 실행되고 웹브라우저는 계속해서 대기하게 된다.
따라서 md1에서 handleHome으로의 처리 권한을 임명해 주어야 하는데 그 key가 next()인것이다.
이를 통해 client로 부터 "/"을 받고 md1을 실행하고 next로 다음 함수인 handleHome을 불러줌으로서
app.get("/"md1,handleHome)이 온전히 실행되는 것이다. 

그리고 middleware는 4가지 특성을 가지는데 
1.모든 코드를 실행
2.다음 middleware 호출(순차적으로)
3.res, req객체 변경 가능
4.요청-응답 주기 종료

이렇게 4가지 특성을 가진다.
*/

/*
주요 Middleware
Morgan : 로그를 남겨줌
helmet : 기초보안담당함
body-parser :  post 방식으로 form 내부에 포함되어서 전달될때 
                서버에서 request객체에 접근하기 위해 사용된다
cookie-parser : 쿠키를 다룰 수 있음
*/


/*
MVC Pattern -> 일종의 구조

Model : data
View : how does the data look 데이터가 어떻게 생겼는지 
Controller : function that looks for the date 데이터를 보여주는 함수
*/