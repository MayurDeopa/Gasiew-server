

import asyncHandler from 'express-async-handler'

import { Request,Response } from 'express'

import { prisma } from '../../lib/prisma'
import { deleteImageFromImagekit, imagekit, uploadImageToImagekit } from '../../lib/imagekit'



export const getUser = asyncHandler(async(req:Request,res:Response)=>{

    let {username} = req.params
    const user = await prisma.user.findFirst({
        where:{
            username:username
        },
        select:{
            id:true,
            username:true,
            role:true,
            is_public:true,
            assets:true,
            banner:true,
            post:{
                include:{
                    assets:{
                        select:{
                            url:true,
                            height:true,
                            width:true
                        }
                    },
                    comments:true,
                    likes:true,
                    user:{
                        select:{
                            id:true,
                            username:true,
                            assets:true
                        }
                    }
                }
            }
        }
    })
    

    if(user){
        res.status(201).send({
            success:true,
            data:user
        })
    }
    else{
        throw Error("Invalid username")
    }


})

export const updateProfilePicture = asyncHandler(async(req:Request,res:Response)=>{

    const userId = req.currentUserId
    const {image,id} = req.body

    await deleteImageFromImagekit(id)

    const {fileId,url,height,width} = await uploadImageToImagekit(image.image,image.name)

    const updateImage = await prisma.userAssets.update({
        where:{
            id:userId
        },
        data:{
            avatar_url:url,
            height:height,
            width:width,
            fileId:fileId
        }
    })
    

        res.status(201).send({
            success:true,
            data:updateImage
        })



})

export const getUserById = asyncHandler(async(req:Request,res:Response)=>{

    let id = req.currentUserId
    const user = await prisma.user.findFirst({
        where:{
            id:id
        },
        select:{
            id:true,
            username:true,
            role:true,
            is_public:true,
            assets:true,
            banner:true,
            post:{
                include:{
                    assets:{
                        select:{
                            url:true,
                            height:true,
                            width:true
                        }
                    },
                    comments:true,
                    likes:true,
                    user:{
                        select:{
                            id:true,
                            username:true,
                            assets:true
                        }
                    }
                }
            }
        }
    })
    

    if(user){
        res.status(201).send({
            success:true,
            data:user
        })
    }
    else{
        throw Error("Invalid id")
    }


})