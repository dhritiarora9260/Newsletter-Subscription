const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { options } = require("request");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var emailAddress = req.body.emailAddress;

    var data={
        members:[
            {
                email_address:emailAddress,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastName
                }
            }
        ]
    };
    const jsonString = JSON.stringify(data);

    const url="https://us14.api.mailchimp.com/3.0/lists/abbe2b3cc5";
    const options={
        method:"POST",
        auth:"Dhriti1:657415071249a1afc75d9b15317597d9-us14"
    }
    const request=https.request(url,options,function(response){
        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        }else{
            res.sendFile(__dirname+"/failure.html");
        }
    
        response.on("data",function(data){
        console.log(JSON.parse(data));
            
        })
    })

    request.write(jsonString);
    request.end();

    

   


    

});

app.post("/failure.html",function(req,res){
    res.redirect("/");
});

app.listen(process.env.PORT|| 3000,function(){
    console.log("The server is running on port 3000");
})

//api key
// 657415071249a1afc75d9b15317597d9-us14
//657415071249a1afc75d9b15317597d9-us14
//audience id
//abbe2b3cc5