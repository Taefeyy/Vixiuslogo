const { MessageEmbed } = require('discord.js');

module.exports = {
    name : 'help',
    run: (client, message, args) => {
        require('../../variables');

        const embedHelpPlayer = new MessageEmbed()
        .setColor(0x00FFFF)
        .setTitle('Récapitulatif des commandes :')
        .addFields({name : '.i x', value : `Participer à l'évènement "image", x étant le nombre de l'image souhaitée.\n :warning: L'espace entre le "i" et le nombre est important.`},
        {name : '.check', value : `Verifier le temps restant entre deux participations.`},
        {name : `.recap`, value : `obtenir les diverses informations de réglage de l'évènement.`}
        )
        message.channel.send({embeds : [embedHelpPlayer]})

        if(gameMaster.indexOf(message.author.id) != -1){
            const embedHelpMJ = new MessageEmbed()
            .setColor(0x00FFFF)
            .setTitle('Récapitulatif des commandes pour les maîtres du jeu:')
            .setDescription(`Si vous recevez ce message, c'est que vous avez utilisé la commande .help et que vous faites partie de la liste des maîtres du jeu.`)
            .addFields({name: `.add`, value: `Ajouter un MJ à la liste.\n :warning: Ne peut être utilisé que par le propriétaire du discord.`},
            {name : `.del`, value: `Supprimer un MJ de la liste.\n :warning: Ne peut être utilisé que par le propriétaire du discord.`},
            {name : `.channel`, value : `Permet de définir un salon de jeu.`},
            {name: `.interval X`, value: `Permet de définir l'intervalle entre deux participations, en minutes.\n :warning: L'espace entre "interval" et le nombre est important.`},
            {name: `.time`, value: `Permet de définir le temps de réponse, en secondes.\n :warning: L'espace entre "time" et le nombre est important.`},
            {name: `.imageon`, value: `Permet de démarrer l'évènement "image."`},
            {name: `.imageoff`, value: `Permet de clore l'évènement "image."`},
            {name: `.remove`, value: `Active/désactive la suppression d'image après la fin du temps imparti.`}
            )

            message.author.send({embeds : [embedHelpMJ]})
        }
    }
}