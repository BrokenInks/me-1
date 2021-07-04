const sim = {
    'js': '<img class="portfolio__card-text-sim" src="./img/icons/JavaScript.svg" alt=":js:" title=":js:">',
    'nodejs': '<img class="portfolio__card-text-sim" src="./img/icons/node-js.svg" alt=":nodejs:" title=":nodejs:">',
    'discord': '<img class="portfolio__card-text-sim" src="./img/icons/Discord.svg" alt=":discord:" title=":discord:">',
    'youtube': '<img class="portfolio__card-text-sim" src="./img/icons/YouTube.svg" alt=":youtube:" title=":youtube:">',
    'soundcloud': '<img class="portfolio__card-text-sim" src="./img/icons/SoundCloud.svg" alt=":soundcloud:" title=":soundcloud:">',
}

const profile = {
    defColor: '#7f78bd',
    1: { new: true, name: 'Приложение с ботом', description: `Бэкенд: !=#2988`, icon: './img/avatars/pr.gif', buttonShare: { link: 'https://zippw.github.io/items/program', title: 'Перейди на страницу скачивания бота-программы' }, date: 'Дата: 26/6/2021', bg: 'url(./img/bgs/bg3.jpg)', color: '', button: { title: 'Скачать', link: './items/program', color: '' } },
    2: {
        name: 'Music или mod discord бот на заказ', description: `Модератор-бот на ${sim['nodejs']}
<br>Музыкальный-бот на ${sim['nodejs']}`, icon: './img/avatars/1.gif', buttonShare: { link: 'https://zippw.github.io/me/items/buy-3', title: 'Купить скрипт бота' }, date: 'Услуга', bg: 'url(./img/bgs/bg1.jpg)', color: '', button: { title: '499₽', link: './items/buy-3', color: '#3ba55c' }
    },
    3: { name: 'FN bot#0209', description: `Мультифункциональный односерверный бот на ${sim['nodejs']}, в которого входят: 65+ команд для модерации/музыки/фана...`, icon: 'https://cdn.discordapp.com/avatars/674942800894361611/568429c0828ceabc102df5dd5617d907.webp?size=4096', buttonShare: { link: 'https://zippw.github.io/me/items/buy-1', title: 'Купить скрипт бота' }, date: 'Дата: 3/4/2021', bg: 'url(./img/bgs/bg1.jpg)', color: '', button: { title: '699₽', link: './items/buy-1', color: '#3ba55c' } },
    4: { name: 'Slash bot#3799', description: `Slash бот с глобальными командами на ${sim['nodejs']}, который включает в себя несколько команд <br>новейшего хэндлера...`, icon: 'https://cdn.discordapp.com/avatars/783995245075103744/405ff76ecd30ee7943f29023d59eea22.webp?size=4096', buttonShare: { link: 'https://zippw.github.io/me/items/buy-2', title: 'Купить скрипт бота' }, date: 'Дата: 7/05/2021', bg: 'url(./img/bgs/bg1.jpg)', color: '', button: { title: '199₽', link: './items/buy-2', color: '#3ba55c' } },
    5: { name: 'Альбом Выва | 2021', description: `4 трека;<br>площадка ${sim['youtube']}`, icon: './img/avatars/soundcloud_avatar.jpg', buttonShare: { link: 'https://youtube.com/playlist?list=PL2KqJq9LIGN7q1zGbuYIi5jXvtamjrseQ', title: 'Перейти на YouTube плейлист' }, date: 'Дата: 23/4/2021', bg: 'url(./img/bgs/bg2.jpg)', color: '', button: { title: 'YouTube', link: 'https://youtube.com/playlist?list=PL2KqJq9LIGN7q1zGbuYIi5jXvtamjrseQ', color: '#ff0000' } },
    6: { name: 'Альбом Выва | 2021', description: `4 трека; <br>площадка: ${sim['soundcloud']}`, icon: './img/avatars/soundcloud_avatar.jpg', buttonShare: { link: 'https://soundcloud.com/valeriy-is-bro-vp/sets/2-1', title: 'Перейти на SoundCloud плейлист' }, date: 'Дата: 23/4/2021', bg: 'url(./img/bgs/bg2.jpg)', color: '', button: { title: 'SoundCloud', link: 'https://soundcloud.com/valeriy-is-bro-vp/sets/2-1', color: '#ff7400' } },
}


