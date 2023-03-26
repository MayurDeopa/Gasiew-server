
import {Request,Response,NextFunction} from 'express'


export const notFound = (req:Request, res:Response, next:NextFunction) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
  };
  

export const userError =(err:boolean,msg:String ,req:Request, res:Response, next:NextFunction)=>{
  res.status(501).json({
    error:msg,
    success:!err
  })
}


  export const errorHandler = (err:any, req:Request, res:Response, next:NextFunction) => {
    return res.status(400).json({
      error:err.message,
      success:false
    })
  }


