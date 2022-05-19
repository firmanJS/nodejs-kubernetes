const { HTTP, PAGE, LIMIT } = require('./constant')

const notFoundHandler = (req, res) => {
  const message = `Route : ${req.url} Not found.`
  const err = new Error(message)
  res.status(HTTP.OK).json({
    error: err.toString(),
    status: false,
    message,
  })
}

const removeFavicon = (req, res, next) => {
  if (req.url === '/favicon.ico') {
    res.writeHead(200, { 'Content-Type': 'image/x-icon' })
    res.end(/* icon content here */)
  } else {
    next()
  }
}

const errorHandler = (_error, res) => res.status(HTTP.OK).json({
  status: false,
  message: 'invalid syntax',
  data: [],
})

const syntaxError = (err, req, res, next) => {
  const result = {
    status: false,
    message: `syntax error ${err}`,
    data: []
  }

  if (err instanceof SyntaxError) {
    return res.status(HTTP.BAD_REQUEST).send(result)
  } else {
    return next()
  }
}

const paginationResponse = (req, res, data) => {
  const limitPerPage = req.query?.limit || LIMIT
  const countTotal = data?.count || LIMIT
  res.status(HTTP.OK).json({
    message: 'success',
    status: true,
    data: data?.result || [],
    _meta: {
      page: req.query?.page || PAGE,
      limitPerPage,
      totalPage: Math.ceil(countTotal / limitPerPage),
      countPerPage: data.result?.length || 0,
      countTotal
    }
  })
}

const baseResponse = (res, data) => res.status(data?.code ?? 200).json(data?.data)

const mappingResult = (message, code = 200, status = true, data = []) => {
  return {
    code,
    data : {
      status,
      message,
      data
    }
  }
}
// Object.values(error.errors).map(val => val.message)
const mappingError = (error) => {
  return {
    code: 400,
    data : {
      status: false,
      message: error.message,
      data: []
    }
  }
}

module.exports = {
  notFoundHandler,
  errorHandler,
  baseResponse,
  paginationResponse,
  removeFavicon,
  syntaxError,
  mappingResult,
  mappingError
}