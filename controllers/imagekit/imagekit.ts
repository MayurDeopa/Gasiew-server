import asyncHandler from 'express-async-handler'
import { imagekit } from "../../lib/imagekit";






export const auth =asyncHandler(async(req,res)=>{
    let imagekitAuthenticationParameters = imagekit.getAuthenticationParameters()
    res.json(imagekitAuthenticationParameters)
})