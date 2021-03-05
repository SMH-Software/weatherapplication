import request from 'request'
import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
import session from 'express-session'
dotenv.config()

export const getHome = (req, res) => {
    res.render('index')
}

export const postWeather = (req, res) => {
    const url = process.env.URL_WEATHER + req.body.city
     request(url, (error, response, body) => {
         
        const weather_json = JSON.parse(body)
        
        if(error){
            res.render("error")
        }else{

            const weather = {
                temperature: Math.round(weather_json.main.temp - 273,15),
                description: weather_json.weather[0].description,
                icon: weather_json.weather[0].icon,
                city_name: weather_json.name 
            }

            res.render('index', {weather: weather})
        }
    })
    
}

export const getContact = (req, res) => {
    if(req.session.success){
        res.locals.success = req.session.success
        req.session.success = undefined
    }

    res.render('contact')
}

export const postMessage = (req, res) => {
    
    const informations = 
          "Nom : " + req.body.nom + "\n" 
          +   "Email : " + req.body.email + "\n\n" 
          +  "Message : " + req.body.message
        
   
    const transporter = nodemailer.createTransport({
        service: process.env.SERVICE,
        auth:{
            user: process.env.USER,
            pass: process.env.PASS
        },
        tls:{
            rejectUnauthorized: false
        }
    })

    const mailOptions = {
        from: process.env.USER,
        to: process.env.DESTINATE,
        subject: process.env.SUBJECT,
        text: informations
    }

    transporter.sendMail(mailOptions, (err, data) => {
        if(err){
            console.log(err)
        }else{

            req.session.success = "Votre commentaire à bien été envoyé."
            res.redirect('/contact')
       }
    
    })

}