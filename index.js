const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs')

const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json({limit: '10mb', extended: true}));
app.listen(port, () => console.log(`Listening on port ${port}`));

app.post('/adminLogin' , (req, res) => {
    console.log(req.body)
    let adminPrivilege = false;
    fs.readFile("./data/adminData.json" , (err, data) => {
        let dataArray = JSON.parse(data);
        for(let i = 0; i < dataArray.length; i++){
            if(dataArray[i].username === req.body.username && dataArray[i].password === req.body.password){
                adminPrivilege = true;
                break;
            }
        }
        res.send({adminPrivilege: adminPrivilege});
    });
});
