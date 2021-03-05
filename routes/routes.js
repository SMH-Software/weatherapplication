import express from 'express'
import { getHome, postWeather, getContact, postMessage } from '../controllers/controllers.js'
const router = express.Router()

router.get('/', getHome)
router.get('/contact', getContact)
router.post('/weather', postWeather)
router.post('/sendmessage', postMessage)


export default router