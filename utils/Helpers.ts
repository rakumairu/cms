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