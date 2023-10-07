function pathJoin(...parts) {
  const separator = '/'
  let result = parts[0]
  for (let i = 1; i < parts.length; i++) {
    if (result.endsWith(separator) ) {
      if (parts[i].startsWith(separator)) {
        result += parts[i].substring(1)
      } else {
        result += parts[i]
      }
    } else {
      if (parts[i].startsWith(separator)) {
        result += parts[i]
      } else {
        result += separator + parts[i]
      }
    }
  }

  console.log("pathJoin: " + result, parts)
  return result
}

function toQueryString(params) {
  return Object.keys(params).map(key => key + '=' + params[key]).join('&')
}

export async function getFromApi(host, path, queryStrParams) {
  let url = "http://" + pathJoin(host, path)
  
  if (queryStrParams != null) {
    url += '?' + toQueryString(queryStrParams)
  }
  
  console.log("HTTP GET: " + url)
  const response = await fetch(url)
  return response
}

export async function apiGetMany(toGet) {
  const responses = {}
  for (let i = 0; i < toGet.length; i++) {
    try {
      const response = await getFromApi(toGet[i].host, toGet[i].path, toGet[i].params)
      const data = await response.json()
      console.log(data)
      responses[toGet[i].name] = data
    } catch (err) {
      console.error(err)
      err.message = toGet[i].name + ": " + err.message
      throw err
    }
  }

  return responses
}

export async function postJsonToApi(host, path, body) {
  return sendToApiWithBody(host, path, body, "POST")
}

export async function patchJsonToApi(host, path, body) {
  return sendToApiWithBody(host, path, body, "PATCH")
}

async function sendToApiWithBody(host, path, body, method) {
  const url = "http://" + pathJoin(host, path)
  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body),
  })
  const data = await response.json()
  console.log(data)

  return data
}