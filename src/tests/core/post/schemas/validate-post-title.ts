type validatePostTitle = {
    sucess: boolean;
    errors: string[]
};

export function validatePostTitle(title: string): validatePostTitle{
    const errors = [];

    if (title.length <= 3){
        errors.push('descrição precisa ter mais de 3 caracteres')
    }


    //outras checagens

    return{
        sucess: errors.length === 0,
        errors,
    }
}