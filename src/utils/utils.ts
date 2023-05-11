type dataType<T> = T

const successResponse = <T>(message: string, data: dataType<T>) => {
  return {
    message: message,
    data: data
  }
}

export default successResponse
