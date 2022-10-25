const {horodatage}=require('../../models/index');

module.exports = {
    name : 'remove',
    run: (client, message, args) => {
        require('../../variables');

        if (gameMaster.indexOf(message.author.id) == -1) return;


        horodatage.find({id : "remove"}, function (err, docs) {
            if(docs==0){
            const createHorodatage = new horodatage({id: "remove", heure: 1});
            createHorodatage.save()
            message.channel.send(`Les images seront supprimées après chacune des participations.`)
            remove = 1;
            return;
            } else {
            if(docs[0]._doc.heure == 1){
            horodatage.updateOne({_id : docs[0]._doc._id}, {$set: {heure: 0}}).then(console.log(`L'id du salon de jeu a été modifié`))
            message.channel.send(`Les images ne seront pas supprimées après chacune des participations.`)
            remove = 0;
            }
            if(docs[0]._doc.heure == 0){
            horodatage.updateOne({_id : docs[0]._doc._id}, {$set: {heure: 1}}).then(console.log(`L'id du salon de jeu a été modifié`))
            message.channel.send(`Les images seront supprimées après chacune des participations.`)
            remove = 1;
            }
            }
        })
    }
}