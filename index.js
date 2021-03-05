import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import allRoutes from './routes/routes.js'
import session from 'express-session'

const app = express()
dotenv.config()

//Template 
app.set('views', './src/views')
app.set('view engine', 'ejs')

//Midlleware
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended : false }))
app.use(bodyParser.json())
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }))

//Routes
app.use('/', allRoutes)

//listen port 
app.listen(process.env.PORT, () => console.log(`Server Running on Port: http://localhost:${process.env.PORT}`))