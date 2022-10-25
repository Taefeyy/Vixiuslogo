const { mj } = require('../../models/index');

module.exports = {
    name : 'del',
    run: (client, message, args) => {
        require('../../variables');

        if (message.author.id === "250235506288361472" && message.mentions.users.first()){   
            mj.find({id : message.mentions.users.first().id}, function (err, docs) {
                if (docs != 0){
                    if (gameMaster.indexOf(message.mentions.users.first().id) != -1){
                        gameMaster.splice(gameMaster.indexOf(message.mentions.users.first().id, 1));
                    }
                mj.deleteOne({id : message.mentions.users.first().id}).then(console.log("L'utilisateur a été supprimé "))
                message.channel.send("L'utilisateur a été supprimé.")
                }
                if (docs == 0){
                message.channel.send("L'utilisateur ne fait pas partie de la liste");
                }
            })
    }
        } 
}