export default (req, res, next) => {
    // check permission theo path
    
    console.log('check permission', req._parsedUrl.pathname, req.url)
    next()
}