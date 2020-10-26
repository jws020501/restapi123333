 const express = require("express")
 const request = require("request")
 const app = express()
 const bodyParser = require("body-parser");

app.set('view engine','ejs');
app.use(express.static(__dirname + '/views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

 app.get("/",(req,res)=>{
     res.render("index.ejs")
 })
 app.get("/get",(req,res)=>{
    res.render("get.ejs",{
        message:null
    })
})
app.get("/post",(req,res)=>{
    res.render("post.ejs",{
        message:null
    })
})
app.get("/delete",(req,res)=>{
    res.render("delete.ejs",{
        message:null
    })
})

app.post("/get",(req,res)=>{
    var apikey = null
    var opt = null

    var api = req.body.apilink;
    var apikey = req.body.apikey

    opt = {
        method:'get',
        uri:api,
        headers: {
            apikey: apikey
          },
    }
    request(opt,(err,response,body)=>{
        if(err){
            res.render("get.ejs",{
                message:"에러"
            })
        }else if(body){
            var result = JSON.stringify(JSON.parse(body));
            console.log(result)
            res.render("get.ejs",{
                message:result
            })
        }
    })
})
app.post("/post",(req,res)=>{
    var apikey = null
    var opt = null
    var opt2 = null
    
    var api = req.body.apilink;
    var apikey = req.body.apikey
    var query_name = req.body.query_name;
    var query_value = req.body.query_value;

    console.log(query_name)
    opt = {
        method:'post',
        uri:api,
        form:{ [query_name] : query_value },
        json:true,
        headers: {
            apikey: apikey
          },
    }
    request.post(opt,(err,response,body)=>{
        console.log(body)
    })

    opt2 = {
        method:'get',
        uri:api,
        headers: {
            apikey: apikey
          },
    }
    request(opt2,(err,response,body)=>{
        if(err){
            res.render("get.ejs",{
                message:"에러"
            })
        }else if(body){
            var result = JSON.stringify(JSON.parse(body));
            console.log(result)
            res.render("get.ejs",{
                message:result
            })
        }
    })

})
app.post("/delete",(req,res)=>{
    var apikey = null
    var opt = null
    var opt2 = null
    var api = req.body.apilink;
    var query_id = new Number;
    query_id = req.body.query_id;

   opt = {
        method:'delete',
        uri:api+"/"+query_id,
        headers: {
            apikey: apikey
          },
        // form:{ id : query_id },
        // json:true
    }
    request.delete(opt,(err,response,body)=>{
        console.log(body)
    })

    opt2 = {
        method:'get',
        uri:api,
        headers: {
            apikey: apikey
          }
    }
    request(opt2,(err,response,body)=>{
        if(err){
            res.render("get.ejs",{
                message:"에러"
            })
        }else if(body){
            var result = JSON.stringify(JSON.parse(body));
            console.log(result)
            res.render("get.ejs",{
                message:result
            })
        }
    })

})


var port = 3000
app.listen(port,function(){
    console.log("서버열림")
})