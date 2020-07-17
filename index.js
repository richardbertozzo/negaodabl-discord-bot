const Discord = require('discord.js');
const Client = new Discord.Client();
const {
    prefix,
    token,
} = require('./config.js');

Client.on('message', async message => {
    if (message.content === prefix) {
        execute(message);
    }
});

async function execute(message) {
    // const args = message.content.split(' ');

    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) {
        return message.channel.send('You need to be in a voice channel to play music!');
    }
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
        return message.channel.send('I need the permissions to join and speak in your voice channel!');
    }

    try {
        const connection = await voiceChannel.join();
        const dispatcher = connection.play('aperta_a_braba.mp3', { volume: 0.9 });
        message.channel.send('APERTANDO A BRABA :compression: :angry:');
        dispatcher.on('end', (end) => {
            voiceChannel.leave();
        });
    } catch (err) {
        return message.channel.send('Erro em reproduzir aperta a braba');
    }
}

Client.login(token);
