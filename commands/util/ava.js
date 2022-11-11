const { MessageEmbed } = require('discord.js');
var cron = require('node-cron')
const { ava } = require('../../models/index');

module.exports = {
    name : 'ava',
    run: (client, message, args) => {


        /*Bosser sur :
            1) Trouver un moyen de définir le lieu même quand ce sont des noms en plusieurs mots
            2) Créer une solution pour delete en cas de problème de configuration
        */

        if (message.channel.id != "993494605129580685") return message.channel.send("Mauvais salon.");
        if (message.author.id != "250235506288361472") return;

        const embedErreurDateHeure = new MessageEmbed()
                    .setColor(0x660099)
                    .setTitle('Erreur')
                    .setDescription(`Il doit y avoir une erreur dans la date et/ou dans l'heure`)
                    .addFields({name: 'Rappel :', value:'.ava **zone** **JJ/MM** **HH/mm**'},
                    {name: 'Référentiel ', value: 'J = jours \n M = mois \n H = heures \n m = minutes'},
                    );
    
        if(message.content.match(/\d/g).length != 8) return message.channel.send({embeds : [embedErreurDateHeure]});

        //Partie acquisition de la date
        const d = new Date();
        const jourMois = message.content.match(/\d/g).slice(0,4).join('')
        const annee = d.getFullYear();
        const dateStr = annee+'-'+jourMois[2]+jourMois[3]+'-'+jourMois[0]+jourMois[1];
        const date = new Date(dateStr)

        //Partie acquisition
        const heure = message.content.match(/\d/g).slice(4,6).join('');
        const minute = message.content.match(/\d/g).slice(6,8).join('');
        const jour = message.content.match(/\d/g).slice(0,2).join('');
        const mois = message.content.match(/\d/g).slice(2,4).join('');
        const lieu = message.content.match(/[a-zA-Z]+/g);

        


        //Partie définition du moment de tag
        const calculMinuteTag = minute - 10;

        if(calculMinuteTag < 0){
            var heureTag = heure - 1;
            var minuteTag = 60 + calculMinuteTag;
        } else {
            var heureTag = heure;
            var minuteTag = calculMinuteTag;
        }

        const heureEnSeconde = (heureTag-1) * 60 * 60;
        const minuteEnSeconde = minuteTag * 60;
        const moment = ((date.getTime()/1000)+heureEnSeconde+minuteEnSeconde).toString();

        const createAva = new ava({name: 'ava', jour: jour, mois: mois, heure: heureTag, minutes: minuteTag, moment: moment, lieu: lieu[1], jourDeLaSemaine: date.getDay().toString()});
        createAva.save()

        const embedAvaDefinie = new MessageEmbed()
            .setColor(0x660099)
            .setTitle('AvA définie :')
            .setDescription(`**Lieu :** ${lieu[1]}   **Date :** ${jour}/${mois}   **Horaire :** ${heure}h${minute}`)
            .addFields( 
            {name: '\u200B', value :`**Tag à :** ${heureTag}h${minuteTag}`, inline: true},
            );

        message.channel.send({embeds : [embedAvaDefinie]})

        const modifHeureHebergeur = heureTag - 1;

        //Faire la modification pour que ça tag un rôle AvA
        cron.schedule(`${minuteTag} ${modifHeureHebergeur} ${jour} ${mois} ${date.getDay()}`, () => {
            message.channel.send(`AvA : ${lieu[1]} \n Début : dans 10minutes \n <@&1039867296195280916>`);
        })
    }
}
