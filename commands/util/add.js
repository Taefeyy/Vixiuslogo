const { mj } = require('../../models/index');

module.exports = {
    name : 'add',
    run: (client, message, args) => {
        require('../../variables');

        if (message.author.id === "250235506288361472" && message.mentions.users.first()){        

            mj.find({id : message.mentions.users.first().id}, function (err, docs) {
                if(docs==0){
                const createMj = new mj({id: message.mentions.users.first().id});
                createMj.save()
                if (gameMaster.indexOf(message.mentions.users.first().id) == -1){
                    gameMaster.push(message.mentions.users.first().id)
                }
                message.channel.send(`${message.mentions.users.first()} a bien été ajouté à la liste des maîtres du jeu.`)
                return;
                } else {
                message.channel.send(`Cet utilisateur fait déjà partie de la liste des maîtres du jeu.`)
                }
            })
        }
        }
    }