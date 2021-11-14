function whenKeyIsPress() {
    if (window.reset == false && window.run == true) {
        document.body.style.visibility = "visible"
        clearInterval(window.myFunc)
        var timeOfSolve =
            parseInt(totalSecond / 6000) * 60 +
            (parseInt(totalSecond / 100) % 60) +
            (totalSecond % 100) / 100
        solves.unshift(timeOfSolve)
        window.run = false

        function meanOf(num) {
            if (solves.length >= num) {
                var sum = 0
                var solvesMean = solves.slice(0, num)
                for (let i of solvesMean) {
                    if (i == "DNF") {
                        return "DNF"
                    }
                }
                sum = solvesMean.reduce((total, current) => total + current)
                var ans = (sum / num).toFixed(2)
                if (ans < 60) {
                    return ans
                } else if (ans < 70) {
                    return Math.floor(ans / 60) + ":0" + (ans % 60).toFixed(2)
                } else {
                    return Math.floor(ans / 60) + ":" + (ans % 60).toFixed(2)
                }
            } else {
                return ""
            }
        }

        function averageOf(num) {
            if (solves.length >= num) {
                var sum = 0
                var firstNum = solves.slice(0, num)
                var solvesAvg = firstNum.filter((value) => value !== "DNF")
                if (solvesAvg.length == 5) {
                    solvesAvg.sort(function (a, b) {
                        return a - b
                    })
                    solvesAvg.pop()
                    solvesAvg.shift()
                    var sum = solvesAvg.reduce((a, b) => a + b)
                    var ans = (sum / (num - 2)).toFixed(2)
                    if (ans < 60) {
                        return ans
                    } else if (ans < 70) {
                        return (
                            Math.floor(ans / 60) + ":0" + (ans % 60).toFixed(2)
                        )
                    } else {
                        return (
                            Math.floor(ans / 60) + ":" + (ans % 60).toFixed(2)
                        )
                    }
                } else if (solvesAvg.length == 4) {
                    solvesAvg.sort(function (a, b) {
                        return a - b
                    })
                    solvesAvg.splice(0, 1)
                    var sum = solvesAvg.reduce((a, b) => a + b)
                    var ans = (sum / (num - 2)).toFixed(2)
                    if (ans < 60) {
                        return ans
                    } else if (ans < 70) {
                        return (
                            Math.floor(ans / 60) + ":0" + (ans % 60).toFixed(2)
                        )
                    } else {
                        return (
                            Math.floor(ans / 60) + ":" + (ans % 60).toFixed(2)
                        )
                    }
                } else {
                    return "DNF"
                }
            } else {
                return ""
            }
        }
        plus2.addEventListener("click", function () {
            if (window.penAvailable) {
                window.penAvailable = false
                solves[0] = timeOfSolve += 2.0
                if (Math.floor(timeOfSolve) < 10) {
                    seconds.innerHTML = "0" + Math.floor(timeOfSolve)
                } else {
                    seconds.innerHTML = Math.floor(timeOfSolve)
                }
                statShow()
                mo5.innerHTML = "mo5: " + meanOf(5)
                ao5.innerHTML = "ao5: " + averageOf(5)
            }
        })
        DNF.addEventListener("click", function () {
            if (window.penAvailable) {
                window.penAvailable = false
                solves[0] = "DNF"
                millisecond.style.display = "none"
                second.style.display = "none"
                minutes.style.display = "inline-block"
                minutes.innerHTML = "DNF"
                document.getElementById("semicolon1").style.display = "none"
                document.getElementById("semicolon2").style.display = "none"
                statShow()
                mo5.innerHTML = "mo5: " + meanOf(5)
                ao5.innerHTML = "ao5: " + averageOf(5)
            }
        })
        var b = 0
        pen.addEventListener("click", () => {
            b++
            if (b % 2 == 1) {
                DNF.style.visibility = "visible"
                plus2.style.visibility = "visible"
            } else {
                DNF.style.visibility = "hidden"
                plus2.style.visibility = "hidden"
            }
        })
        mo5.innerHTML = "mo5: " + meanOf(5)
        ao5.innerHTML = "ao5: " + averageOf(5)
        pen.disabled = false
        meanOfFiveButton.disabled = false
        averageOfFiveButton.disabled = false
        font.disabled = false
        scramble()
        statShow()
        // === === === === === === === === === ===
        if (mediaQuery1.matches) {
            timer.style.position = "none"
            timer.style.gridColumn = "1/ span 4"
            timer.style.gridRow = "4/ span 1"
            timer.style.textAlign = "center"
        } else {
            timer.style.position = "none"
            timer.style.gridColumn = "3/ span 2"
            timer.style.gridRow = "3/ span 1"
            timer.style.textAlign = "left"
        }
        ao5.style.display = "inline-block"
        mo5.style.display = "inline-block"
    }
}
export { whenKeyIsPress }
