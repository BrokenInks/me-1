const sim = {
    'js': '<img class="portfolio__card-text-sim" src="./img/icons/JavaScript.svg" alt=":js:" title=":js:">',
    'nodejs': '<img class="portfolio__card-text-sim" src="./img/icons/node-js.svg" alt=":nodejs:" title=":nodejs:">',
    'discord': '<img class="portfolio__card-text-sim" src="./img/icons/Discord.svg" alt=":discord:" title=":discord:">',
    'youtube': '<img class="portfolio__card-text-sim" src="./img/icons/YouTube.svg" alt=":youtube:" title=":youtube:">',
    'soundcloud': '<img class="portfolio__card-text-sim" src="./img/icons/SoundCloud.svg" alt=":soundcloud:" title=":soundcloud:">',
}

const profile = {
    defColor: '#7f78bd',
    1: {
        name: 'Music или mod discord бот на заказ',
        description: `Модератор-бот на ${sim['nodejs']}
<br>Музыкальный-бот на ${sim['nodejs']}`,
        icon: './img/avatars/1.gif',
        buttonShare: { link: 'https://zippw.github.io/me/items/buy-3.html', title: 'Купить скрипт бота' },
        date: 'Услуга',
        bg: 'bg1.jpg',
        color: '',
        button: { title: '499₽', link: './items/buy-3.html', color: '#3ba55c' }
    },
    2: {
        name: 'FN bot#0209',
        description: `Мультифункциональный односерверный бот на ${sim['nodejs']}, в которого входят: 65+ команд для модерации/музыки/фана...`,
        icon: 'https://cdn.discordapp.com/avatars/674942800894361611/568429c0828ceabc102df5dd5617d907.webp?size=4096',
        buttonShare: { link: 'https://zippw.github.io/me/items/buy-1.html', title: 'Купить скрипт бота' },
        date: 'Дата: 3/4/2021',
        bg: 'bg1.jpg',
        color: '',
        button: { title: '1999₽', link: './items/buy-1.html', color: '#3ba55c' }
    },
    3: {
        name: 'Slash bot#3799',
        description: `Slash бот с глобальными командами на ${sim['nodejs']}, который включает в себя несколько команд <br>новейшего хэндлера...`,
        icon: 'https://cdn.discordapp.com/avatars/783995245075103744/405ff76ecd30ee7943f29023d59eea22.webp?size=4096',
        buttonShare: { link: 'https://zippw.github.io/me/items/buy-2.html', title: 'Купить скрипт бота' },
        date: 'Дата: 7/05/2021',
        bg: 'bg1.jpg',
        color: '',
        button: { title: '199₽', link: './items/buy-2.html', color: '#3ba55c' }
    },
    4: {
        name: 'Альбом Выва | 2021',
        description: `4 трека;<br>площадка ${sim['youtube']}`,
        icon: './img/avatars/soundcloud_avatar.jpg',
        buttonShare: { link: 'https://youtube.com/playlist?list=PL2KqJq9LIGN7q1zGbuYIi5jXvtamjrseQ', title: 'Перейти на YouTube плейлист' },
        date: 'Дата: 23/4/2021',
        bg: 'bg2.jpg',
        color: '',
        button: { title: 'YouTube', link: 'https://youtube.com/playlist?list=PL2KqJq9LIGN7q1zGbuYIi5jXvtamjrseQ', color: '#ff0000' }
    },
    5: {
        name: 'Альбом Выва | 2021',
        description: `4 трека; <br>площадка: ${sim['soundcloud']}`,
        icon: './img/avatars/soundcloud_avatar.jpg',
        buttonShare: { link: 'https://soundcloud.com/valeriy-is-bro-vp/sets/2-1', title: 'Перейти на SoundCloud плейлист' },
        date: 'Дата: 23/4/2021',
        bg: 'bg2.jpg',
        color: '',
        button: { title: 'SoundCloud', link: 'https://soundcloud.com/valeriy-is-bro-vp/sets/2-1', color: '#ff7400' }
    }
}

