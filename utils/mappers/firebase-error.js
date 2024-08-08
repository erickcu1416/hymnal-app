import { ERROR_CODES } from "../constants/error_codes";


export const FIREBASE_MAPPER = {
    'auth/email-already-exists': ERROR_CODES.A001.code_error,
    'auth/email-already-in-use': ERROR_CODES.A002.code_error,
}


export const getStatusErrorWithOutPrefix = code => {
    console.log('CODE', code)
	const errorCodeTras = FIREBASE_MAPPER[code];
    if (errorCodeTras) {
        return ERROR_CODES[errorCodeTras]   
    }
    
    return ERROR_CODES.unknown
    
};
