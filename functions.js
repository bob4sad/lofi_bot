module.exports = {
    pretty_send: function(message, main, emoji) {
        message.channel.send(main)
        .then((message) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => resolve(message), 1000)
            })
        })
        .then(message => message.edit(main + " " + emoji[0]))
        .then(message => message.edit(main + " " + emoji[0] + " " + emoji[1]))
        .then(message => message.edit(main + " " + emoji[0] + " " + emoji[1] + " " + emoji[2]))
        .then((message) => setTimeout(() => message.delete(), 2000))
        .then(message.delete())
        message.channel.stopTyping()
    }
}