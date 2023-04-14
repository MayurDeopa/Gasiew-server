import asyncHandler from 'express-async-handler'
import brcypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cookie, { serialize } from 'cookie'

import { Request,Response } from 'express'


import { authUtil } from '../../lib'
import { initialiseUserAssets, initialiseUserBanner } from '../../lib/user'
import { prisma } from '../../lib/prisma'


export const login = asyncHandler(async(req:Request,res:Response)=>{
    
    const {email,password} = req.body
    if(!email || !password){
        throw Error('All fields are required')
    }

    
    const userExist = await prisma.user.findFirst({
        where:{
            email:email
        }
    })
    if(!userExist){
        throw Error('User does not exist')
    }
    let isPasswordMatched = await brcypt.compare(password,userExist.password)
    if(isPasswordMatched){

        const userData = await prisma.user.findFirst({
            where:{
                id:userExist.id
            },
            select:{
                username:true,
                email:true,
                id:true,
                assets:true
            }
        })

        let token = authUtil.generateToken({
            exp:Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
            email:userData!.email,
            username:userData!.username,
            id:userData!.id
        })

          res.status(200).json({
            message:"Login successful",
            token:token,
            success:true,
            data:userData
          })
        
    }
    else{
        throw Error('Wrong credentials')
    }

})


export const register = asyncHandler(async(req:Request,res:Response)=>{
    const {email,password,username} = req.body
    if(!email || !password || !username){
        throw Error('All fields are required')
    }

    const userExist = await prisma.user.findFirst({
        where:{
            OR:[
                {username},
                {email}
            ]
        }
    })
    if(userExist){
        throw Error('User already exists')
    }
    
    const encryptedPassword =await  brcypt.hash(password,10)

    if(encryptedPassword){
        await prisma.user.create({
            data:{
                email:email,
                password:encryptedPassword,
                username:username,
                assets:{
                    create:initialiseUserAssets()
                },
                banner:{
                    create:initialiseUserBanner()
                }
            }
        })
        res.status(201).json({
            message:'User has been created sucessfully',
            success:true
        })
    }
    else{
        throw Error('Something went wrong, please try again later')
    }

    

})

export const bootstrapUser =asyncHandler(async(req,res)=>{
    const {currentUserId} = req

    if(!currentUserId){
      res.status(501).json({
        message:"Invalid token",
        success:false
      })
      return;
    }
    
    
    let id:any = currentUserId
    
    const user = await prisma.user.findFirst({
        where:{
            id:id
        },
        select:{
            username:true,
            email:true,
            id:true,
            assets:true
        }
    })

    if(!user){
          res.status(501).json({
            message:"No user found",
            success:false
          })
          return;
    }

    let token = authUtil.generateToken({
        exp:Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
        email:user!.email,
        username:user!.username,
        id:user!.id
    })

    res.status(200).json({
        message:'Login successful',
        token:token,
        success:true,
        data:user
      })
})

