document.addEventListener("contextmenu", (e) => e.preventDefault())

document.onkeydown = function (e) {
    if (e.keyCode === 123) return false
    if (e.ctrlKey && e.shiftKey && (e.keyCode === 73) || e.keyCode === 74) return false
    if (e.ctrlKey && e.keyCode === 85) return false
}

setInterval(() => {
    if (window.outerWidth - window.innerWidth > 200 || window.outerHeight - window.innerHeight > 200) {
        document.body.innerHTML = "<h1>Inspect Disabled</h1>"
    }
}, 1000)