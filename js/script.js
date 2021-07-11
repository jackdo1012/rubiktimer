const minutes = document.getElementById("minutes")
const second = document.getElementById("seconds")
const millisecond = document.getElementById("milliseconds")
const mo5 = document.getElementById("meanOfFive")
const ao5 = document.getElementById("averageOfFive")
const ao5Button = document.getElementById("averageOfFiveButton")
const mo5Button = document.getElementById("meanOfFiveButton")
const plus2 = document.getElementById("plusTwo")
const DNF = document.getElementById("DNF")
const pen = document.getElementById("penalty")
const font = document.getElementById("font")
const timer = document.getElementById("timer")
// const scramble3x3 = "../scramble/scramble3x3.txt"
var totalSecond = 0
var a = 0
// var z = 0
var reset = true
var solves = []
var run = false

function scramble() {
  import("../scramble/scramble.js").then((response) => {
    document.querySelector("#scramble-area").innerHTML = response.getScramble()
  })
}
scramble()
pen.disabled = true
meanOfFiveButton.disabled = false
averageOfFiveButton.disabled = false
font.disabled = false
ao5Button.addEventListener("click", ao5Hide)
mo5Button.addEventListener("click", mo5Hide)

font.addEventListener(
  "change",
  function () {
    if (font.value == "1") {
      document.querySelector("#timer").style.fontFamily = "lcd"
    } else if (font.value == "2") {
      document.querySelector("#timer").style.fontFamily = "lcd2"
    } else if (font.value == "3") {
      document.querySelector("#timer").style.fontFamily = "lcd3"
    } else if (font.value == "4") {
      document.querySelector("#timer").style.fontFamily = "lcd4"
    } else if (font.value == "5") {
      document.querySelector("#timer").style.fontFamily = "lcd5"
    } else if (font.value == "6") {
      document.querySelector("#timer").style.fontFamily = "lcd6"
      document.querySelector("#timer").style.fontSize = "8rem"
    }
  },
  false
)

function setTime() {
  // this function make the time display
  second.style.color = "white"
  millisecond.style.color = "white"
  minutes.style.color = "white"
  document.getElementById("go").style.visibility = "hidden"
  document.getElementById("semicolon1").style.color = "white"
  document.getElementById("semicolon2").style.color = "white"
  ++totalSecond
  millisecond.innerHTML = pad(totalSecond % 100)
  second.innerHTML = pad(parseInt(totalSecond / 100) % 60)
  minutes.innerHTML = pad(parseInt(totalSecond / 6000))
  if (parseInt(totalSecond / 6000) < 1) {
    document.getElementById("semicolon1").style.display = "none"
    document.getElementById("semicolon2").style.display = "inline-block"
    minutes.style.display = "none"
    seconds.style.display = "inline-block"
    milliseconds.style.display = "inline-block"
  } else {
    document.getElementById("semicolon1").style.display = "inline-block"
    minutes.style.display = "inline-block"
    seconds.style.display = "inline-block"
    milliseconds.style.display = "inline-block"
  }
}
function pad(value) {
  // when the number is 1-digit, it add 0 to the first
  var valueString = value + ""
  if (valueString.length < 2) {
    return "0" + valueString
  } else {
    return valueString
  }
}

document.body.onkeyup = function (e) {
  // when you press space and the key is up
  if (e.keyCode == 32) {
    a++
    if (a % 2 == 1) {
      window.reset = false
      plus2.style.visibility = "hidden"
      DNF.style.visibility = "hidden"
      myFunc = setInterval(setTime, 10)
      totalSecond = 0
      window.run = true
    } else if (a % 2 == 0) {
      window.reset = true
      totalSecond = 0
      window.penAvailable = true
    }
  }
}
document.body.onkeypress = function (e) {
  // when space bar is pressed and timer started already (press to stop)
  if (e.keyCode == 32 && window.reset == false && window.run == true) {
    clearInterval(myFunc)
    timeOfSolve =
      parseInt(totalSecond / 6000) * 60 +
      (parseInt(totalSecond / 100) % 60) +
      (totalSecond % 100) / 100
    solves.unshift(timeOfSolve)
    window.run = false

    function meanOf(num) {
      if (solves.length >= num) {
        var sum = 0
        var solvesMean = solves.slice(0, num)
        for (i of solvesMean) {
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
        var count = 0
        var firstNum = solves.slice(0, num)
        solvesAvg = firstNum.filter((value) => value !== "DNF")
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
            return Math.floor(ans / 60) + ":0" + (ans % 60).toFixed(2)
          } else {
            return Math.floor(ans / 60) + ":" + (ans % 60).toFixed(2)
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
            return Math.floor(ans / 60) + ":0" + (ans % 60).toFixed(2)
          } else {
            return Math.floor(ans / 60) + ":" + (ans % 60).toFixed(2)
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
  }
}
document.body.onkeydown = function (e) {
  pen.checked = false
  pen.disabled = true
  meanOfFiveButton.disabled = true
  averageOfFiveButton.disabled = true
  font.disabled = true
  if (e.keyCode == 32 && window.reset == true) {
    // when key space bar is hold and timer isn't start
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
  }
}

function ao5Hide() {
  if (ao5Button.value == "on") {
    ao5.style.visibility = "hidden"
    ao5Button.value = "off"
  } else {
    ao5.style.visibility = "visible"
    ao5Button.value = "on"
  }
}

function mo5Hide() {
  if (mo5Button.value == "on") {
    mo5.style.visibility = "hidden"
    mo5Button.value = "off"
  } else {
    mo5.style.visibility = "visible"
    mo5Button.value = "on"
  }
}

// function scramble() {
//   fetch(scramble3x3)
//     .then((myFile) => myFile.text())
//     .then(function (myScramble) {
//       var myScrambleArray = myScramble.split("\n")
//       return ((scramble, scrambleLength) => {
//         if (z < scrambleLength - 1) {
//           z++
//           return (document.querySelector("#scramble-area").innerHTML =
//             scramble[z])
//         } else {
//           return (document.querySelector("#scramble-area").innerHTML =
//             "Sorry, we have no more scramble to display")
//         }
//       })(myScrambleArray, myScrambleArray.length)
//     })
// }
