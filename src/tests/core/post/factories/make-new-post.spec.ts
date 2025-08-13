import { makeNewPost } from "./make-new-post"


describe('makeNewPost (unit)', () => {

    test('deve retornar um novo post valido', () => {
        // AAA -> Arrange, Act , Assert
        // Arrange -> Criar as coisas que eu preciso

        const expectedPost = {
            id: expect.any(String),
            title: 'post',
            createdAt: expect.any(String)
        }

        //Act
        const newTodo = makeNewPost('post')

        //Assert
        // toBe === 
        // toEqual toStrictEqual
        // Checando apenas o title
        expect(newTodo.title).toBe(expectedPost.title)

        // Checando o objeto inteiro
        expect(newTodo).toStrictEqual(expectedPost)

    })
})