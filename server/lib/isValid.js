export function isValidUsername(username) {
    const stringMinSize = 3;
    const stringMaxSize = 20;
    const allowedSymbols = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    if (typeof username !== 'string') {
        return 'Input must be a string';
    } else if (username.length < stringMinSize) {
        return `Username is too short, must be at least ${stringMinSize} characters`;
    } else if (username.length > stringMaxSize) {
        return `Username is too long, cannot exceed ${stringMaxSize} characters`;
    } else {
        for (let char of username) {
            if (!allowedSymbols.includes(char)) {
                return 'Invalid character found in Username';
            }
        }
    }
    return '';
}

export function isValidPassword(password) {
    const stringMinSize = 8;
    const stringMaxSize = 100;
    const allowedSymbols = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    if (typeof password !== 'string') {
        return 'Input must be a string';
    } else if (password.length < stringMinSize) {
        return `Password is too short, must be at least ${stringMinSize} characters`;
    } else if (password.length > stringMaxSize) {
        return `Password is too long, cannot exceed ${stringMaxSize} characters`;
    } else {
        for (let char of password) {
            if (!allowedSymbols.includes(char)) {
                return 'Invalid character found in Password';
            }
        }
    }
    return '';
}

export function isNonEmptyString(text) {
    return typeof text === 'string' && text.length > 0;
}