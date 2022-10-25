const {horodatage}=require('../../models/index');

module.exports = {
    name : 'channel',
    run: (client, message, args) => {
        require('../../variables');

        if (gameMaster.indexOf(message.author.id) == -1) return;

        horodatage.find({id : "channel"}, function (err, docs) {
            if(docs==0){
            const createHorodatage = new horodatage({id: "channel", heure: message.channel.id});
            createHorodatage.save()
            salonDeJeu = message.channel.id;
            message.channel.send(`Le salon de jeu a été réglé sur : <#${message.channel.id}>`)
            return;
            } else {
            horodatage.updateOne({_id : docs[0]._doc._id}, {$set: {heure: message.channel.id}}).then(console.log(`L'id du salon de jeu a été modifié`))
            salonDeJeu = message.channel.id;
            message.channel.send(`Le salon de jeu a été réglé sur : <#${message.channel.id}>`)
            }
        })

    }
}