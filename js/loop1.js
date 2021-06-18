const sim = {
    'dance': '<img class="portfolio__card-text-sim" src="./img/icons/emojis/dance.gif" alt=":dance:" title=":dance:">',
    'kaif': '<img class="portfolio__card-text-sim" src="./img/icons/emojis/kaif.png" alt=":kaif:" title=":kaif:">',
    'ringed_planet': '<img class="portfolio__card-text-sim" src="./img/icons/emojis/ringed_planet.png" alt=":ringed_planet:" title=":ringed_planet:">',
    'dog1': '<img class="portfolio__card-text-sim" src="./img/icons/emojis/dog1.gif" alt=":dog1:" title=":dog1:">',
    'dog2': '<img class="portfolio__card-text-sim" src="./img/icons/emojis/dog2.gif" alt=":dog2:" title=":dog2:">',
    'dog3': '<img class="portfolio__card-text-sim" src="./img/icons/emojis/dog3.gif" alt=":dog3:" title=":dog3:">',
    'cryrage': '<img class="portfolio__card-text-sim" src="./img/icons/emojis/cryrage.png" alt=":cryrage:" title=":cryrage:">',
    'russianbaby': '<img class="portfolio__card-text-sim" src="./img/icons/emojis/russianbaby.png" alt=":russianbaby:" title=":russianbaby:">',
    'flushed': '<img class="portfolio__card-text-sim" src="./img/icons/emojis/flushed.png" alt=":flushed:" title=":flushed:">',
    'smirk': '<img class="portfolio__card-text-sim" src="./img/icons/emojis/smirk.png" alt=":smirk:" title=":dogsmirk3:">',
    'owner': '<div class="tooltip"><img class="portfolio__card-text-sim" src="./img/icons/badges/owner.png" alt=":owner:" title=":owner:"><span class="tooltiptext">Владелец сайта</span></div>',
    'bug-hunter': '<div class="tooltip"><img class="portfolio__card-text-sim" src="./img/icons/badges/bug-hunter.png" alt=":bug-hunter:" title=":bug-hunter:"><span class="tooltiptext">Искатель багов</span></div>',
    'customer': '<div class="tooltip"><img class="portfolio__card-text-sim" src="./img/icons/badges/customer.png" alt=":customer:" title=":customer:"><span class="tooltiptext">Покупатель</span></div>',
    'banana': '<div class="tooltip"><img class="portfolio__card-text-sim" src="./img/icons/badges/banana.png" alt=":customer:" title=":banana:"><span class="tooltiptext">Уник ёмаё</span></div>',
}

