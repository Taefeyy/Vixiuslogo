const {horodatage}=require('../../models/index');
const { mj } = require('../../models/index');
const { ava } = require('../../models/index');
const { MessageEmbed } = require('discord.js');
var cron = require('node-cron')

module.exports = {
    name : 'ready',
    once: true,
    execute(client){
        console.log('Bot opérationnel');
        require('../../variables');

        
        if (t == 0){
            horodatage.find({id : "time"}, function (err, docs) {
                if (docs != 0){
                t = docs[0]._doc.heure;
                }
            })
        }

        if (interval == 0){
            horodatage.find({id: "interval"}, function (err, docs){
                if (docs != 0){
                interval = docs[0]._doc.heure;
                }
            })
        }

        if (imageOnOff == 0){
            horodatage.find({id: "onoff"}, function (err, docs){
                if (docs != 0){
                imageOnOff = docs[0]._doc.heure;
                }
            })
        }

        if (salonDeJeu == 0){
            horodatage.find({id: "channel"}, function (err, docs){
                if (docs != 0){
                salonDeJeu = docs[0]._doc.heure;
                }
            })
        }

        mj.find(function (err, docs) {
            for (let nombre = docs.length-1; nombre >= 0; nombre--){
                if (gameMaster.indexOf(docs[nombre]._doc.id)==-1){
                gameMaster.push(docs[nombre]._doc.id)  
                }
            }
        });

        horodatage.find({id: "remove"}, function (err, docs){
            if (docs != 0){
            remove = docs[0]._doc.heure;
            }
        })

        const d = new Date()

        var embedRecapAva = new MessageEmbed()
        .setColor(0x660099)
        .setTitle('Recapitulatif AvA :')


        function checkavaDB(){
            ava.find({name: 'ava'}, function (err, docs){
                if (docs.length >= 1){
                    for (let nombre = docs.length-1; nombre >= 0; nombre--){
    
                        if(docs[nombre]._doc.moment < (d.getTime()/1000).toString()){
                            ava.deleteOne({"_id" : docs[nombre]._doc._id}, function (err, docs){
                                console.log(docs);
                            })
                        } else {
                            console.log("Une AvA a été trouvée dans la DB et le message est programmé.");

                            embedRecapAva.addFields({name: '\u200B', value : `**Lieu :** ${docs[nombre]._doc.lieu} **Date :** ${docs[nombre]._doc.jour}/${docs[nombre]._doc.mois} **Horaire :** ${docs[nombre]._doc.heure}h${docs[nombre]._doc.minutes}`})

                            cron.schedule(`${docs[nombre]._doc.minutes} ${docs[nombre]._doc.heure} ${docs[nombre]._doc.jour} ${docs[nombre]._doc.mois} ${docs[nombre]._doc.jourDeLaSemaine}`, () => {
                                message.channel.send(`<@&1039867296195280916>`)
                            })
                        }
                    }
                    client.channels.cache.get(`1033521148547305543`).send({embeds : [embedRecapAva]})
                }
            })
        }

        checkavaDB()

        cron.schedule(`00 00 * * *`, () => {
            checkavaDB()
            client.channels.cache.get(`1033521148547305543`).send({embeds : [embedRecapAva]})
        })

    }
}