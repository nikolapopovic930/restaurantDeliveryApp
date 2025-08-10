const uppercaseRegex = /[A-ZČĆŠĐŽ]/;


export const isValidEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

export const isValidPhone = (phone: string): boolean => {
    const regex = /^\+?\d{8,}$/;
    return regex.test(phone);
};

export const isValidName = (name: string): boolean => {
    const regex = /^[A-Za-zŠšĐđČčĆćŽž\s\-]+$/;
    return regex.test(name);
};

export const isUpperCase = (string: string): boolean => {
    const regex =/[A-ZČĆŠĐŽ]/;
    return regex.test(string);
};