/**
 * Botai!!!!
 */
var sentences = require('./arrays.js');
var Posts = require('../models/posts');
var mongoose = require('mongoose');
var config = require('../config');

mongoose.connect(config.database);

var getRnd = function (arr) {
    return arr[Math.round(Math.random() * (arr.length - 1))];
};

var frazes = {};
var generateFrazes = function () {
    frazes = {
        politinis: getRnd(sentences.polIntro) + ' ' +
            getRnd(sentences.veiksnys) + ' ' +
            getRnd(sentences.tarinys) + '.' +
            getRnd(sentences.polMid) + ' ' +
            getRnd(sentences.veiksnys) + ' #' +
            getRnd(sentences.veiksnys),
        vesaite: getRnd(sentences.coolIntro) + ', ' +
            getRnd(sentences.coolMid) + ', ' +
            getRnd(sentences.coolOutro) + ' ' +
            getRnd(sentences.zenklas) + ' #' +
            getRnd(sentences.hash),
        aparatas: getRnd(sentences.engIntro) + ' ' +
            getRnd(sentences.engSomething) + ' ' +
            getRnd(sentences.engFatality) + ' ' +
            getRnd(sentences.engOutro),
        sexy: 'Nuo šitos šventės man jau ' +
            getRnd(sentences.tarinys) + ' ' +
            getRnd(sentences.sexyVeiksnys) + ' ' +
            getRnd(sentences.zenklas) + ' #' +
            getRnd(sentences.sexyVeiksnys),
        zoidberg: getRnd(sentences.zoidberg1) + ', ' +
            getRnd(sentences.zoidberg2) + ' #' +
            getRnd(sentences.hash),
        grazulis:   getRnd(sentences.grazulioPriesas) + ' ir ' +
                    getRnd(sentences.asmuo) + ' ' +
                    getRnd(sentences.tarinysNow) + ' ' +
                    '#uzLietuvaVyrai',
        vytas1: getRnd(sentences.vytas).toUpperCase() + ' ' +
                getRnd(sentences.veiksnys).toUpperCase() + ' ' +
                getRnd(sentences.vytas).toUpperCase() + ' ' +
                getRnd(sentences.vytas).toUpperCase() + ' ' +
                getRnd(sentences.vytas).toUpperCase() + '!!!1!!' ,
        vytas2: getRnd(sentences.vytas).toUpperCase() + ' ' +
                getRnd(sentences.vytas).toUpperCase() + ' ' +
                getRnd(sentences.asmuo).toUpperCase() + ' ' +
                getRnd(sentences.vytas).toUpperCase() + ' ' +
                getRnd(sentences.tarinysNow).toUpperCase() + ' ' +
                getRnd(sentences.zenklas).toUpperCase(),
        vytas3: getRnd(sentences.vytas).toUpperCase() + ' bled ' +
                getRnd(sentences.vytas).toUpperCase() + ' . ' +
                getRnd(sentences.hash).toUpperCase(),
        akademinis: getRnd(sentences.akademinisPareiskimas) + ' ' +
                    getRnd(sentences.akademinisKomentaras) + ' #' +
                    getRnd(sentences.hash)
    };
};

var vesaite = {
    vardas: 'CrazyLikeAF00l',
    adresas: '@staycool',
    paternai: ['politinis', 'vesaite'],
    avataras: 'assets/avatars/bots/cool.png'
};

var aparatas = {
    vardas: 'AparatusInsanis',
    adresas: '@kolukiopraimas',
    paternai: ['politinis', 'aparatas', 'sexy'],
    avataras: 'assets/avatars/bots/aparatas2.png'
};

var zoidberg = {
    vardas: 'drZoidberg',
    adresas: '@realdoctor',
    paternai: ['zoidberg'],
    avataras: 'assets/avatars/bots/doctor.png'
};

var grazulis = {
    vardas: 'Gražu0lis',
    adresas: '@cutiepie',
    paternai: ['politinis', 'sexy', 'grazulis'],
    avataras: 'assets/avatars/bots/grazulis.png'
};

var henyte = {
    vardas: 'heniukas1',
    adresas: '@thezone',
    paternai: ['akademinis'],
    avataras: 'assets/avatars/bots/henyte.png'
};

var pitreniene = {
    vardas: 'OhDrone906090',
    adresas: '@antakiaimarkeriu',
    paternai: ['politinis', 'akademinis', 'sexy'],
    avataras: 'assets/avatars/bots/morda.png'
};

var rasputinas = {
    vardas: 'Lonely1917',
    adresas: '@SeksasPriesSantuoka',
    paternai: ['akademinis'],
    avataras: 'assets/avatars/bots/rasputin.png'
};

var nosferatu = {
    vardas: 'Yesferatu',
    adresas: '@4evayoung',
    paternai: ['akademinis', 'sexy'],
    avataras: 'assets/avatars/bots/yesferatu.png'
};

var zamolskis = {
    vardas: 'ZamolskiuRomas',
    adresas: '@visur',
    paternai: ['akademinis'],
    avataras: 'assets/avatars/bots/ZamolskiuRomas.png'
};

var vytas = {
    vardas: 'VytasTaksiKaune',
    adresas: '@salinpedikus',
    paternai: ['akademinis', 'vytas1', 'vytas2', 'vytas3'],
    avataras: 'assets/avatars/bots/vytas.png'
};

var rektorius = {
    vardas: 'JoMagnificencija',
    adresas: '@cr.vu.lt',
    paternai: ['akademinis'],
    avataras: 'assets/avatars/bots/zukauskas.png'
};

var jonka = {
    vardas: 'JonkaSuTavimi',
    adresas: '@gvoltavonesKasnakt',
    paternai: ['akademinis', 'sexy'],
    avataras: 'assets/avatars/bots/jonka.png'
};

var augustinas = {
    vardas: 'AugustinaSSS',
    adresas: '@jausmoprotas',
    paternai: ['augustinas'],
    avataras: 'assets/avatars/bots/augustus.png'
};

/////////////////////////////////////////////////////

var personazai = [
    vesaite,
    aparatas, aparatas, aparatas,
    zoidberg,
    grazulis, grazulis,
    henyte,
    pitreniene, pitreniene,
    rasputinas,
    nosferatu,
    zamolskis,
    vytas, vytas,
    rektorius, rektorius,
    jonka
];

/*augustinas*/

////////////////////////////////////////////////////

var botPost = function () {
    generateFrazes();

    var bot = getRnd(personazai);
    bot.message = frazes[getRnd(bot.paternai)];

    if(bot.message) {
        var botoPostas = new Posts({
            username: bot.adresas + '/' + bot.vardas,
            message: bot.message,
            avatar: bot.avataras
        });

        botoPostas.save(function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log(bot);
            }
        });
    } else {
        console.log('ERROR: ' + JSON.stringify(bot, null, 4));
    }
};

////////////////////////////////////////////////////

botPost();

////////////////////////////////////////////////////

var interval = setInterval(botPost, 1000 * 60 + 7);