import Express from 'express'


declare global{
    namespace Express {
        interface Request {
            currentUserId?:string 
        }
    }
    namespace NodeJS{
        interface ProcessEnv{
            IMAGEKIT_PUBLIC_KEY:string,
            IMAGEKIT_PRIVATE_KEY:string,
            IMAGEKIT_URL:string
        }
    }
}