function redirectUser() {
    let link = 'https://zippw.github.io/me/'
    let file;
    var code = document.getElementById("code").value;
    const regexps = {
        'portfolio': /(портфолио)|(пф)|(portfolio)|(pf)/ui.test(code),
        'news': /(новости)|(news)|(события)|(нововведения)/ui.test(code),
        'more': /(подробнее)|(ещё)|(больше)|(more)/ui.test(code),
        'index': /(главная)|(main)|(индекс)|(домашняя)|(home)/ui.test(code),
    }

    switch (true) {
        case regexps['portfolio']:
            file = 'portfolio'
            break;
        case regexps['news']:
            file = 'news'
            break;
        case regexps['more']:
            file = 'more'
            break;
        case regexps['index']:
            file = 'index'
            break;
        case regexps['game3000']:
            file = 'game3000'
            break;
    }

    window.location.href = file !== 'index' ? link + file : link
}

function checkValid() {
    document.getElementById("code").value = document.getElementById("code").value
    var code = document.getElementById("code").value;
    const regexps = {
        'portfolio': /(портфолио)|(пф)|(portfolio)|(pf)/ui.test(code),
        'more': /(подробнее)|(ещё)|(больше)|(more)/ui.test(code),
        'index': /(главная)|(main)|(индекс)|(домашняя)|(home)/ui.test(code),
    }
    let result = regexps['index'];

    if (regexps['portfolio'] ||
        regexps['more'] ||
        regexps['index']) {
        document.getElementById("code").style.color = "#78bd7b"
    } else {
        document.getElementById("code").style.color = "#322a63a4"
    }
    console.log(result)


}


