const SERVER_PORT = process.env.PORT || 3800;
const DB_URL = 'replace with the database url';
const DB_OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  };
const SECRET_KEY = "A82B0A9A0EBA17DC535071657D364F48713BEA14D64DD72E6B669341FD32F6D0";
module.exports = {
    SERVER_PORT,
    DB_URL,
    DB_OPTIONS,
    SECRET_KEY
}