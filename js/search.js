function searchTab() {
    // Объявить переменные
    var input, filter, ul, li, a, i;
    input = document.getElementById("mySearch");
    filter = input.value.toUpperCase();
    ul = document.getElementById("myMenu");
    li = ul.getElementsByTagName("li");

    // Перебирайте все элементы списка и скрывайте те, которые не соответствуют поисковому запросу
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

function redirectUser() {
    let link = 'https://zippwitch-alt.github.io/zippp/'
    var code = document.getElementById("code").value;
    let file;

    switch (true) {
        case /(портфолио)|(пф)|(portfolio)|(pf)/ui.test(code):
            file = 'portfolio'
            break
        case /(новости)|(news)|(события)|(нововведения)/ui.test(code):
            file = 'news'
            break
        case /(главная)|(main)|(индекс)|(домашняя)|(home)/ui.test(code):
            file = 'index'
            break
        case 'Hello, world!'.test(code):
            file = 'game3000'
            break
    }

    window.location.href = file !== 'index' ? link + file + '.html' : link
}