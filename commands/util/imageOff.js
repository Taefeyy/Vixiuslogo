const {horodatage}=require('../../models/index');

module.exports = {
    name : 'imageoff',
    run: (client, message, args) => {
        require('../../variables');

        //Vérif si l'utilisateur fait partie des admins
        if (gameMaster.indexOf(message.author.id) == -1) return;

        horodatage.find({id : "onoff"}, function (err, docs) {
            if(docs==0){
            const createHorodatage = new horodatage({id: "onoff", heure: 0});
            createHorodatage.save()
            imageOnOff = 0;
            message.channel.send("Fermeture des jeux!")
            return;
            } else {
            if(docs[0]._doc.heure == 0){
            message.channel.send("Il semblerait que l'évènement ait déjà été clos.")
            return;
            }
            horodatage.updateOne({_id : docs[0]._doc._id}, {$set: {heure: 0}}).then(console.log(`Etat d'event modifié`))
            imageOnOff = 0;
            message.channel.send("Fermeture des jeux!")
            }

        })
    }
}