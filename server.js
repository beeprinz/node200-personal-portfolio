const express = require('express');
const morgan = require('morgan');
const bodyparser = require('body-parser')
const env = require('dotenv').config();
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;


const client = require('twilio')(accountSid, authToken);

const app = express ();

app.use(morgan('dev'))
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))
app.use(express.static('public'));

app.set('views', './views');

app.set('view engine', 'ejs');

app.get('/', (req,res) =>{
    const data = {
        person: {
            firstName: 'Brendan',
            lastName: 'Prinz',
        }
    }
    res.render('index', data);
});

app.get('/portfolio', (req, res) => {
    res.render('portfolio');
  });
  
 app.post('/thanks', (req, res) => { 
     console.log(accountSid,authToken);   
    client.messages.create({
        to: '+18587752036',
        from:'+16193542930 ',
        body: req.body.email

    }).then((message) => console.log(message.sid));
    res.render('thanks', { contact: req.body })
    
  });
  


app.listen(process.env.PORT || 4000, () =>{
    console.log('listening at http://localhost.4000')
})