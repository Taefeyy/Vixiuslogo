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

        var _idSupprimer = []


        function checkavaDB(){
            ava.find({name: 'ava'}, function (err, docs){
                if (docs.length >= 1){
                    _idSupprimer.length=0;
                    var embedRecapAva = new MessageEmbed()
                    .setColor(0x660099)
                    .setTitle('Recapitulatif AvA :')
                    for (let nombre = docs.length-1; nombre >= 0; nombre--){
                        console.log(docs[nombre]._doc.moment)
                        console.log(((d.getTime()/1000)+3600).toString())

                        if(docs[nombre]._doc.moment < ((d.getTime()/1000)+3600).toString()){

                            _idSupprimer.push(docs[nombre]._doc._id)

                        } else {

                            console.log("Une AvA a été trouvée dans la DB et le message est programmé.");

                            embedRecapAva.addFields({name: '\u200B', value : `**Lieu :** ${docs[nombre]._doc.lieu} **Date :** ${docs[nombre]._doc.jour}/${docs[nombre]._doc.mois} **Tag à :** ${docs[nombre]._doc.heure}h${docs[nombre]._doc.minutes}`})

                            const heureTag = docs[nombre]._doc.heure-1;

                            console.log(`minutes: ${docs[nombre]._doc.minutes}`)
                            console.log(`heures: ${heureTag}`)
                            console.log(`jour: ${docs[nombre]._doc.jour}`)
                            console.log(`mois: ${docs[nombre]._doc.mois}`)
                            console.log(`jour de la semaine: ${docs[nombre]._doc.jourDeLaSemaine}`)

                            cron.schedule(`${docs[nombre]._doc.minutes} ${heureTag} ${docs[nombre]._doc.jour} ${docs[nombre]._doc.mois} ${docs[nombre]._doc.jourDeLaSemaine}`, () => {
                                message.channels.cache.get(`993494605129580685`).send(`Début : Dans 10minutes. <@&1039867296195280916>`)
                            })
                        }
                    }

                    if (_idSupprimer.length > 1){
                        for (let nbrASupprimer = _idSupprimer.length-1; nbrASupprimer>=0 ; nbrASupprimer--){
                            ava.deleteMany({"_id" : _idSupprimer[nbrASupprimer]}, function (err, docs){
                                console.log(docs);
                            })
                        }

                    } 
                    
                    if (_idSupprimer.length > 0 && _idSupprimer.length <= 1){
                        ava.deleteOne({"_id" : _idSupprimer[0]}, function (err, docs){
                            console.log(docs);
                        })
                    }
                    client.channels.cache.get(`993494605129580685`).send({embeds : [embedRecapAva]})
                }
            })
        }

        checkavaDB()

        cron.schedule(`00 00 * * *`, () => {
            checkavaDB()
        })

    }
}
