//Import config file 
const {SERVER_PORT} = require('./config/config');
// Import express setting file
const app = require('./config/app');
//const mongoose = require('./config/mongoose');

app.listen(SERVER_PORT, () => {
    console.log(`Server running on http://localhost:${SERVER_PORT}`);
});