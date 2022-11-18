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
        var avaFutureReady = []

        function checkavaDB(){
            ava.find({name: 'ava'}, function (err, docs){
                if (docs.length >= 1){
                    //Repassage à 0 des _id à supprimer, avant de faire la lecture quotidienne des nouveaux _id à supprimer.
                    _idSupprimer.length=0;

                    //Creation de l'embed pour le recap AvA.
                    var embedRecapAva = new MessageEmbed()
                    .setColor(0x660099)
                    .setTitle('Recapitulatif AvA :')

                    //Boucle FOR pour traiter les différentes AvA listée dans la DB.
                    for (let nombre = docs.length-1; nombre >= 0; nombre--){
                        console.log(docs[nombre]._doc.moment)
                        console.log(((d.getTime()/1000)).toString())

                        if(docs[nombre]._doc.moment < ((d.getTime()/1000)).toString()){

                            //Enregistrement des _id à supprimer de la DB
                            _idSupprimer.push(docs[nombre]._doc._id)

                        } else {

                            console.log("Une AvA a été trouvée dans la DB et le message est programmé.");


                            //Mise à jour de l'array en fonction des AvA futures trouvées dans la DB.
                            avaFutureReady.push({lieu : docs[nombre]._doc.lieu, jour : docs[nombre]._doc.jour, mois : docs[nombre]._doc.mois, heures : docs[nombre]._doc.heure, minutes : docs[nombre]._doc.minutes, moment : docs[nombre]._doc.moment});

                            //Retrait d'une heure pour prendre en considération le décalage GMT+1.
                            const heureTag = docs[nombre]._doc.heure-1;

                            //Création d'une tâche à un moment précis.
                            cron.schedule(`${docs[nombre]._doc.minutes} ${heureTag} ${docs[nombre]._doc.jour} ${docs[nombre]._doc.mois} ${docs[nombre]._doc.jourDeLaSemaine}`, () => {
                                client.channels.cache.get(`993494605129580685`).send(`AvA : ${docs[nombre]._doc.lieu} \n Début : dans 10 minutes \n <@&1039867296195280916>`)
                            })
                        }
                    }

                    //Suppression quotidienne des AvA déjà passée dans la DB.
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

                    //Tri des AvA pour les avoir dans l'ordre du plus proche au plus éloigné
                    avaFutureReady.sort(function (a, b) {
                        return b.moment - a.moment;
                      });
        
                    //Création de l'embed récapitulatif quotidien
                    if (avaFutureReady.length > 1){
                        for (let x = avaFutureReady.length - 1 ; x >= 0 ; x--){
                            embedRecapAva.addFields({name: '\u200B', value : `**Lieu :** ${avaFutureReady[x].lieu} **Date :** ${avaFutureReady[x].jour}/${avaFutureReady[x].mois} **Tag à :** ${avaFutureReady[x].heures}h${avaFutureReady[x].minutes}`})
                        }
                    }

                    //Message récapitulatif quotidien.
                    client.channels.cache.get(`993494605129580685`).send({embeds : [embedRecapAva]})
                }
            })
        }
        
        checkavaDB()

        //Check up quotidien des données dans la DB + message récapitulatif des AvA prévues.
        cron.schedule(`0 0 * * *`, () => {
            checkavaDB()
        })

    }
}