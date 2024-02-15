const validateRequired = (value: string) => (!value ? 'Обязательное поле' : undefined);
const validateName = (value: string) => {
    const requiredError = validateRequired(value);
    if (requiredError) return requiredError;
    if (value.length < 2) return 'Имя должно состоять минимум из 2 символов';
    if (value.length > 50) return 'Имя не должно быть длинее 50 символов';
};
const validateMail = (value: string) => {
    const requiredError = validateRequired(value);
    const email = /\S+@\S+\.\S+/.test(value);
    if (requiredError) return requiredError;
    console.log('email', email);
    if (!email) return 'Неверная почта';
};

export const rules = {
    validateRequired,
    validateName,
    validateMail,
};