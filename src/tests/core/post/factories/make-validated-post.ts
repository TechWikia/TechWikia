import { sanitizeSrt } from "@/tests/utils/sanitize-str";
import { validatePostTitle } from "../schemas/validate-post-title";
import { makeNewPost } from "./make-new-post";
import { post } from "../schemas/post.contract";

export type invalidPost = {
    sucess: false,
    errors: string[]
}

export type validPost = {
    sucess: true,
    data: post
}

type MakeValidatedPost = invalidPost | validPost;



export function makeValidatedPost(title: string): MakeValidatedPost{
    const cleanTitle = sanitizeSrt(title)
    const validatedtitle = validatePostTitle(cleanTitle)

    if (validatedtitle.sucess){
        return {
            sucess: true,
            data: makeNewPost(cleanTitle)
        }
    }

    return {
        sucess: false,
        errors: validatedtitle.errors,
    };



}