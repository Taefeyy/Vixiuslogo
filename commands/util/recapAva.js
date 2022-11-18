const { MessageEmbed } = require('discord.js');
const { ava } = require('../../models/index');

module.exports = {
    name : 'recapava',
    run: (client, message, args) => {


    var _idSupprimer = []

    // 0 = lieu, 1 = jour, 2 = mois, 3 = heures, 4 = minutes 
    var avaFuture = []
    const d = new Date ()

        ava.find({name: 'ava'}, function (err, docs){
            if (docs.length >= 1){

                //Repassage à 0 des _id à supprimer, avant de faire la lecture quotidienne des nouveaux _id à supprimer.
                _idSupprimer.length=0;

                //Creation de l'embed pour le recap AvA.
                var embedRecapitulatifAva = new MessageEmbed()
                .setColor(0x660099)
                .setTitle('Recapitulatif AvA :')

                //Boucle FOR pour traiter les différentes AvA listée dans la DB.
                for (let nombre = docs.length-1; nombre >= 0; nombre--){

                    if(docs[nombre]._doc.moment < ((d.getTime()/1000)).toString()){

                        //Enregistrement des _id à supprimer de la DB
                        _idSupprimer.push(docs[nombre]._doc._id)

                    } else {

                        console.log("Une AvA a été trouvée dans la DB.");

                        avaFuture.push({lieu : docs[nombre]._doc.lieu, jour : docs[nombre]._doc.jour, mois : docs[nombre]._doc.mois, heures : docs[nombre]._doc.heure, minutes : docs[nombre]._doc.minutes, moment : docs[nombre]._doc.moment});
                    }
                }

                // //Suppression quotidienne des AvA déjà passée dans la DB.
                // if (_idSupprimer.length > 1){
                //     for (let nbrASupprimer = _idSupprimer.length-1; nbrASupprimer>=0 ; nbrASupprimer--){
                //         ava.deleteMany({"_id" : _idSupprimer[nbrASupprimer]}, function (err, docs){
                //             console.log(docs);
                //         })
                //     }
                // }
                // if (_idSupprimer.length > 0 && _idSupprimer.length <= 1){
                //     ava.deleteOne({"_id" : _idSupprimer[0]}, function (err, docs){
                //         console.log(docs);
                //     })
                // }
            }

            avaFuture.sort(function (a, b) {
                return b.moment - a.moment;
              });

            if (avaFuture.length > 1){
                for (let x = avaFuture.length - 1 ; x >= 0 ; x--){
                    embedRecapitulatifAva.addFields({name: '\u200B', value : `**Lieu :** ${avaFuture[x].lieu} **Date :** ${avaFuture[x].jour}/${avaFuture[x].mois} **Tag à :** ${avaFuture[x].heures}h${avaFuture[x].minutes}`})
                }
            }
            
            message.channel.send({embeds : [embedRecapitulatifAva]})
        })


    }
}