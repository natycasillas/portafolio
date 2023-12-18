const express = require('express')
const path = require('path');
const { engine }  = require('express-handlebars')
const methodOverride = require('method-override');
const passport = require('passport');
const session = require('express-session');
// Inicializaciones
require('./config/passport')


const app = express()

// Configuraciones 

app.set('views',path.join(__dirname, 'views'))
app.engine('.hbs',engine({
    defaultLayout:'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    extname:'.hbs'
}))
app.set('view engine','.hbs')


// Configuraciones 
app.set('port',process.env.port || 3000)
app.set('views',path.join(__dirname, 'views'))

// Middlewares 
app.use(express.urlencoded({extended:false}))

app.use(session({ 
    secret: 'secret',
    resave:true,
    saveUninitialized:true
}));
app.use(passport.initialize())
app.use(passport.session())

// Variables globales

// Variables globales
app.use((req,res,next)=>{
    res.locals.user = req.user?.name || null
    next()
})

// Middlewares 
app.use(methodOverride('_method'))


// Rutas 
app.use(require('./routers/index.routes'))
app.use(require('./routers/portafolio.routes'))
// Rutas 

app.use(require('./routers/user.routes'))

// Archivos estáticos
app.use(express.static(path.join(__dirname,'public')))


module.exports = app

