function whenKeyIsHold() {
    if (window.reset == true) {
        DNF.style.visibility = "hidden"
        plus2.style.visibility = "hidden"
        second.style.color = "rgb(153, 255, 102)"
        millisecond.style.color = "rgb(153, 255, 102)"
        minutes.style.color = "rgb(153, 255, 102)"
        document.getElementById("semicolon2").style.display = "inline-block"
        milliseconds.style.display = "inline-block"
        millisecond.innerHTML = "00"
        second.innerHTML = "00"
        minutes.innerHTML = "00"
        document.getElementById("semicolon1").style.color = "rgb(153, 255, 102)"
        document.getElementById("semicolon2").style.color = "rgb(153, 255, 102)"
        document.getElementById("go").style.visibility = "visible"

        document.body.style.visibility = "hidden"
        ao5.style.display = "none"
        mo5.style.display = "none"
        timer.style.visibility = "visible"
        timer.style.gridColumn = "2/ span 2"
        timer.style.gridRow = "3/ span 2"
        timer.style.textAlign = "center"
    }
}
export { whenKeyIsHold }
