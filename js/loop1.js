const sim = {
    'dance': '<img class="portfolio__card-text-sim" src="./img/icons/dance.gif" alt=":dance:" title=":dance:">',
    'kaif': '<img class="portfolio__card-text-sim" src="./img/icons/kaif.png" alt=":kaif:" title=":kaif:">',
    'ringed_planet': '<img class="portfolio__card-text-sim" src="./img/icons/ringed_planet.png" alt=":ringed_planet:" title=":ringed_planet:">',
    'dog1': '<img class="portfolio__card-text-sim" src="./img/icons/dog1.gif" alt=":dog1:" title=":dog1:">',
    'dog2': '<img class="portfolio__card-text-sim" src="./img/icons/dog2.gif" alt=":dog2:" title=":dog2:">',
    'dog3': '<img class="portfolio__card-text-sim" src="./img/icons/dog3.gif" alt=":dog3:" title=":dog3:">',
}

const profile = {
    defColor: '#7f78bd',
    1: {
        name: 'Geger 🏳️‍🌈',
        description: `Хочу тульский пряник <br>${sim['dance']}`,
        icon: './img/avatars/geger.gif',
        buttonShare: { link: 'https://twitch.tv/geger', title: 'Скопировать ссылку на twitch' },
        date: 'Дружище',
        bg: '',
        color: 'violet',
        button: { title: 'Twitch', link: 'https://twitch.tv/geger', color: '#8161db' }
    },
    2: {
        name: 'FexHub',
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
        name: 'ZippWitch',
        description: `Разработчик сайта <br>${sim['dog1']}${sim['dog2']}${sim['dog2']}${sim['dog2']}${sim['dog2']}${sim['dog2']}${sim['dog3']}`,
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
        name: 'Luminity',
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
                                                alt="${profile[i].name}" loading="lazy">
                                            <div class="badge_icon"></div>
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