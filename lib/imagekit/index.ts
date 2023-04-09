import ImageKit from 'imagekit'

export const imagekit = new ImageKit({
    publicKey:process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint:process.env.IMAGEKIT_URL

})

export const uploadImageToImagekit = async(file:any,fileName:string)=>{
    const data = await imagekit.upload({
        file:file,
        fileName:fileName
    })
    return data
}

export const deleteImageFromImagekit = async(fileId:string)=>{
    const data = await imagekit.deleteFile(fileId)
    return data
}