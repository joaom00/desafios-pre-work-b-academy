type TMethod = 'POST' | 'DELETE'

export type TData = {
  image?: string
  brandModel?: string
  year?: string
  plate?: string
  color?: string
}

const request = (url: string, options?: RequestInit) =>
  fetch(url, options)
    .then((r) => r.json())
    .catch((e) => ({ error: true, message: e.message }))

const createRequest = (method: TMethod) => (url: string, data: TData) =>
  request(url, {
    method,
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(data)
  })

export const get = (url: string) => request(url)
export const post = createRequest('POST')
export const del = createRequest('DELETE')
