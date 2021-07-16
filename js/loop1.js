const sim = {
    'owner': '<div class="tooltip"><img class="portfolio__card-text-sim" src="./img/icons/badges/owner.png" alt=":owner:" title=":owner:"><span class="tooltiptext">Владелец</span></div>',
    'bug-hunter': '<div class="tooltip"><img class="portfolio__card-text-sim" src="./img/icons/badges/bug-hunter.png" alt=":bug-hunter:" title=":bug-hunter:"><span class="tooltiptext">Искатель багов</span></div>',
    'customer': '<div class="tooltip"><img class="portfolio__card-text-sim" src="./img/icons/badges/customer.png" alt=":customer:" title=":customer:"><span class="tooltiptext">Покупатель</span></div>',
    'banana': '<div class="tooltip"><img class="portfolio__card-text-sim" src="./img/icons/badges/banana.png" alt=":customer:" title=":banana:"><span class="tooltiptext">Уник ёмаё</span></div>',
}

const profile = {
    defColor: '#7f78bd',
    1: { name: `${sim['customer']} Geger 🏳️‍🌈`, description: `Хочу тульский пряник <br>:c_dance:`, icon: './img/avatars/geger.gif', bg: '', color: 'violet', link: 'https://twitch.tv/geger' },
    2: { name: `${sim['bug-hunter']} FexHub`, description: `#I #Like #Palestine :palestine_flag:`, icon: 'https://images-ext-1.discordapp.net/external/S6fkMiupBz20WmLhwkUH3psM5H2OceOC06pUcneIkfg/%3Fsize%3D1024/https/cdn.discordapp.com/icons/714911198306369566/a_22a87c9a5b8c4a6ba0e21cc1a30d9345.gif', bg: '#1111', color: '#1111', link: 'https://discord.gg/fexhub' },
    3: { name: 'Yakov Helper Community', description: `Сервер технической поддержки Yakov Helper'a`, icon: 'https://cdn.discordapp.com/attachments/792456475217362964/854438186310828082/ae19fc21f642edeca5586b98831743e4.jpg', bg: '', color: '#ff0a25', link: 'https://discord.gg/poland' },
    4: { name: `${sim['owner']} ZippWitch `, description: `опятьходятчтотомутят<br>:c_dog1::c_dog2::c_dog2::c_dog2::c_dog2::c_dog2::c_dog3:`, icon: './img/avatars/zippwitch.gif', bg: 'url(./img/bgs/ZippWitch.jpg)', color: '#5c456d', link: './portfolio' },
    5: { name: 'Kiriz#4456', description: `Я пишу на Lua, помогите`, icon: 'https://cdn.discordapp.com/avatars/646718665559113759/ef735ebde92348f0202d23b6bf861cac.png?size=2048', bg: '', color: '#8b8b8b', link: 'https://github.com/Kiriz01' },
    6: { name: `${sim['bug-hunter']} Luminity`, description: `Лучший сервер`, icon: './img/avatars/radeon.png', bg: 'url(./img/avatars/radeon.png)', color: '#dd3f55', link: 'https://discord.gg/radeon' },
    7: { name: 'List&ltDemetry>🐾', description: `:c_ringed_planet: Сатурн-шиза`, icon: 'https://cdn.discordapp.com/avatars/641299259747991592/df0bdc3881921bfcf94ddc7ffeab1421.png?size=2048', buttonShare: { link: 'https://discord.gg/T8we7sYnCN', title: 'Скопировать ссылку на Discord сервер' }, date: 'Дружище', bg: '', color: '#3395db', link: 'https://discord.gg/T8we7sYnCN' },
    8: { name: `${sim['banana']} алех даббер`, description: `Сильная:c_russianbaby:независимая:flushed:женщина:c_cryrage:с_прекрасным_голосом`, icon: './img/avatars/алех.gif', bg: '', color: '', link: './team' },
    9: { name: `BrokenInk`, description: `:c_emoji_4:Bot Developer, not verified developer`, icon: 'https://cdn.discordapp.com/attachments/865614677323939890/865620977144823808/QZfI.gif', bg: 'url(https://pa1.narvii.com/6757/39a71dc75844ff997a6d3197989dfda1e8acc7e5_hq.gif)', color: 'black', link: 'https://zippw.github.io/me/BrokenInk' },


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
                                                <a href="${profile[i].link}" target="_blank" 
                                                    class="hoverable partner-va">${profile[i].name}</a><br><span style="margin-top: 10px;"
                                            </h5>
                                        </div>
                                        <div class="portfolio__card-bd">
                                            <p class="portfolio__card-text">${profile[i].description.replace(/:\w+:/g, (i) => `<i class="twa twa-${i.replaceAll(':', '').replaceAll('_', '-')}"></i>`)}</p>
                                        </div>
                                    </div>
                                </div>
    
    `
}
document.write(code)