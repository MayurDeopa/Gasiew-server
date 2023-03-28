

export const initialiseUserAssets = ()=>{
    return{
        
            avatar_url:process.env.DEFAULT_AVATAR_URL!,
            height:496,
            width:728,
            fileId:process.env.DEFAULT_AVATAR_FILE_ID!
        
    }
}

export const initialiseUserBanner = ()=>{
    return{
        
        
            url:process.env.DEFAULT_BANNER_URL!,
            height:360,
            width:1081,
            fileId:process.env.DEFAULT_BANNER_FILE_ID!
        
    }
}