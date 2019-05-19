export default {
    server: {
        host: process.env.API_HOST || process.env.VUE_APP_API_HOST || 'http://localhost',
        port: process.env.API_PORT || process.env.VUE_APP_API_PORT || 8080
    }
}