let code = '';
for (let i = 1; i <= Object.keys(profile).length - 1; i++) {
    code = code + `
    <div class="col">
                                    <div style="border-color: ${profile[i].color !== '' ? profile[i].color : profile.defColor}; box-shadow: inset 0px 0px 250px rgba(0,0,0,1); background: ${profile[i].bg} no-repeat; background-size: cover;" class="portfolio__card new-portfolio__card card__portfolio">
                                        <div class="portfolio__card-head">
                                            <div class="portfolio__card-head-bg portfolio__card-head-bg-blur"
                                                style="background-image: url(${profile[i].icon});">
                                            </div>
                                        </div>
                                        <div style="background: ${profile[i].color !== '' ? profile[i].color : profile.defColor}" class="portfolio__card-num">${i}</div>

                                        
                                        <div class="portfolio__card-newBadgeDiv">
                                            ${profile[i].new ? `<div style="background: ${profile[i].color !== '' ? profile[i].color : profile.defColor}" class="portfolio__card-newBadge">НОВОЕ</div>
                                            <svg class="sparkleStarTopRight-1uWZTi sparkle-1qyWC9" aria-hidden="false" top="50px" width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.30705 8.36284L13.5731 6.46363C13.5889 6.45487 13.6022 6.44203 13.6114 6.42644C13.6206 6.41086 13.6255 6.39309 13.6255 6.375C13.6255 6.35691 13.6206 6.33914 13.6114 6.32356C13.6022 6.30797 13.5889 6.29513 13.5731 6.28637L9.30705 4.38716C9.29358 4.38716 9.28066 4.38183 9.27114 4.37233C9.26162 4.36283 9.25627 4.34995 9.25627 4.33652L7.3518 0.0569762C7.30102 -0.0189921 7.19944 -0.0189921 7.17405 0.0569762L5.26958 4.33652C5.24419 4.36184 5.24419 4.38716 5.2188 4.38716L0.927401 6.28637C0.911525 6.29513 0.898291 6.30797 0.889077 6.32356C0.879862 6.33914 0.875 6.35691 0.875 6.375C0.875 6.39309 0.879862 6.41086 0.889077 6.42644C0.898291 6.44203 0.911525 6.45487 0.927401 6.46363L5.2188 8.36284C5.24419 8.36284 5.24419 8.38816 5.26958 8.41348L7.17405 12.693C7.19944 12.769 7.30102 12.769 7.3518 12.693L9.25627 8.41348C9.25627 8.40005 9.26162 8.38717 9.27114 8.37767C9.28066 8.36817 9.29358 8.36284 9.30705 8.36284Z" fill="currentColor"></path></svg>
                                            <svg class="sparkleStarRight-3STViN sparkle-1qyWC9" aria-hidden="false" width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.30705 8.36284L13.5731 6.46363C13.5889 6.45487 13.6022 6.44203 13.6114 6.42644C13.6206 6.41086 13.6255 6.39309 13.6255 6.375C13.6255 6.35691 13.6206 6.33914 13.6114 6.32356C13.6022 6.30797 13.5889 6.29513 13.5731 6.28637L9.30705 4.38716C9.29358 4.38716 9.28066 4.38183 9.27114 4.37233C9.26162 4.36283 9.25627 4.34995 9.25627 4.33652L7.3518 0.0569762C7.30102 -0.0189921 7.19944 -0.0189921 7.17405 0.0569762L5.26958 4.33652C5.24419 4.36184 5.24419 4.38716 5.2188 4.38716L0.927401 6.28637C0.911525 6.29513 0.898291 6.30797 0.889077 6.32356C0.879862 6.33914 0.875 6.35691 0.875 6.375C0.875 6.39309 0.879862 6.41086 0.889077 6.42644C0.898291 6.44203 0.911525 6.45487 0.927401 6.46363L5.2188 8.36284C5.24419 8.36284 5.24419 8.38816 5.26958 8.41348L7.17405 12.693C7.19944 12.769 7.30102 12.769 7.3518 12.693L9.25627 8.41348C9.25627 8.40005 9.26162 8.38717 9.27114 8.37767C9.28066 8.36817 9.29358 8.36284 9.30705 8.36284Z" fill="currentColor"></path></svg>
                                            <svg class="sparkleStarBottomLeft-3dycVF sparkle-1qyWC9" aria-hidden="false" width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.30705 8.36284L13.5731 6.46363C13.5889 6.45487 13.6022 6.44203 13.6114 6.42644C13.6206 6.41086 13.6255 6.39309 13.6255 6.375C13.6255 6.35691 13.6206 6.33914 13.6114 6.32356C13.6022 6.30797 13.5889 6.29513 13.5731 6.28637L9.30705 4.38716C9.29358 4.38716 9.28066 4.38183 9.27114 4.37233C9.26162 4.36283 9.25627 4.34995 9.25627 4.33652L7.3518 0.0569762C7.30102 -0.0189921 7.19944 -0.0189921 7.17405 0.0569762L5.26958 4.33652C5.24419 4.36184 5.24419 4.38716 5.2188 4.38716L0.927401 6.28637C0.911525 6.29513 0.898291 6.30797 0.889077 6.32356C0.879862 6.33914 0.875 6.35691 0.875 6.375C0.875 6.39309 0.879862 6.41086 0.889077 6.42644C0.898291 6.44203 0.911525 6.45487 0.927401 6.46363L5.2188 8.36284C5.24419 8.36284 5.24419 8.38816 5.26958 8.41348L7.17405 12.693C7.19944 12.769 7.30102 12.769 7.3518 12.693L9.25627 8.41348C9.25627 8.40005 9.26162 8.38717 9.27114 8.37767C9.28066 8.36817 9.29358 8.36284 9.30705 8.36284Z" fill="currentColor"></path></svg>

                                            ` : ''}
                                        </div>
                                        <div class="padd" style="position: relative;">
                                            <img id="portfolio__card-icon" src="${profile[i].icon}" onerror="this.src='./img/avatars/avatar.gif'"
                                                width="110" height="110"
                                                style="
                                                transition: .3s; border-radius: 20%; border: 2px solid #fff; margin-bottom: 15px; margin-top: 10px; background-color: rgb(33 37 41);"
                                                alt="${profile[i].name}" loading="lazy"
                                                onerror="this.src = '../img/avatars/avatar.gif';">
                                            <div class="badge_icon"></div>
                                            <h5 class="portfolio__card-title">
                                                <a href="${profile[i].button.link}"
                                                    id="portfolio__card-hide" class="partner-va">${profile[i].name}</a><br><span style="margin-top: 10px;"
                                                    id="portfolio__card-hide" class="status-badge badge badge-success">${profile[i].date}</span>
                                            </h5>
                                        </div>
                                        <div class="portfolio__card-bd">
                                            <p id="hidden" class="portfolio__card-text">${profile[i].description}</p>
                                            <div class="btn-group-portfolio__card"
                                                style="position: absolute; left: 50%; bottom: 15px; transform: translateX(-50%); margin-bottom: 1px;"
                                                role="group" aria-label="Buttons">
                                                <a onmouseover="this.style.transition='.3s'; this.style.backgroundColor='${profile[i].button.color ? profile[i].button.color : profile.defColor}';" onmouseout="this.style.backgroundColor='transparent';" style="
                                                border-left: 3px solid ${profile[i].color !== '' ? profile[i].color : profile.defColor};
                                                border-right: 0.5px solid ${profile[i].color !== '' ? profile[i].color : profile.defColor};
                                                border-top: 3px solid ${profile[i].color !== '' ? profile[i].color : profile.defColor};
                                                border-bottom: 3px solid ${profile[i].color !== '' ? profile[i].color : profile.defColor};
                                                border-radius: 10px 0px 0px 10px;" href="${profile[i].button.link}" target="_blank"
                                                    id="onhover-element" class="btn-l">${profile[i].button.title}</a>
                                                   
                                                <a onmouseover="this.style.transition='.3s'; this.style.backgroundColor='${profile[i].color !== '' ? profile[i].color : profile.defColor}';" onmouseout="this.style.backgroundColor='transparent';"
                                                style="
                                                border-left: 0.5px solid ${profile[i].color !== '' ? profile[i].color : profile.defColor};
                                                border-right: 3px solid ${profile[i].color !== '' ? profile[i].color : profile.defColor};
                                                border-top: 3px solid ${profile[i].color !== '' ? profile[i].color : profile.defColor};
                                                border-bottom: 3px solid ${profile[i].color !== '' ? profile[i].color : profile.defColor};
                                                border-radius: 0px 10px 10px 0px;" title="${profile[i].buttonShare.title}" onclick="copyLink(event)"
                                                    class="btn-main" data-link="${profile[i].buttonShare.link}">Поделиться</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
    
    `
}
document.write(code)