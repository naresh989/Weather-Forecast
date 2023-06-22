const express = require('express')
const https = require('https')
const bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.urlencoded({extended:true}))

app.get('/', (req,res)=>{
    res.sendFile(__dirname+"/index.html");
})

app.post("/",(req,res)=>{
    const query =req.body.city
    const apiid ="d7383c57b16bdfa21465099ba0a09472"
    const unit ="metric"
    url1 = "https://api.openweathermap.org/data/2.5/weather?appid="+apiid+"&q="+query+ "&units="+ unit
    https.get(url1, function(response){
        console.log(response);
        response.on('data', (data)=>{
            const w = JSON.parse(data)
            const temp = w.main.temp;
            const desc =w.weather[0].description;
            const icon = w.weather[0].icon;
            const imgurl = "https://openweathermap.org/img/wn/"+ icon +"@2x.png"
            res.write("<h1>the weather in "+ query +" is " + temp + " degrees celcius </h1>" )
            res.write("<p>the weather is " + desc+'</p>')
            res.write("<img src=" + imgurl + ">")
            res.send()
        })
    } )
})

app.listen(3000, ()=>{console.log("server is on port 3000")})


