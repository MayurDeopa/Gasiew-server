

import asyncHandler from 'express-async-handler'
import brcypt from 'bcrypt'

import { Request,Response } from 'express'
import {PrismaClient} from '@prisma/client'

import { authUtil } from '../../lib'

const prisma  =new PrismaClient()



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
    const {image} = req.body
    const updateImage = await prisma.userAssets.update({
        where:{
            id:userId
        },
        data:{
            avatar_url:image.url,
            height:image.height,
            width:image.width
        }
    })
    

    if(updateImage){
        res.status(201).send({
            success:true,
            data:updateImage
        })
    }
    else{
        throw Error("Invalid username")
    }


})