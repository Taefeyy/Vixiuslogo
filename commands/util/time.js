const {horodatage}=require('../../models/index');

module.exports = {
    name : 'time',
    run: (client, message, args) => {
        //Besoin de la liste des mj pour ça
        require('../../variables');

        if (gameMaster.indexOf(message.author.id) == -1) return;

        var temps = message.content.match(/\d+/)*1000;

        horodatage.find({id : "time"}, function (err, docs) {
            if(docs==0){
            const createHorodatage = new horodatage({id: "time", heure: temps});
            createHorodatage.save()
            t = temps;
            message.channel.send(`Vous avez réglé le temps de réponse sur : ${temps/1000} secondes.`)
            return;
            } else {
            horodatage.updateOne({_id : docs[0]._doc._id}, {$set: {heure: temps}}).then(console.log(`Valeur de temps de réponse modifiée`))
            t = temps;
            message.channel.send(`Vous avez réglé le temps de réponse sur : ${temps/1000} secondes.`)
            }
        })
    }
}