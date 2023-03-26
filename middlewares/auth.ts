import jwt from 'jsonwebtoken'
import {Request,Response,NextFunction} from 'express'


export default async function authMiddleware(req:Request,res:Response,next:NextFunction){
      
      try {
        const token = req.headers!.authorization?.split(" ")[1]
        if(!token){
          return res.status(401).json({message:'Not authorized',success:false})
        }
        const secret =process.env.JWT_SECRET!
        const validUser:any = jwt.verify(token,secret)
        req.currentUserId = validUser.id
        return next()
      } catch (err) {
        next(err)
      }
}


