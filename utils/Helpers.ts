import { IErrors } from "./interfaces";

/**
 * Parse cookie string to JS object
 * @param cookie_string cookie string from req.headers.cookie
 */
export const parseCookie = (cookie_string: string): any => (
    cookie_string
      .split(';')
      .map(v => v.split('='))
      .reduce((acc, v) => {
        acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
        return acc;
      }, {})
)

/**
 * Validate data
 * @param data object with key value pair. e.g { name: 'Rakumairu' }
 * @param exception array of key that need to be skipped
 */
export const validateData = (data: any, exception?: string[]) => {
    const message = 'This is field is required'
    const errors: IErrors = {}
    let valid = true
    
    for (let key in data) {
        if (exception?.includes(key)) continue
        const value = data[key]
        if (value === '') {
            valid = false
            errors[key] = message
        } else {
            delete errors[key]
        }
    }
    
    return {
        isValid: valid,
        errors
    }
}