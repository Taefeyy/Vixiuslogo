const { MessageEmbed } = require('discord.js');

module.exports = {
    name : 'guildMemberUpdate',
    once: false,
    execute(client, oldMember, newMember, message){

            // If the role(s) are present on the old member object but no longer on the new one (i.e role(s) were removed)
            const removedRoles = oldMember.roles.cache.filter(role => !newMember.roles.cache.has(role.id));
            if (removedRoles.size > 0) {
                //console.log(`The roles ${removedRoles.map(r => r.name)} were removed from ${oldMember.displayName}.`);
            }
        
            // If the role(s) are present on the new member object but are not on the old one (i.e role(s) were added)
            const addedRoles = newMember.roles.cache.filter(role => !oldMember.roles.cache.has(role.id));
            if (addedRoles.size > 0) {
                //console.log(`The roles ${addedRoles.map(r => r.name)} were added to ${oldMember.displayName}.`);
                if(addedRoles.map(r => r.id) == "1039305312936665169" ){
                    const embedMembre = new MessageEmbed()
                    .setColor(0x660099)
                    .setTitle('Bienvenue!')
                    .setDescription(`Maintenant que tu es passé(e) membre de la guilde Vixius, nous t'invitons à lire ces différents salons :`)
                    .addFields({name: 'Alliance :', value:'『📌』règlement-alliance'},
                    {name: 'Guilde :', value: '『📌』règlement-perco'},
                    {name: 'Choix de rôle :', value: '『📜』vixius'}
                    )
                    .setImage('https://i.imgur.com/sD6hnCz.png')
                    newMember.send({embeds : [embedMembre]})
                }
            }
    }
}