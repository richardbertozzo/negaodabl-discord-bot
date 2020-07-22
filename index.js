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

const prefixAudio = './audios';
const options = new Map([
    [
        'braba', {
            command: 'braba',
            file: `${prefixAudio}/aperta_a_braba.mp3`,
            description: 'Audio de apertar a braba',
        }
    ],
    [
        'mery', {
            command: 'mery',
            file: `${prefixAudio}/aperta_a_braba.mp3`,
            description: 'Audio de mery mery pfff',
        }
    ],
    [
        'braba-russo', {
            command: 'braba-russo',
            file: `${prefixAudio}/aperta_a_braba_russo.mp3`,
            description: 'Audio de apertar a braba versão russa',
        }
    ],
    [
        'braba-ingles', {
            command: 'braba-ingles',
            file: `${prefixAudio}/aperta_a_braba_ingles.mp3`,
            description: 'Audio de apertar a braba versão inglesa',
        }
    ],
    [
        'braba-japones', {
            command: 'braba-japones',
            file: `${prefixAudio}/aperta_a_braba_japones.mp3`,
            description: 'Audio de apertar a braba versão japonesa',
        }
    ],
    [
        'braba-ratinho', {
            command: 'braba-ratinho',
            file: `${prefixAudio}/aperta_a_braba_ratinho.mp3`,
            description: 'Audio de apertar a braba versão ratinho',
        }
    ],
    [
        'bagulhodoido', {
            command: 'bagulhodoido',
            file: `${prefixAudio}/bagulho_doido.mp3`,
            description: 'Audio que o bagaulho ta doido',
        }
    ],
]);

/**
 * @param {Map<string,Object>} commands disponible commands on bot
 * 
 */
const getDoc = (commands) => {
    const description = `O bot reproduz audios do Negão da BL.
        O unico comando disponivel é \`${prefix} [option]\`, exemplo: \`${prefix} mery\`.
        **Comandos**:`;

    const HEmbed = new Discord.MessageEmbed()
        .setTitle(`Seguintes comandos disponíveis 📋:`)
        .setColor('#4a3722')
        .setDescription(description);

    commands.forEach((value, key) => {
        HEmbed.addField(`${prefix} ${value.command}`, value.description, false);
    });

    HEmbed.addField('random', 'Reproduz um audio aleatório', true);
    HEmbed.addField('help', 'Mostra a lista de comandos e opções', true);
    return HEmbed;
};

const getRandom = (options) => {
    const keys = Array.from(options.keys());
    return keys[Math.floor(Math.random() * keys.length)];
};

async function execute(message) {
    const args = message.content.split(' ');
    const option = args[1];
    if (!option || option === 'help') {
        const embed = getDoc(options);
        return message.channel.send({ split: true, embed });
    } else {
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) {
            return message.channel.send('Você precisa estar em um canal de voz para apertar a braba!');
        }

        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
            return message.channel.send('Eu preciso de permissão para ingressar e falar no canal de voz, para apertar a braba!');
        }

        let audio;
        if (option === 'random') {
            const key = getRandom(options);
            audio = options.get(key).file;
        } else {
            const opt = options.get(option);
            audio = opt.file;
        }

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

Client.login(token);
