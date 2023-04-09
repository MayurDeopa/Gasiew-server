import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { errorHandler ,notFound} from './middlewares/errorHandler'
import {authRouter,imagekitRouter,postRouter, userRouter} from './routes'


const app = express()


app.use(cors({
  origin:"*"
}))
app.use(cookieParser())
app.use(express.json({limit:'25mb'}))




app.use('/auth',authRouter)
app.use('/imagekit',imagekitRouter)
app.use('/post',postRouter)
app.use('/user',userRouter)
app.use(notFound)


app.use(errorHandler)


app.listen(8000,()=>{
  console.log('Connected')
})
