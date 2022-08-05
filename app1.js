const express=require("express");
const app=express();

const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

const https=require('https');
app.use(express.static("public"));
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
 
})
app.post("/",(req,res)=>{
    
    console.log("server post get request");
    const query=req.body.cityName;
const apikey="979f2f285055e8413146268115ff20c7";
const units="metric";
const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&units="+units+"&appid="+apikey;
https.get(url,function(response){
   console.log(response.statusCode);
   response.on("data",function(data){
       const data1=JSON.parse(data);
    const icon="http://openweathermap.org/img/wn/"+data1.weather[0].icon+"@2x.png";
    
 res.write("<h1>the temperature is "+data1.main.temp+ "*celsius</h1>");
 res.write("<img src="+icon+">");
 
    res.send();
   })
});

})

app.listen(process.env.PORT||3000,(req,res)=>{
    console.log("server is start");
})