let code = '';
for (let i = 1; i <= Object.keys(profile).length - 1; i++) {
    code = code + `
    <div class="col">
                                    <div style="box-shadow: inset 0px 0px 250px rgba(0,0,0,1); background: url(./img/bgs/${profile[i].bg}) no-repeat; background-size: cover; border-color: ${profile[i].color ? profile[i].color : profile.defColor}" class="portfolio__card new-portfolio__card card__portfolio">
                                        <div class="portfolio__card-head">
                                            <div class="portfolio__card-head-bg portfolio__card-head-bg-blur"
                                                style="background-image: url(${profile[i].icon});">
                                            </div>
                                        </div>
                                        <div style="background: ${profile[i].color !== '' ? profile[i].color : profile.defColor}" class="portfolio__card-num">${i}</div>
                                        <div class="padd" style="position: relative;">
                                            <img src="${profile[i].icon}" onerror="this.src='../img/avatars/avatar.gif'"
                                                width="110" height="110"
                                                style="border-radius: 20%; border: 2px solid #fff; margin-bottom: 15px; margin-top: 10px; background-color: rgb(33 37 41);"
                                                alt="${profile[i].name}" loading="lazy"
                                                onerror="this.src = '../img/avatars/avatar.gif';">
                                            <div class="badge_icon"></div>
                                            <h5 class="portfolio__card-title">
                                                <a href="${profile[i].button.link}"
                                                    class="hoverable partner-va">${profile[i].name}</a><br><span style="margin-top: 10px;"
                                                    class="status-badge badge badge-success">${profile[i].date}</span>
                                            </h5>
                                        </div>
                                        <div class="portfolio__card-bd">
                                            <p class="portfolio__card-text">${profile[i].description}</p>
                                            <div class="btn-group-portfolio__card"
                                                style="position: absolute; left: 50%; bottom: 15px; transform: translateX(-50%); margin-bottom: 1px;"
                                                role="group" aria-label="Buttons">
                                                <a onmouseover="this.style.transition='.3s'; this.style.backgroundColor='${profile[i].button.color ? profile[i].button.color : profile.defColor}';" onmouseout="this.style.backgroundColor='transparent';" style="
                                                border-left: 3px solid ${profile[i].color !== '' ? profile[i].color : profile.defColor};
                                                border-right: 0.5px solid ${profile[i].color !== '' ? profile[i].color : profile.defColor};
                                                border-top: 3px solid ${profile[i].color !== '' ? profile[i].color : profile.defColor};
                                                border-bottom: 3px solid ${profile[i].color !== '' ? profile[i].color : profile.defColor};
                                                border-radius: 10px 0px 0px 10px;" href="${profile[i].button.link}" target="_blank"
                                                    id="onhover-element" class="btn-l hoverable">${profile[i].button.title}</a>
                                                   
                                                <a onmouseover="this.style.transition='.3s'; this.style.backgroundColor='${profile[i].color !== '' ? profile[i].color : profile.defColor}';" onmouseout="this.style.backgroundColor='transparent';"
                                                style="
                                                border-left: 0.5px solid ${profile[i].color !== '' ? profile[i].color : profile.defColor};
                                                border-right: 3px solid ${profile[i].color !== '' ? profile[i].color : profile.defColor};
                                                border-top: 3px solid ${profile[i].color !== '' ? profile[i].color : profile.defColor};
                                                border-bottom: 3px solid ${profile[i].color !== '' ? profile[i].color : profile.defColor};
                                                border-radius: 0px 10px 10px 0px;" title="${profile[i].buttonShare.title}" onclick="copyLink(event)"
                                                    class="btn-main hoverable" data-link="${profile[i].buttonShare.link}">Поделиться</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
    
    `
}
document.write(code)