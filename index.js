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

/* API responsible for checking if the username entered has been use before or not */
app.post('/checkUserName' , (req, res) => {
    fs.readFile('./data/usersData.json' , (err,data) => {
      let dataArray = JSON.parse(data);
      let userNameAvailable = true;
      for(let i = 0; i < dataArray.length; i++){
        if(dataArray[i].username === req.body.username){
          userNameAvailable = false;
          break;
        }
      }
      res.send({userNameAvailable: userNameAvailable})
    });
  });


/* API responsible for registering / signing up a new user */
app.post('/signUpUser', (req, res) => {
    let newUser = {
      username: req.body.username,
      password: crypto.createHash('sha1').update(req.body.password).digest('hex'),
      userId : makeUserId(),
      adminPrivilege: false,
      postsVotedOn : []
    }
    fs.readFile('./data/usersData.json', (err, data) => {
      let dataArray = JSON.parse(data);
      dataArray.push(newUser);
      fs.writeFile("./data/usersData.json", JSON.stringify(dataArray), function(err){
        if (err) throw err;
        console.log('The user was sucessfully registered ');
        res.send({userRegistered: true})
      });
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

app.post('/getPosts', (req, res) => {
    let postBatch;
    let lastPost;
    fs.readFile("./data/postData.json" , (err, data) => {
        let dataArray = JSON.parse(data);
        let responsePostObject = [];
        if(dataArray.length / 10 >= req.body.postBatch){
            postBatch = req.body.postBatch * 10;
            for(let i = postBatch - 9; i <= postBatch; i++){
                let optionArray = [];
                if(req.body.adminPrivilege === false){
                    for(let j = 0; j < dataArray[i].postOptions.length; j++){
                        let singleOption = {
                            optionValue : dataArray[i].postOptions[j],
                            votes : dataArray[i].postOptions[j].votes.length
                        }
                        optionArray.push(singleOption)
                    }
                }
                else{
                    for(let j = 0; j < dataArray[i].postOptions.length; j++){
                        let singleOption = {
                            optionValue : dataArray[i].postOptions[j],
                            votes : dataArray[i].postOptions[j].votes.length,
                            voters: dataArray[i].postOptions[j].votes
                        }
                        optionArray.push(singleOption)
                    }
                }
                let singlePostObject = {
                    "postId" : dataArray[i].postId,
                    "postTitle" : dataArray[i].postTitle,
                    "postDescription" : dataArray[i].postDescription,
                    "postOptions" : optionArray,
                    "timeStamp" : dataArray[i].timeStamp
                }
                responsePostObject.push(singlePostObject);
                lastPost = i
            }
        }
        else{
            postBatch = dataArray.length % 10;
            for(let i = dataArray.length - postBatch + 1; i < dataArray.length; i++){
                let optionArray = [];
                if(req.body.adminPrivilege === false){
                    for(let j = 0; j < dataArray[i].postOptions.length; j++){
                        let singleOption = {
                            optionValue : dataArray[i].postOptions[j],
                            votes : dataArray[i].postOptions[j].votes.length
                        }
                        optionArray.push(singleOption)
                    }
                }
                else{
                    for(let j = 0; j < dataArray[i].postOptions.length; j++){
                        let singleOption = {
                            optionValue : dataArray[i].postOptions[j],
                            votes : dataArray[i].postOptions[j].votes.length,
                            voters: dataArray[i].postOptions[j].votes
                        }
                        optionArray.push(singleOption)
                    }
                }
                let singlePostObject = {
                    "postId" : dataArray[i].postId,
                    "postTitle" : dataArray[i].postTitle,
                    "postDescription" : dataArray[i].postDescription,
                    "postOptions" : optionArray,
                    "timeStamp" : dataArray[i].timeStamp
                }
                responsePostObject.push(singlePostObject);
                lastPost = i
            }
        }
        if(lastPost + 1 < dataArray.length){
            res.send({responsePostObject: responsePostObject, moreNext: true  })
        }   
        else{
            res.send({responsePostObject: responsePostObject, moreNext: false })
        }
    });
});

app.post('/deletePost' ,(req,res) => {
    fs.readFile("./data/postData.json" , (err, data) =>{
        let dataArray = JSON.parse(data);
        for(let i = (req.body.batchNo * 10 - 10); i < (req.body.batchNo * 10) ; i++){
            if(req.body.postId === dataArray[i].postId){
                dataArray.splice(i,1);
                break;
            }
        }
        fs.writeFile("./data/postData.json", JSON.stringify(dataArray), function(err){
            if (err) throw err;
            console.log('The post was successfully deleted from the file ');
            res.send({postDeleted : true})
          });
    })
})

app.post('/addPost', (req, res) => {
    fs.readFile("./data/postData.json" , (err, data) => {
        let dataArray = JSON.parse(data);
        let optionArray = [];
        for(let i = 0; i < req.body.options.length; i++){
            let singleOption = {
                optionValue : req.body.options[i],
                votes : []
            }
            optionArray.push(singleOption)
            // console.log(optionArray)
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

app.post("/getUserData" , (req, res) => {
    let postsVotedOn;
    fs.readFile("./data/usersData.json" , (err, data) => {
        let dataArray = JSON.parse(data);
        for(let i = 0; i < dataArray.length; i++){
            if(dataArray[i].userId === req.body.userId){
                postsVotedOn = dataArray[i].postsVotedOn;
                break;
            }
        }
        res.send({postsVotedOn: postsVotedOn});
    })
})

app.post('/userVote', (req,res) => {
    let username;
    fs.readFile("./data/usersData.json" , (err, data) => {
        let dataArray = JSON.parse(data);
        for(let i = 0; i < dataArray.length; i++){
            if(req.body.userId === dataArray[i].userId){
                username = dataArray[i].username;
                dataArray[i].postsVotedOn.push(req.body.postId)
                break;
            }
        }
        fs.writeFile("./data/usersData.json", JSON.stringify(dataArray), function(err){
            if(err) throw err;
            fs.readFile("./data/postData.json" , (err, data) => {
                let postDataArray = JSON.parse(data);
                for(let i = (req.body.batchNo * 10 - 10); i < (req.body.batchNo * 10) ; i++){
                    if(postDataArray[i].postId === req.body.postId){
                        postDataArray[i].postOptions[req.body.optionId].votes.push(username);
                        break;
                    }
                }
                fs.writeFile("./data/postData.json" , JSON.stringify(postDataArray) , function(err){
                    if(err) throw err;
                    console.log("the vote was sucessfully recorded");
                    res.send({voteRecordStatus : true})
                });
            });
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

