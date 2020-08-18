// ================
// Puerto
// ================
process.env.PORT = process.env.PORT || 3000;

// ================
// Entorno
// ================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ================
// BBDD
// ================
let urlDB;

// ================
// Vencimiento del Token
// ================
//, { segundos * minutos * horas * dias}
//, { 60 * 60 * 24 * 30}
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

// ================
// SEED de autentificacion
// ================
//configuramos el seed en heroku
process.env.SEED = process.env.SEED || 'este-es-el-secret-desarrollo';

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;

// ================
// Google Client ID
// ================

process.env.CLIENT_ID = process.env.CLIENT_ID || '1006357772509-vebqh9s0kfq2468re0vepcl5vakq2l50.apps.googleusercontent.com';