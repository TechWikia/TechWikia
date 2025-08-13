import { validatePostTitle } from "./validate-post-title";

describe(' validate-post-title (unit)', () => {
    test('deve retornar erros quando o title tem menos que 4 caracteres', () => {
        const title = 'abc';
        const result = validatePostTitle(title)
        expect(result.errors).toStrictEqual([
            'descrição precisa ter mais de 3 caracteres'
        ]);
        expect(result.sucess).toBe(false)

    })




    test('deve sucesso erros quando o title tem mais que 3 caracteres', () => { })
    const title = 'abcd';
    const result = validatePostTitle(title)
    expect(result.errors).toStrictEqual([]);
    expect(result.sucess).toBe(true)


})