const { Message } = require('discord.js');
const { find } = require('../../models/horodatageFile');
const {horodatage}=require('../../models/index');
const { mj } = require('../../models/index');

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
                console.log(`t a été défini à : ${t}`);
                }
            })
        }

        if (interval == 0){
            horodatage.find({id: "interval"}, function (err, docs){
                if (docs != 0){
                interval = docs[0]._doc.heure;
                console.log(`interval a été défini à : ${interval}`);
                }
            })
        }

        if (imageOnOff == 0){
            horodatage.find({id: "onoff"}, function (err, docs){
                if (docs != 0){
                imageOnOff = docs[0]._doc.heure;
                console.log(`etat de l'event image est réglé sur : ${imageOnOff}`)
                }
            })
        }

        if (salonDeJeu == 0){
            horodatage.find({id: "channel"}, function (err, docs){
                if (docs != 0){
                salonDeJeu = docs[0]._doc.heure;
                console.log(`l'id du salon de jeu a été réglé sur : ${salonDeJeu}`)
                }
            })
        }

        mj.find(function (err, docs) {
            for (let nombre = docs.length-1; nombre >= 0; nombre--){
                if (gameMaster.indexOf(docs[nombre]._doc.id)==-1){
                gameMaster.push(docs[nombre]._doc.id)
                console.log(`${docs[nombre]._doc.id} a été ajouté à la liste des mj`);      
                }
            }
        });

        horodatage.find({id: "remove"}, function (err, docs){
            if (docs != 0){
            remove = docs[0]._doc.heure;
            console.log(`remove a été passé à : ${remove}`)
            }
        })

    }
}