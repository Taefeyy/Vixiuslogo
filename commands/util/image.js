const {horodatage}=require('../../models/index');
var fs = require('fs');

module.exports = {
    name : 'i',
    run: (client, message, args) => {
        require('../../variables');
        const d = new Date();

        //Si le bot gère déjà une image, on n'éxécute rien
        if (occupe != 0) return;

        //Relevé du numéro de l'image voulue
        numero = message.content.match(/\d/g)

        //S'il y a une erreur dans la commande, on arrête
        if (!numero) return;
        numero = numero.join('');

        //Vérification si un salon a été définit
        if (salonDeJeu == 0) return message.channel.send(`Aucun salon n'a été défini.`);

        //Vérification si on est dans le bon salon
        if (salonDeJeu != message.channel.id) return message.channel.send(`Vous devriez essayer dans : <#${salonDeJeu}>.`)

        //Vérification que la temporisation de réponse n'est pas à 0
        if (t == 0) return message.channel.send(`La temporisation n'a pas été définie.`);

        //Vérification si l'event a commencé
        if (imageOnOff == 0) return message.channel.send(`L'évènement n'a pas encore commencé.`)

        //Envoie de l'image + gestion du chronomètre
        try{
            content = fs.readFileSync(`./images/${numero}.png`);
        } catch (error) {
            message.channel.send(`Veuillez essayer un nombre différent.`);
            return;
        }
        
        //Gestion de l'intervalle
        horodatage.find({id : message.author.id}, function (err, docs) {
            //Joueur absent de la DB
            if(docs.length === 0){
                const createHorodatage = new horodatage({id: message.author.id, heure: d.getTime()});
                createHorodatage.save()

            } else {

                //Interval pas encore écoulé
                if(d.getTime() - docs[0]._doc.heure < interval){

                    //Message de réponse avec le temps restant
                    message.channel.send(`Vous devez encore patienter.`)
                    return;
                }
            }

            //Interval écoulé
            if(d.getTime() - docs[0]._doc.heure >= interval){
                occupe = 1
                message.channel.send({files: [`./images/${numero}.png`]}).then((chrono) =>{

                    var temps2 = setInterval(function(){
                        chrono.edit("Temps : "+((t/1000)-y)+" secondes"); 
                        y += 1;
                        if (y > t/1000 ) {
        
                            message.channel.send("Temps écoulé.");
                            //Mise à jour de la dernière heure de jeu du joueur
                            horodatage.updateOne({_id : docs[0]._doc._id}, {$set: {heure: d.getTime()}}).then(console.log(`Modification faite`))
                            for (let mj = gameMaster.length-1; mj >= 0; mj--){
                                message.channel.send(`<@`+gameMaster[mj]+">")
                            }
                            y = 0;
                            if (remove == 1){
                                chrono.delete();
                            } 
                            clearInterval(temps2);
                            occupe=0;
                            return;
                        }
        
                    }, 1000);
        
                })
            }
        })
     }
}