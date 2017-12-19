const express = require('express');
const morgan = require('morgan');
const bodyparser = require('body-parser')

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
    res.render('thanks', { contact: req.body })
  });
  

app.listen(8080, () =>{
    console.log('listening at http://localhost.8080')
})