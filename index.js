const express = require("express");

const app = express();

const users = [{
    name: "John",
    kidneys: [{
        healthy: false
    }]
}]

app.use(express.json());

app.get("/",function(req,res) {
    const johnkidneys = users[0].kidneys;
    const numberofkidneys = johnkidneys.length;
    let numberofhealthykidney = 0;
    for(let i = 0 ; i < johnkidneys.length ; i++){
        if(johnkidneys[i].healthy){
            numberofhealthykidney += 1;
        }
    }
    const numberofunhealthykidneys = numberofkidneys - numberofhealthykidney;
    res.json({
        numberofkidneys,numberofhealthykidney,numberofunhealthykidneys
    })
})

app.post("/",function(req,res){
    const ishealthy = req.body.ishealthy;
    users[0].kidneys.push({
        healthy: ishealthy
    })
    res.json({
        msg: "Done!"
    })
})
// 411
app.put("/" , function(req,res) {
    for(let i = 0 ; i < users[0].kidneys.length ; i++){
        users[0].kidneys[i].healthy = true;
    }
    res.json({});
})

app.delete("/" , function(req,res) {
    let atleastOneUnheathyKidney = false;
    for(let i = 0 ; i < users[0].kidneys.length; i++){
        if(!users[0].kidneys[i].healthy){
            atleastOneUnheathyKidney = true;
        }
    }
    if(atleastOneUnheathyKidney){
        const newkidneys = [];
        for(let i = 0 ; i < users[0].kidneys.length; i++){
            if(users[0].kidneys[i].healthy){
                newkidneys.push({
                    healthy: true
                })
            }
        }
        users[0].kidneys = newkidneys;
        res.json({msg: "done"})
    }
    else{
        res.sendStatus(411).json({
            msg: "You have no bad kidneys"
        });
    }
})

app.listen(3000);