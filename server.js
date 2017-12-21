const express = require('express');
const morgan = require('morgan');
const bodyparser = require('body-parser')
const accountSid = 'AC659a388bd3cf4917e7bfce29c98bf534';
const authToken = '4f6c2a0bbf0c02287444c021772267f9';

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

app.get('/contact', (req, res) => {
    res.render('contact');
  });
  
 app.post('/thanks', (req, res) => {    
    client.messages.create({
        to: '+18587752036',
        from:'+16193542930 ',
        body: req.body.email

    }).then((message) => console.log(message.sid));
    res.render('thanks', { contact: req.body })
    
  });
  


app.listen(8080, () =>{
    console.log('listening at http://localhost.8080')
})