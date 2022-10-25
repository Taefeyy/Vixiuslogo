const {Client, Collection} = require('discord.js');
const client = new Client({intents: 513});

const mongoose = require('mongoose');

client.commands = new Collection();

['commandUtil', 'eventUtil'].forEach(handler => {require(`./utils/handlers/${handler}`)(client) });

process.on('exit', code => {console.log(`Le processus s'est arrêté avec le code: ${code}`)});
process.on('uncaughtException', (err, origin) => {console.log(`UNCAUGHT_EXCEPTION: ${err}`, `Origine : ${origin}`)});
process.on('unhandledRejection', (reason, promise) => {console.log(`UNHANDLED_REJECTION: ${reason}\n ---\n`, promise)});
process.on('warning', (...args) => {console.log(...args)});

client.login(process.env.TOKEN); // à remettre pour heroku

mongoose.connect(process.env.DBTOKEN, {
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
  }).then(()=>{console.log('Le client est connecté à la DB')}).catch(err => {console.log(err)});