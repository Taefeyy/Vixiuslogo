const {horodatage}=require('../../models/index');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name : 'check',
    run: (client, message, args) => {
        const d = new Date();
        
        //Aller chercher la présence du participant dans la DB
        horodatage.find({id : message.author.id}, function (err, docs) {

            //Joueur présent dans la db
            if(docs.length != 0){
                function padTo2Digits(num) {
                    return num.toString().padStart(2, '0');
                };

                function convertMsToTime(milliseconds) {
                    let seconds = Math.floor(milliseconds / 1000);
                    let minutes = Math.floor(seconds / 60);
                    let hours = Math.floor(minutes / 60);
                  
                    seconds = seconds % 60;
                    minutes = minutes % 60;
                    hours = hours % 24;
                  
                    return `${padTo2Digits(hours)}Heures ${padTo2Digits(minutes)}Minutes ${padTo2Digits(seconds)}Secondes`;
                };
                //Message de réponse avec le temps restant
                const embedtest = new MessageEmbed()
                .setColor(0x00FFFF)
                .setDescription(`${message.author}`)
                .addField(`Temps avant de pouvoir jouer :`,`${convertMsToTime(interval - (d.getTime()-docs[0]._doc.heure))}`)

                const embedTempsEcouler = new MessageEmbed()
                .setColor(0x00FFFF)
                .setDescription(`${message.author}`)
                .addField(`\u200b`,`T'attends quoi pour jouer ?!`)

                //Interval écoulé
                if(d.getTime() - docs[0]._doc.heure >= interval){
                    message.channel.send({embeds : [embedTempsEcouler]})
                }
                //Interval non écoulé
                if(d.getTime() - docs[0]._doc.heure < interval){
                    message.channel.send({embeds : [embedtest]})
                }
            }
        });
    }
};