const sim = {
    'dance': '<img class="portfolio__card-text-sim" src="./img/icons/dance.gif" alt=":dance:" title=":dance:">',
}

const profile = {
    defColor: '#7f78bd',
    1: {
        name: 'Geger 🏳️‍🌈',
        description: `Хочу тульский пряник <br>${sim['dance']}`,
        icon: './img/avatars/geger.gif',
        buttonShare: { link: 'https://twitch.tv/geger', title: 'Скопировать ссылку на twitch' },
        date: 'Дружище',
        bg: '#202230',
        color: 'rainbow',
        button: { title: 'Twitch', link: 'https://twitch.tv/geger', color: '#8161db' }
    },
    2: {
        name: 'FexHub',
        description: `FexHub - сервер твоей мечты`,
        icon: 'https://cdn.discordapp.com/icons/714911198306369566/a_22a87c9a5b8c4a6ba0e21cc1a30d9345.gif?size=1024',
        buttonShare: { link: 'https://discord.gg/fexhub', title: 'Скопировать ссылку на сервер Discord' },
        date: 'Дружище',
        bg: '#202230',
        color: '#00e8ff',
        button: { title: 'Вступить', link: 'https://twitch.tv/geger', color: '#0097ff' }
    },
}

let code = '';
for (let i = 1; i <= Object.keys(profile).length - 1; i++) {
    code = code + `
    <div class="col">
                                    <div style="${profile[i].color != 'rainbow' ? `border-color: ${profile[i].color !== '' ? profile[i].color : profile.defColor}; ` : ` animation: rainbow-border 5s linear;
                                    animation-iteration-count: infinite;`} box-shadow: inset 0px 0px 250px rgba(0,0,0,1); background: ${profile[i].bg} no-repeat; background-size: cover;" class="portfolio__card new-portfolio__card card__portfolio ${profile[i].color == 'rainbow' ? 'rainbow-border' : ''}">
                                        <div class="portfolio__card-head">
                                            <div class="portfolio__card-head-bg portfolio__card-head-bg-blur"
                                                style="background-image: url(${profile[i].icon});">
                                            </div>
                                        </div>
                                        <div style="${profile[i].color != 'rainbow' ? `background: ${profile[i].color !== '' ? profile[i].color : profile.defColor}; ` : ` animation: rainbow-bg 5s linear;
                                        animation-iteration-count: infinite;`}" class="portfolio__card-num">${i}</div>
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
                                                <a onmouseover="this.style.transition='.3s'; this.style.backgroundColor='${profile[i].button.color ? profile[i].button.color : profile.defColor}';" onmouseout="this.style.backgroundColor='transparent';" style="${profile[i].color !== 'rainbow' ? '' : ` animation: rainbow-border 5s linear;
                                                animation-iteration-count: infinite;`}
                                                border-left: 3px solid ${profile[i].color != '' ? profile[i].color != 'rainbow' ? profile[i].color : '' : profile.defColor};
                                                border-right: 0.5px solid ${profile[i].color != '' ? profile[i].color != 'rainbow' ? profile[i].color : '' : profile.defColor};
                                                border-top: 3px solid ${profile[i].color != '' ? profile[i].color != 'rainbow' ? profile[i].color : '' : profile.defColor};
                                                border-bottom: 3px solid ${profile[i].color != '' ? profile[i].color != 'rainbow' ? profile[i].color : '' : profile.defColor};
                                                border-radius: 10px 0px 0px 10px;" href="${profile[i].button.link}" target="_blank"
                                                    id="onhover-element" class="btn-l ${profile[i].button.color === 'rainbow' ? `rainbow-border` : ''}">${profile[i].button.title}</a>
                                                   
                                                <a onmouseover="this.style.transition='.3s'; this.style;" onmouseout="this.style.backgroundColor='transparent';"
                                                style="${profile[i].color !== 'rainbow' ? '' : ` animation: rainbow-border 5s linear;
                                                animation-iteration-count: infinite;`}
                                                border-left: 0.5px solid ${profile[i].color != '' ? profile[i].color != 'rainbow' ? profile[i].color : '' : profile.defColor};
                                                border-right: 3px solid ${profile[i].color != '' ? profile[i].color != 'rainbow' ? profile[i].color : '' : profile.defColor};
                                                border-top: 3px solid ${profile[i].color != '' ? profile[i].color != 'rainbow' ? profile[i].color : '' : profile.defColor};
                                                border-bottom: 3px solid ${profile[i].color != '' ? profile[i].color != 'rainbow' ? profile[i].color : '' : profile.defColor};
                                                border-radius: 0px 10px 10px 0px;" title="${profile[i].buttonShare.title}" onclick="copyLink(event)"
                                                    class="btn-main hoverable" data-link="${profile[i].buttonShare.link}">Поделиться</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
    
    `
}
document.write(code)