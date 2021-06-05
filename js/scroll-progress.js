var line = document.getElementById('progress_line');
window.addEventListener('scroll', progressBar);

function progressBar(e) {
    var windowScroll = document.body.scrollTop ||
        document.documentElement.scrollTop;
    var windowHeight = document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
    var width_progress_line = windowScroll / windowHeight * 100;
    line.style.height = width_progress_line + '%';
}