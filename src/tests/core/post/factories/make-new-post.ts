import { post } from "../schemas/post.contract";

export function makeNewPost(title: string): post{
    return{
        id: crypto.randomUUID(),
        title,
        createdAt: new Date().toISOString(),
    }
}