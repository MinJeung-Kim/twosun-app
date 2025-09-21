export type TAuthor = {
    name: string,
    nickname: string,
    profileImage: string,
    verified: boolean
}

export type TBaseContent = {
    author: TAuthor,
    content: string,
    createdAt: string,
    likes: number,
    isLiked: boolean
}

export type TComment = TBaseContent

export type TPost = TBaseContent & {
    id: number,
    images: string[],
    category: number,
    categoryName: string,
    retweets: number,
    comments: number,
    isRetweeted: boolean,
    hasMoreComments: boolean,
    commentList: TComment[],
}
