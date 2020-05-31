const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');

//initialize
const app = express();

//settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'))//handlebars
app.engine('.hbs', exphbs({//express-handlebars
    defaultLayout:'main',
    layoutsDir:path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs')//express-andlebars

//middlewares
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use(express.urlencoded({extended: false}));//fazt solo usa este
app.use(express.json());

//global Variables
app.use((req,res,next) => {
    next();
})

//routes
app.use(require("./routes/index"));
app.use(require("./routes/authentication"));
app.use('/links',require("./routes/links"));


//public
app.use(express.static(path.join(__dirname, "public")))


//starting server
app.listen(app.get('port'), () => {
    console.log("server on port", app.get('port'));
});