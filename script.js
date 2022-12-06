const { urlencoded } = require('express');
const express = require('express');
const exphbs  = require('express-handlebars');
const final = require('./final');
const path = require('path')

const app = express();
const port = process.env.PORT || 8080;

app.use(express.urlencoded({extended: true}));

app.engine('.hbs', exphbs.engine({ extname: '.hbs' }));
app.set('views', path.join(__dirname, '/finalViews'))
app.set('view engine', '.hbs');
app.engine('.hbs', exphbs.engine({ 
    extname: '.hbs'
}));

app.get('/', (req, res) => {
    res.render('home')
});

app.get('/register', (req, res) => {
    res.render('register');
})

app.post('/register', (req, res) => {
    final.register(req.body)
    .then(user => {
        res.render('register', {email: user.email});
    })
    .catch(err => {
        res.send(err);
    });
});

app.get('/signIn', (req, res) => {
    res.render('signIn')
})

app.post('/signIn', (req, res) => {
    final.signIn(req.body)
    .then(user => {
        res.render('signIn', {email: user.email});
    })
    .catch(err => {
        res.send(err);
    });
});

app.use((req, res) => res.status(404).send('Error 404: page not found.'));

final.startDB()
.then(() => {
    app.listen(port, () => {
        console.log(`server is currently listening on ${port}`);
    })
})
.catch(err => {
    console.log(err);
})