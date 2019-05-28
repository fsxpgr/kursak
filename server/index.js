const express = require('express');
var bodyParser = require('body-parser');
const app = express();
const port = 3000;
const AWS = require("aws-sdk");
const fs = require('fs');

app.use(bodyParser())
AWS.config.update({
    accessKeyId: 'AKIASD3Y3WFXG3A5JMFH',
    secretAccessKey: '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',
    region: 'eu-west-1'
});

const ses = new AWS.SES({apiVersion: "2010-12-01"});

const checkPass = async (email, pass) => {
    let passFromFile = await fs.readFileSync(`login/${email}.txt`, "utf8")
    return pass === passFromFile
}
app.get('/send-email/:email', async (req, res) => {
    console.log('/send-email');
    let toAddr = req.params.email;
    let generatedPass = Math.floor(100000 + Math.random() * 900000)
    const params = {
        Destination: {
            ToAddresses: [toAddr] // Email address/addresses that you want to send your email
        },
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: `<html><body><h4>Login code to Inotes: </h4><h1>${generatedPass}</h1></body></html>`
                },
            },
            Subject: {
                Charset: "UTF-8",
                Data: "[Inotes] Login code"
            }
        },
        Source: "fsxpgr@gmail.com"
    };
    try {
        const emailResult = await ses.sendEmail(params).promise();
        console.log("email submitted to SES", emailResult);
        await fs.writeFileSync(`login/${toAddr}.txt`, generatedPass);
        res.send("email sent");
    } catch (e) {
        console.log(e);
        res.status(400).send({message: e.message})
    }
})

app.get('/login/:email/:password', async (req, res) => {
    const {email, password} = req.params;
    try {
        await checkPass(email, password) ? res.send({message: password}) : res.status(400).send({message: 'Incorrect password'})
    } catch (e) {
        console.log(e);
        res.status(400).send({message: e.message})
    }
});

app.get('/notes/:email', async (req, res) => {
    const {email} = req.params;
    console.log(email)
    try {
        if (fs.existsSync(`notes/${email}.json`)) {
            //file exists
            let data = await fs.readFileSync(`notes/${email}.json`, 'utf-8');
            console.log(data)
            res.send({data: JSON.parse(data)});
        } else {
            await fs.writeFileSync(`notes/${email}.json`, '[]');
            res.send({data: []});
        }
    } catch (e) {
        console.log(e);
        res.status(400).send({message: e.message})
    }
});

app.post('/notes', async (req, res) => {
    const {email, notes} = req.body;
    try {
        await fs.writeFileSync(`notes/${email}.json`, JSON.stringify(notes));
        res.send({data: notes});
    } catch (e) {
        console.log(e);
        res.status(400).send({message: e.message})
    }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))