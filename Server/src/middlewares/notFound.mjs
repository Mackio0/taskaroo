const notFoundHandler = (req, res, next) => {
    const error = new Error('The route you requested was not found')
    error.status = 404
    next(error)
}

export default notFoundHandler