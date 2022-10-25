const {horodatage}=require('../../models/index');

module.exports = {
    name : 'interval',
    run: (client, message, args) => {
        //Besoin de la liste des mj pour ça
        require('../../variables');

        if (gameMaster.indexOf(message.author.id) == -1) return;

        var intervalDB = message.content.match(/\d+/)*60000;

        horodatage.find({id : "interval"}, function (err, docs) {
            if(docs==0){
            const createHorodatage = new horodatage({id: "interval", heure: intervalDB});
            createHorodatage.save()
            interval = intervalDB;
            message.channel.send(`Vous avez défini l'intervalle sur : ${intervalDB/60000} minutes.`)
            return;
            } else {
            horodatage.updateOne({_id : docs[0]._doc._id}, {$set: {heure: intervalDB}}).then(console.log(`Valeur d'intervalle modifiée`))
            interval = intervalDB;
            message.channel.send(`Vous avez défini l'intervalle sur : ${intervalDB/60000} minutes.`)
            }
        })
    }
}