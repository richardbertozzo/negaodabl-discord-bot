const Discord = require('discord.js');
const Client = new Discord.Client();
const {
    prefix,
    token,
} = require('./config.js');

Client.on('message', async message => {
    if (message.content.startsWith(prefix)) {
        execute(message);
    }
});

async function execute(message) {
    const args = message.content.split(' ');
    const option = args[1];
    if (!option || option === 'help') {
        return message.channel.send([
            'Bot 🤖 Negão da BL tem os seguintes comandos 📋:',
            '`negaodabl mery`',
            '`negaodabl apertaabraba`',
            '`negaodabl bagulhodoido`',
        ]);
    } else {
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) {
            return message.channel.send('Você precisa estar em um canal de voz para apertar a braba!');
        }

        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
            return message.channel.send('Eu preciso de permissão para ingressar e falar no canal de voz, para apertar a braba!');
        }

        const audio = getAudio(option);
        try {
            const connection = await voiceChannel.join();
            const dispatcher = connection.play(audio, { volume: 0.9 });
            message.channel.send('APERTANDO A BRABA :compression: :angry:');

            dispatcher.on('finish', () => {
                voiceChannel.leave();
            });
        } catch (err) {
            console.log(err);
            voiceChannel.leave();
            return message.channel.send('Erro em apertar a braba!');
        }
    }
}

const getAudio = (arg) => {
    const prefix = './audios';
    switch (arg) {
        case 'apertaabraba':
            return `${prefix}/aperta_a_braba.mp3`;
        case 'bagulhodoido':
            return `${prefix}/bagulho_doido.mp3`;
        case 'apertaabraba-ingles':
            return `${prefix}/aperta_a_braba_ingles.mp3`;
        case 'apertaabraba-russo':
            return `${prefix}/aperta_a_braba_russo.mp3`;
        case 'apertaabraba-japones':
            return `${prefix}/aperta_a_braba_japones.mp3`;
        case 'apertaabraba-ratinho':
            return `${prefix}/aperta_a_braba_ratinho.mp3`;
        default:
            return `${prefix}/mery.mp3`;
    }
};

Client.login(token);
