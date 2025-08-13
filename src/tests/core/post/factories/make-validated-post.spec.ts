import * as sanitizeSrtMod from "@/tests/utils/sanitize-str";
import * as validatePostTitleMod from "../schemas/validate-post-title";
import * as makeNewPostMod from "./make-new-post";
import { makeValidatedPost, validPost, invalidPost } from "./make-validated-post";

describe('makeValidatedPost (unit)', () => {
    test('deve chamar a funcao sanitizerStr com valor correto', () => {
        //mockar (mock) -> substituir alguma coisa temporariamente
        //arrange
        const { title, sanitizeStrSpy } = makeMocks()


        //act
        makeValidatedPost(title)

        //assert
        expect(sanitizeStrSpy).toHaveBeenCalledExactlyOnceWith(title)

    })

    test('deve chamar a validatePostTitle com o retorno do sanitizerStr', () => {
        // pegando os spies
        const { title, sanitizeStrSpy, validatedPostTitleSpy } = makeMocks()

        //variavel que sera o retorno da sanitizeStr
        const sanitizerStrReturn = 'retorno da sanitizerSTR'

        // mocko o retorno da sanitizeStr
        sanitizeStrSpy.mockReturnValue(sanitizerStrReturn)

        makeValidatedPost(title) as validPost
        expect(validatedPostTitleSpy).toHaveBeenCalledExactlyOnceWith(sanitizerStrReturn)


    })

    test('deve chamar makeNewPost se validatedPostTitle retornou sucesso', () => {
        const { title } = makeMocks()
        const result = makeValidatedPost(title) as validPost

        expect(result.sucess).toBe(true);

        expect(result.data.id).toBe('any-id')
        expect(result.data.title).toBe('abcd')
        expect(result.data.createdAt).toBe('any-date')
    })


    test('deve retornar validatedTitle.error se a validação falhou', () => {
        const { title, errors, validatedPostTitleSpy } = makeMocks()

        validatedPostTitleSpy.mockReturnValue({ errors, sucess: false });
        const result = makeValidatedPost(title) as invalidPost
        expect(result ).toStrictEqual({errors, sucess: false})
    })
})

const makeMocks = (title = 'abcd') => {
    const errors = ['any', 'error']

    const post = {
        id: 'any-id',
        title,
        createdAt: 'any-date'
    }

    const sanitizeStrSpy = vi.spyOn(sanitizeSrtMod, 'sanitizeSrt').mockReturnValue(title);
    const validatedPostTitleSpy = vi.spyOn(validatePostTitleMod, 'validatePostTitle').mockReturnValue({ errors: [], sucess: true })
    const makeNewPostSpy = vi.spyOn(makeNewPostMod, 'makeNewPost').mockReturnValue(post)

    return {
        title,
        sanitizeStrSpy,
        validatedPostTitleSpy,
        makeNewPostSpy,
        post,
        errors

    }
}