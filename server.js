const app = require('./src/app.js')

const PORT = process.env.PORT || 3056;

const server = app.listen(PORT, () => {
    console.log(`Server start width ${PORT}`);
})

process.on('SIGINT', () => {
    server.close(() => console.log('Exit server express'));
})
