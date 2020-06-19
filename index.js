const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs')

const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json({limit: '10mb', extended: true}));
app.listen(port, () => console.log(`Listening on port ${port}`));

/* api responsible for logging in the admin  */
app.post('/logInUser' , (req, res) => {
    console.log(req.body)
    let userExist = false;
    let adminPrivilege = false;
    let userId;
    fs.readFile("./data/usersData.json" , (err, data) => {
        let dataArray = JSON.parse(data);
        for(let i = 0; i < dataArray.length; i++){
            if(dataArray[i].username === req.body.username && dataArray[i].password === req.body.password){
                userExist = true;
                adminPrivilege = dataArray[i].adminPrivilege;
                userId = dataArray[i].userId;
                break;
            }
        }
        res.send({adminPrivilege: adminPrivilege, userExist : userExist, userId: userId });
    });
});

app.post('/getUserDetails', (req, res) => {
    let adminPrivilege;
    fs.readFile("./data/usersData.json" , (err, data) => {
        let dataArray = JSON.parse(data);
        for(let i = 0; i < dataArray.length; i++){
            if(dataArray[i].userId === req.body.userId){
                adminPrivilege = dataArray[i].adminPrivilege;
                console.log(adminPrivilege)
                break;
            }
        }
        res.send({adminPrivilege: adminPrivilege})
    })
})
