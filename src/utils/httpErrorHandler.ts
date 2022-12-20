export default function httpErrorHandler(errorMessage: string) {
  switch(errorMessage) {
    case 'bad request':
      return 400
    case 'unauthorized':
      return 401
    case 'not found':
      return 404
    case 'validation error':
      return 422
    default:
      return 500
  }
}