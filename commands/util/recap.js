const { MessageEmbed } = require('discord.js');

module.exports = {
    name : 'recap',
    run: (client, message, args) => {
        require('../../variables');
        if (imageOnOff == 1){
            etat = "On";
        } else {
            etat = "Off";
        };
        if (remove == 1){
            etat1 = "On";
        } else {
            etat1 = "Off";
        };
        
        
        const embedtest = new MessageEmbed()
        .setColor(0x00FFFF)
        .setTitle('Récapitulatif :')
        .setDescription(`Etat de l'évènement \"Image\" : ${etat}\nSuppression des images : ${etat1}\nIntervalle de participation : ${interval/60000} minutes\nTemps de réponse : ${t/1000} secondes\nSalon : <#${salonDeJeu}>`)
        embedtest.addField("Maitre du jeu :", `<@${gameMaster[gameMaster.length-1]}>`, false)
        for (let mj = gameMaster.length-2; mj >=0 ; mj--) {
        embedtest.addField("\u200b", `<@${gameMaster[mj]}>`, false)
        }

        message.channel.send({embeds : [embedtest]})
        }
    
};