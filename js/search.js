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
    document.addEventListener('keydown', console.log)
    let link = 'https://zippwitch-alt.github.io/zippp/'
    var code = document.getElementById("code").value;
    let file;

    if (['portfolio', 'портфолио', 'pf', 'пф'].includes(code)) {
        file = 'portfolio'
    } else if (['новости', 'news', 'события', 'ивенты'].includes(code)) {
        file = 'news'
    } else if (['главная', 'домашняя', 'home', 'main'].includes(code)) {
        file = 'index'
    } else if (['Hello, world!'].includes(code)) {
        file = 'game3000'
    }

    window.location.href = file !== 'index' ? link + file + '.html' : link
}