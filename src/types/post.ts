
export type TAuthors = {
    "name": string,
    "nickname": string,
    "profileImage": string,
    "verified": boolean
}

export type TComment = {
    "author": TAuthors,
    "content": string,
    "createdAt": Date,
    "likes": number,
    "isLiked": boolean
}

export type TPost = {
    "id": number,
    "author": TAuthors,
    "images": string[],
    "category": number,
    "categoryName": string,
    "retweets": number,
    "comments": number,
    "isRetweeted": boolean,
    "hasMoreComments": boolean,
    "commentList": TComment[],
} & TComment