const profile = {
    defColor: '#7f78bd',
    1: {
        name: `${sim['customer']} Geger 🏳️‍🌈`,
        description: `Хочу тульский пряник <br>${sim['dance']}`,
        icon: './img/avatars/geger.gif',
        buttonShare: { link: 'https://twitch.tv/geger', title: 'Скопировать ссылку на twitch' },
        date: 'Дружище',
        bg: '',
        color: 'violet',
        button: { title: 'Twitch', link: 'https://twitch.tv/geger', color: '#8161db' }
    },
    2: {
        name: `${sim['bug-hunter']} FexHub`,
        description: `FexHub - сервер твоей мечты`,
        icon: 'https://cdn.discordapp.com/icons/714911198306369566/a_22a87c9a5b8c4a6ba0e21cc1a30d9345.gif?size=1024',
        buttonShare: { link: 'https://discord.gg/fexhub', title: 'Скопировать ссылку на Discord сервер' },
        date: 'Дружище',
        bg: '',
        color: '#00e8ff',
        button: { title: 'Вступить', link: 'https://discord.gg/fexhub', color: '#0097ff' }
    },
    3: {
        name: 'Yakov Helper Community',
        description: `Сервер технической поддержки Yakov Helper'a`,
        icon: 'https://cdn.discordapp.com/attachments/792456475217362964/854438186310828082/ae19fc21f642edeca5586b98831743e4.jpg',
        buttonShare: { link: 'https://discord.gg/poland', title: 'Скопировать ссылку на Discord сервер' },
        date: 'Дружище',
        bg: '',
        color: '#ff0a25',
        button: { title: 'Вступить', link: 'https://discord.gg/poland', color: '#ff0a25' }
    },
    4: {
        name: `${sim['owner']} ZippWitch `,
        description: `опятьходятчтотомутят<br>${sim['dog1']}${sim['dog2']}${sim['dog2']}${sim['dog2']}${sim['dog2']}${sim['dog2']}${sim['dog3']}`,
        icon: './img/avatars/zippwitch.gif',
        buttonShare: { link: 'https://learn.javascript.ru', title: 'Скопировать ссылку на @&%' },
        date: 'Адмен',
        bg: 'url(./img/bgs/ZippWitch.jpg)',
        bgHead: '',
        color: '#5c456d',
        button: { title: 'Портфолио', link: './portfolio', color: '#5c456d70' }
    },
    5: {
        name: 'Kiriz#4456',
        description: `Я пишу на Lua, помогите`,
        icon: 'https://cdn.discordapp.com/avatars/646718665559113759/ef735ebde92348f0202d23b6bf861cac.png?size=2048',
        buttonShare: { link: 'Kiriz#4456', title: 'Скопировать Discord тег' },
        date: 'Дружище',
        bg: '',
        color: '#8b8b8b',
        button: { title: 'Github', link: 'https://github.com/Kiriz01', color: '' }
    },
    6: {
        name: `${sim['bug-hunter']} Luminity`,
        description: `Лучший сервер`,
        icon: './img/avatars/radeon.png',
        buttonShare: { link: 'https://discord.gg/radeon', title: 'Скопировать ссылку на Discord сервер' },
        date: 'Дружище',
        bg: 'url(./img/avatars/radeon.png)',
        color: '#dd3f55',
        button: { title: 'Вступить', link: 'https://discord.gg/radeon', color: '#dd3f55' }
    },
    7: {
        name: 'List&ltDemetry>🐾',
        description: `${sim['ringed_planet']} Сатурн-шиза`,
        icon: 'https://cdn.discordapp.com/avatars/641299259747991592/df0bdc3881921bfcf94ddc7ffeab1421.png?size=2048',
        buttonShare: { link: 'https://discord.gg/T8we7sYnCN', title: 'Скопировать ссылку на Discord сервер' },
        date: 'Дружище',
        bg: '',
        color: '#3395db',
        button: { title: 'Вступить', link: 'https://discord.gg/T8we7sYnCN', color: '#3395db' }
    },
    8: {
        name: `${sim['banana']} алех даббер`,
        description: `Сильная${sim['russianbaby']}независимая${sim['flushed']}женщина${sim['cryrage']}с_прекрасным_голосом${sim['smirk']}`,
        icon: './img/avatars/алех.gif',
        bg: '',
        color: '',
        button: { title: 'Вступить', link: 'https://discord.gg/T8we7sYnCN', color: '#3395db' }
    },
}

let code = '';
for (let i = 1; i <= Object.keys(profile).length - 1; i++) {
    code = code + `
    <div class="col">
                                    <div style="border-color: ${profile[i].color !== '' ? profile[i].color : profile.defColor}; background: ${profile[i].bg || '#202230'} no-repeat; background-size: cover;" class="portfolio__card new-portfolio__card card__team">
                                        <div class="portfolio__card-head">
                                        </div>
                                        <div class="padd" style="position: relative;">
                                            <img src="${profile[i].icon}" onerror="this.src='./img/avatars/avatar.gif'"
                                                width="110" height="110"
                                                style="border-radius: 20%; border: 2px solid ${profile[i].color !== '' ? profile[i].color : profile.defColor}; margin-bottom: 15px; margin-top: 10px; background-color: rgb(33 37 41);"
                                                loading="lazy">
                                            <h5 class="portfolio__card-title">
                                                <a href="${profile[i].button.link}"
                                                    class="hoverable partner-va">${profile[i].name}</a><br><span style="margin-top: 10px;"
                                            </h5>
                                        </div>
                                        <div class="portfolio__card-bd">
                                            <p class="portfolio__card-text">${profile[i].description}</p>
                                        </div>
                                    </div>
                                </div>
    
    `
}
document.write(code)