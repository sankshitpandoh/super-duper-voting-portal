const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs')
const crypto = require('crypto');

const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json({limit: '10mb', extended: true}));
app.listen(port, () => console.log(`Listening on port ${port}`));

/* api responsible for logging in the user  */
app.post('/logInUser' , (req, res) => {
    let userExist = false;
    let adminPrivilege = false;
    let userId;
    fs.readFile("./data/usersData.json" , (err, data) => {
        let dataArray = JSON.parse(data);
        let hashPwd = crypto.createHash('sha1').update(req.body.password).digest('hex');
        for(let i = 0; i < dataArray.length; i++){
            if(dataArray[i].username === req.body.username && dataArray[i].password === hashPwd){
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
                break;
            }
        }
        res.send({adminPrivilege: adminPrivilege})
    });
});

app.post('/addPost', (req, res) => {
    fs.readFile("./data/postData.json" , (err, data) => {
        let dataArray = JSON.parse(data);
        let optionArray = [];
        for(let i = 0; i < req.body.options; i++){
            let singleOption = {
                optionValue : req.body.options[i],
                votes : []
            }
            optionArray.push(singleOption)
        }
        let newPostObject = {
            postId : makePostId(),
            postTitle : req.body.title,
            postDescription : req.body.description,
            postOptions : optionArray,
            timeStamp : new Date
        };
        dataArray.push(newPostObject);
        fs.writeFile("./data/postData.json", JSON.stringify(dataArray), function(err){
            if (err) throw err;
            console.log('The post was successfully added to the data file ');
            res.send({postAdded : true})
          });
    });
});

/* Generates unique id for a new Post */
function makePostId(){
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for(let i = 0; i < 6; i++){
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

/* Generates unique id for a new user */
function makeUserId(){
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for(let i = 0; i < 12; i++){
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

