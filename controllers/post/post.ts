

import asyncHandler from 'express-async-handler'
import brcypt from 'bcrypt'

import { Request,Response } from 'express'

import { prisma } from '../../lib/prisma'
import { uploadImageToImagekit } from '../../lib/imagekit'


export const createPost = asyncHandler(async(req:Request,res:Response)=>{
    const id = req.currentUserId!

    const {post,image} = req.body
    if( !post || !image ){
        throw Error('Fields are missing')
    }
    const {url,height,width,fileId} = await uploadImageToImagekit(image.image,image.name)
    
    

    const createPost = await prisma.post.create({
        data:{
            user_id:id,
            title:post.title,
            caption:post.caption,
            assets:{
                create:{
                    url:url,
                    height:height,
                    width:width,
                    fileId:fileId
                }
            }
        }
    })
    res.json(createPost)


})

export const getPosts = asyncHandler(async(req:Request,res:Response)=>{

    
    const posts = await prisma.post.findMany({
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
    })
    

    res.status(201).send({
        success:true,
        data:posts
    })


})


export const getPostById = asyncHandler(async(req:Request,res:Response)=>{

    let postId = req.params.postId
    const post = await prisma.post.findFirst({
        where:{
            id:postId
        },
        include:{
            assets:{
                select:{
                    url:true,
                    height:true,
                    width:true
                }
            },
            comments:{
                include:{
                    user:{
                        select:{
                            username:true,
                            id:true
                        }
                    }
                }
            },
            likes:true,
            user:{
                select:{
                    id:true,
                    username:true,
                    assets:true
                }
            }
        }
    })
    

    if(post){
        res.status(201).send({
            success:true,
            data:post
        })
    }
    else{
        throw Error("Invalid post id")
    }


})

interface postCommentReqBody{
    postId:string
    comment:string
}

export const postComment = asyncHandler(async(req:Request,res:Response)=>{

    const userId = req.currentUserId

    let {postId,comment}:postCommentReqBody = req.body
    const createComment = await prisma.comment.create({
        data:{
            post_id:postId,
            user_id:userId!,
            comment:comment
        }
    })
    

    if(createComment){
        res.status(200).send({
            success:true,
            data:createComment
        })
    }
    else{
        throw Error("Failed to post the comment")
    }


})


export const editPost = asyncHandler(async(req:Request,res:Response)=>{

    const userId = req.currentUserId
    const {postId} = req.params

    const {title,caption,assets} = req.body

    const updatedPost = await prisma.post.update({
        where:{
            id:postId
        },
        data:{
            title:title,
            caption:caption,
            assets:assets
        }
    })

    if(updatedPost){
        res.status(200).send({
            success:true,
            data:updatedPost
        })
    }
    else{
        throw Error("Failed to post the comment")
    }


})