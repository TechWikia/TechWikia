import { sanitizeSrt } from "./sanitize-str"

describe('sanitizeStr (unit)',()=>{
    test('retorna uma string vazia quando recebe um valor falsy', ()=>{
        // @ts-expect-error testando a função sem parametros
      expect(sanitizeSrt()).toBe('');
    })

    test('retorna uma string vazia quando recebe um valor que não é uma string', ()=>{
        // @ts-expect-error testando com tipagem incorreta
      expect(sanitizeSrt(123)).toBe('');
    })

    test('garante o trim da string enviada', ()=>{
      expect(sanitizeSrt('    a    ')).toBe('a');
    })

    test('garante a string é normalizada com NFC', ()=>{
      const original = 'e\u0301';
      const expected = 'é'
    
      expect(expected).toBe(sanitizeSrt(original))
    })


})