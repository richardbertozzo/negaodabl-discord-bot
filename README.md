# negaodabl-discord-bot
Bot para o [Discord](https://discord.com/new) para aperta a braba.

Reproduz áudios engraçados e brabos do Negão da BL. 🎵 Mery pfff 🎵 Aperta braba 🎵

Todos os áudios são do brabo [MC Negão da BL](https://www.youtube.com/channel/UCUlU4ipnSw0JCX2j7VI0FGg).

## Commands

O bot tem apenas o comando que é: 
Prefix: `negaodabl`

- `negaodabl [help]` ou `negaodabl` - mostra comandos disponiveis
- `negaodabl [option]` - reproduz o áudio da opção escolhida
- `negaodabl random` - reproduz um áudio aleatório

Exemplos: 
```shell
negaodabl braba
```

## Hacktoberfest da Bl
![hacktober](./hacktoberfestdabl.png)

Repo aberto para novos comandos criados pela comunidade.

Crie sua ideia nas issues para melhor organização.

## Developing

You're going to need [Node.js](https://nodejs.org/en/) or [Docker](https://docs.docker.com/desktop/) installed.

1. Node.js

First install all dependencies:
```shell
$ npm i
```

Start the bot:
```shell
$ npm start
```

2. Docker

Build:

```shell
$ docker build -t negaodabl .
```

Run:

```shell
$ docker run negaodabl
````

### Adicionando novos audios ou comandos

Todos áudios disponíveis estão no folder `audios` e existe um Map com todos os comandas dos áudios no `index.js`.