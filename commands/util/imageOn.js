const {horodatage}=require('../../models/index');

module.exports = {
    name : 'imageon',
    run: (client, message, args) => {
        require('../../variables');

        //Vérif si l'utilisateur fait partie des admins
        if (gameMaster.indexOf(message.author.id) == -1) return;

        horodatage.find({id : "onoff"}, function (err, docs) {
            if(docs==0){
            const createHorodatage = new horodatage({id: "onoff", heure: 1});
            createHorodatage.save()
            imageOnOff = 1;
            message.channel.send("Ouverture des jeux! Puisse le sort vous être favorable...")
            return;
            } else {
            if(docs[0]._doc.heure == 1){
            message.channel.send("Il semblerait que l'évènement ai déjà commencé.")
            return;
            }
            horodatage.updateOne({_id : docs[0]._doc._id}, {$set: {heure: 1}}).then(console.log(`Etat d'event modifié`))
            imageOnOff = 1;
            message.channel.send("Ouverture des jeux! Puisse le sort vous être favorable...")
            }
        })
    }
}