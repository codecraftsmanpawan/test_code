import atob from 'atob'

export function AddLibrary(urlOfTheLibrary) {
  const script = document.createElement('script');
  script.src = urlOfTheLibrary;
  script.async = true;
  document.body.appendChild(script);
}

export const jsonHeaders = (token) => {
  let generatedHeaders = {
    "Content-Type": "application/json"
  }
  if (token) {
    generatedHeaders = {
      ...generatedHeaders,
      'Authorization': `Bearer ${token}`
    }
  }
  return generatedHeaders
}

export const getToken = () => {
  try {

    return localStorage.getItem('accessToken')

  } catch (e) {
    console.log('Access Token Error', e)
    return ''
  }
}

export const getIDtoken = () => {
  try {
    return localStorage.getItem('idToken')
  } catch (e) {
    console.log('ID Token Error', e)
    return ''
  }
}


export const parseJwt = (token) => {
  if (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload)
  }
  return false
}

export const getRole = (token) => {

  try {

    let tkn = token || getToken()
    let parsedPayload = parseJwt(tkn)
    if (parsedPayload) {
      return parsedPayload.roles.find(r => {
        if (r.authority) {
          return true
        }
        return false
      })?.authority
    }
    return false

  } catch (e) {
    return false

  }

}

export const getUserInfoFromIDtoken = () => {
  try {

    let tkn = getIDtoken()
    let parsedPayload = parseJwt(tkn)

    return parsedPayload

  } catch (e) {
    return null
  }
}