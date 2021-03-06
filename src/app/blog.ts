export interface Blog {
    id: number,
    date_created: Date,
    content: string
}

export interface Comment {
    id: number,
    date_created: Date,
    content: string
}

export interface DetailedBlog {
    id: number,
    date_created: Date,
    content: string,
    comms: Comment[]
}