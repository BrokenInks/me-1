const profile = {
    defColor: '#7f78bd',
    1: {
        name: 'Music или mod discord бот на заказ',
        description: `Модератор-бот на JS (ban, clear, kick, lock-channel, move, mute, poll, unban, unlock-channel, unmute)
<br>Музыкальный-бот на JS (loop, now-playing, play, queue, resume, shuffle, skip, stop, volume)`,
        icon: './img/avatars/1.gif',
        buttonShare: { link: 'https://zippwitch-alt.github.io/zippp/items/buy-3.html', title: 'Купить скрипт бота' },
        date: 'Услуга',
        bg: 'bg1.jpg',
        color: '',
        platform: [{ name: 'Discord', link: '' }],
        button: [{ buttonName: '499₽', buttonLink: './items/buy-3.html', buttonColor: '' }]
    },
    2: {
        name: 'FN bot#0209',
        description: `New Senpaii — проект мультифункционального, в том числе и развлекательного бота для Вашего сервера в Discord, основанный на желаниях и потребностях пользователей аудитории.

Созданный в 2019 году бот, продолжающий радовать своих пользователей и находящийся в активной разработке будет рад выполнять свои функции и на Вашем сервере.`,
        icon: 'https://cdn.discordapp.com/avatars/674942800894361611/568429c0828ceabc102df5dd5617d907.webp?size=4096',
        buttonShare: { link: 'https://zippwitch-alt.github.io/zippp/items/buy-1.html', title: 'Купить скрипт бота' },
        date: '3/4/2021',
        bg: 'bg1.jpg',
        color: '',
        platform: [{ name: 'Discord', link: '' }, { name: 'Github', link: 'https://github.com/ZippWitch-alt' }],
        button: [{ buttonName: '2900₽', buttonLink: './items/buy-1.html', buttonColor: '' }]
    },
    3: {
        name: 'Slash bot#3799',
        description: 'Slash бот для discord',
        icon: 'https://cdn.discordapp.com/avatars/783995245075103744/405ff76ecd30ee7943f29023d59eea22.webp?size=4096',
        buttonShare: { link: 'https://zippwitch-alt.github.io/zippp/items/buy-2.html', title: 'Купить скрипт бота' },
        date: '7/05/2021',
        bg: 'bg1.jpg',
        color: '',
        platform: [{ name: 'Discord', link: '' }, { name: 'Github', link: 'https://github.com/ZippWitch-alt' }],
        button: [{ buttonName: '899₽', buttonLink: './items/buy-2.html', buttonColor: '' }]
    },
    4: {
        name: 'Zipp Wickness',
        description: 'Альбом Выва 2 | 2021',
        icon: './img/avatars/soundcloud_avatar.jpg',
        buttonShare: { link: 'https://youtube.com/playlist?list=PL2KqJq9LIGN7q1zGbuYIi5jXvtamjrseQ - YouTube\nhttps://soundcloud.com/valeriy-is-bro-vp/sets/2-1 - SoundCloud', title: 'Перейти на YouTube плейлист' },
        date: '23/4/2021',
        bg: 'bg2.jpg',
        color: '',
        platform: [{ name: 'YouTube', link: 'https://www.youtube.com/channel/UCeqXNuOoWvxpEchVO3hbAmg' }, { name: 'SoundCloud', link: 'https://soundcloud.com/valeriy-is-bro-vp/' }],
        button: [{ buttonName: 'YouTube', buttonLink: 'https://youtube.com/playlist?list=PL2KqJq9LIGN7q1zGbuYIi5jXvtamjrseQ', buttonColor: '' }, { buttonName: 'SoundCloud', buttonLink: 'https://soundcloud.com/valeriy-is-bro-vp/sets/2-1', buttonColor: '' }]
    }
}


let code = '';
for (let i = 1; i <= Object.keys(profile).length - 1; i++) {
    code = code + `<tbody>
<tr class="tr bg"
style="box-shadow: inset 0px 0px 250px rgba(0,0,0,1); background: url(./img/bgs/${profile[i].bg}) no-repeat #343D46; background-size: cover; background-position: 0px -100px;">
<td style="background: ${profile[i].color !== '' ? profile[i].color : profile.defColor}; border: 5px solid ${profile[i].color !== '' ? profile[i].color : profile.defColor};" class=" numSection t3">

<span name="place" value="528509008022208513">${i}</span>
`;
    for (let pl = 0; !!profile[i].platform[pl]; pl++) {
        code = code + `

<a href="${profile[i].platform[pl].link}">
<img class="serverStatus" src="./img/icons/${profile[i].platform[pl].name}.svg" width="22px" alt="Сервер на платформе ${profile[i].platform[pl].name}"><br>
</a>`
    }

    code = code + `
</td >
<td style="border: 5px solid ${profile[i].color !== '' ? profile[i].color : profile.defColor};" class="serverAvatar t3">
<img class="" src="${profile[i].icon}"
onerror="this.src='./img/avatars/avatar.gif'" alt="">
</td>
<td style="border: 5px solid ${profile[i].color !== '' ? profile[i].color : profile.defColor};" class="serverDesc t3">
<div class="row">
<div class=" hideServerAvatar">
<img class="mobileServerAvatar"
src="${profile[i].icon}"
onerror="this.src='./img/avatars/avatar.jpg'" alt="">
</div>
<p class="col labelServerText">
<a href="${profile[i].button[0].buttonLink}" class="serverName hoverable">${profile[i].name}</a>
<br>
</p>
</div>
<p class="description">${profile[i].description}
</p>
</td>
<td style="border: 5px solid ${profile[i].color !== '' ? profile[i].color : profile.defColor};" class="join t3"><span
class="rating all"><b>${profile[i].date}</b></span>
`;
    for (let but = 0; !!profile[i].button[but]; but++) {
        code = code + `
<a href="${profile[i].button[but].buttonLink}"
style="background: ${profile[i].button[but].buttonColor !== '' ? profile[i].button[but].buttonColor : profile[i].color};"
onmouseover="this.style.backgroundColor='${profile[i].button[but].buttonColor !== '' ? profile[i].button[but].buttonColor : profile[i].color} linear-gradient(-80deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, .5), rgba(255, 255, 255, 0)) no-repeat !important';"
onmouseout="this.style.backgroundColor='${profile[i].button[but].buttonColor !== '' ? profile[i].button[but].buttonColor : profile[i].color}';" class="black boost hoverable"
target="_blank" rel="noopener" title="${profile[i].button[but].buttonName}"
tabindex="0">${profile[i].button[but].buttonName}</a>
`
    }
    code = code + `

<a onclick=copyLink(event)
data-link='${profile[i].buttonShare.link === '' ? 'Ссылка приватная, или автор её не добавлял' : profile[i].buttonShare.link}'
class="aboutbt" rel="noopener" id="copyLink"
title="Скопировать ссылку на ${profile[i].platform.join(' или ')}" tabindex="0">Поделиться</a></td>
</tbody>`
}
document.write(code)