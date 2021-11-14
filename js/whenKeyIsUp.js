function whenKeyIsUp() {
    a++
    if (a % 2 == 1) {
        window.reset = false
        plus2.style.visibility = "hidden"
        DNF.style.visibility = "hidden"
        window.myFunc = setInterval(setTime, 10)
        totalSecond = 0
        window.run = true
    } else if (a % 2 == 0) {
        window.reset = true
        totalSecond = 0
        window.penAvailable = true
    }
}
export { whenKeyIsUp }
