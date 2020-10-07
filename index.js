const Discord = require('discord.js')
const { config } = require("dotenv");
const ytdl = require('ytdl-core')
config({
    path: __dirname + '/.env'
});

const client = new Discord.Client();

client.once('ready', () => {
    console.log('lofi bot is ready ( U w U )');
})

client.once('disconnect', () => {
    console.log('lofi bot disconnect ( u _ u )');
})

connections_pool = {}

client.on('message', async message => {
    if (message.content === "play lofi") {
        const vChannel = message.member.voice.channel
        if (vChannel) {
            try {
                message.channel.startTyping()
                message.delete()
                message.channel.send("Try")
                .then(message => message.edit("Try to"))
                .then(message => message.edit("Try to werax"))
                .then(message => message.edit("Try to werax (U w U)"))
                .then((message) => setTimeout(() => message.delete(), 2000))
                message.channel.stopTyping()

                var connection = await vChannel.join()
                
                connections_pool[vChannel.id] = connection
                console.log(connections_pool);

                connection.play(ytdl("https://www.youtube.com/watch?v=5qap5aO4i9A"))
                .on('finish', () => message.channel.send("Goowdbye (u _ u)"))
                .on('error', () => message.channel.send("Goowdbye (u _ u)"))
                connection.dispatcher.setVolume(0.3);
                console.log();
                
                process.on('SIGINT', function() {
                    console.log("Caught interrupt signal");
                    connection.disconnect()
                    process.exit();
                });

            } catch (e) {
                console.log(e);
                connection.disconnect()
            }
        } else {
            message.channel.startTyping()
            message.channel.send("Pwease sit in woice chawnel (U w -)")
            .then((msg) => setTimeout(() => msg.delete(), 2000))
            message.channel.stopTyping()
        }
    }
    if (message.content === "stop lofi") {
        const vChannel = message.member.voice.channel
        if (vChannel) {
            connections_pool[vChannel.id].disconnect()
            message.channel.send("Owkey (T o T)")
            .then((msg) => {
                setTimeout(() => msg.delete(), 2000)
                message.delete() 
            })

        }
    }
})

client.login(process.env.TOKEN)