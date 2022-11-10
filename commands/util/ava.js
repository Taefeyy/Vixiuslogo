const { MessageEmbed } = require('discord.js');
var cron = require('node-cron')
const { ava } = require('../../models/index');

module.exports = {
    name : 'ava',
    run: (client, message, args) => {


        /*Bosser sur :
            Done 1) Tag un petit peu avant l'heure de l'ava
            Done 2) Enregister les données dans une collection de la DB existante
            Done 3) Au redémarrage du bot relever les données enregistrée dans la collection des AvA
            Done 4) Trouver un moment où la collection est check et delete les AvA déjà passée (potentiellement dans le schedule)
            5) Créer une solution pour delete en cas de problème de configuration
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

        
        const heureEnSeconde = (heure-1) * 60 * 60;
        const minuteEnSeconde = minute * 60;
        const moment = ((date.getTime()/1000)+heureEnSeconde+minuteEnSeconde).toString();

        //Partie définition du moment de tag
        const calculMinuteTag = minute - 10;

        if(calculMinuteTag < 0){
            var heureTag = heure - 1;
            var minuteTag = 60 + calculMinuteTag;
        } else {
            var heureTag = heure;
            var minuteTag = calculMinuteTag;
        }

        const createAva = new ava({name: 'ava', jour: jour, mois: mois, heure: heureTag, minutes: minuteTag, moment: moment, lieu: lieu[1], jourDeLaSemaine: date.getDay().toString()});
        createAva.save()

        const embedAvaDefinie = new MessageEmbed()
            .setColor(0x660099)
            .setTitle('AvA définie :')
            .setDescription(`**Lieu :** ${lieu[1]}   **Date :** ${jour}/${mois}   **Horaire :** ${heure}h${minute}`)
            /*.addFields({name: `\u200B`, value:``, inline: true},
            {name: '\u200B', value: `**Date :** ${jour}/${mois}`, inline: true},
            {name: '\u200B', value :`**Horaire :** ${heure}h${minute}`},)*/
            .addFields( 
            {name: '\u200B', value :`**Tag à :** ${heureTag}h${minuteTag}`, inline: true},
            );

        message.channel.send({embeds : [embedAvaDefinie]})

        //Faire la modification pour que ça tag un rôle AvA
        cron.schedule(`${minuteTag} ${heureTag}-1 ${jour} ${mois} ${date.getDay()}`, () => {
            message.channel.send(`<@&1039867296195280916>`)
        })
    }
}
