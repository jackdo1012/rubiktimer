var minutes = document.getElementById("minutes")
var second = document.getElementById("seconds")
var millisecond = document.getElementById("milliseconds")
var mo5 = document.getElementById("meanOfFive")
var ao5 = document.getElementById("averageOfFive")
var ao5Button = document.getElementById("averageOfFiveButton")
var mo5Button = document.getElementById("meanOfFiveButton")
var plus2 = document.getElementById("plusTwo")
var DNF = document.getElementById("DNF")
var totalSecond = 0
var a = 0
var reset = true
var solves = []

ao5Button.addEventListener("click", ao5Hide)
mo5Button.addEventListener("click", mo5Hide)

function setTime() {
  // this function make the time display
  second.style.color = "white"
  millisecond.style.color = "white"
  minutes.style.color = "white"
  document.getElementById("go").style.display = "none"
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
      plus2.style.display = "none"
      DNF.style.display = "none"
      myFunc = setInterval(setTime, 0)
      totalSecond = 0
      window.penAvailable = false
    } else if (a % 2 == 0) {
      window.reset = true
      clearInterval(myFunc)
      totalSecond = 0
      window.penAvailable = true
    }
  }
}

document.body.onkeypress = function (e) {
  // when space bar is pressed and timer started already (press to stop)
  if (e.keyCode == 32 && window.reset == false) {
    plus2.style.display = "inline-block"
    DNF.style.display = "inline-block"
    clearInterval(myFunc)
    timeOfSolve =
      parseInt(totalSecond / 6000) * 60 +
      (parseInt(totalSecond / 100) % 60) +
      (totalSecond % 100) / 100
    solves.unshift(timeOfSolve)
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
        minutes.style.display = "none"
        document.getElementById("semicolon1").style.display = "inline-block"
        document.getElementById("semicolon1").innerHTML = "DNF"
        document.getElementById("semicolon2").style.display = "none"
        mo5.innerHTML = "mo5: " + meanOf(5)
        ao5.innerHTML = "ao5: " + averageOf(5)
      }
    })

    function meanOf(num) {
      if (solves.length >= num) {
        var sum = 0
        for (var i = 0; i < num; i++) {
          if (solves[i] == "DNF") {
            return "DNF"
          } else {
            sum += solves[i]
          }
        }
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
        solvesAvg = solves.slice(0, num)
        for (var i = 0; i < solves.length; i++) {
          if (solvesAvg[i] == "DNF") {
            count++
            solvesAvg.splice(i, 1)
          }
        }
        if (count == 0) {
          solvesAvg.sort(function (a, b) {
            return a - b
          })
          solvesAvg.pop()
          solvesAvg.shift()
          for (var i = 0; i < solvesAvg.length; i++) {
            sum += solvesAvg[i]
          }
          var ans = (sum / (num - 2)).toFixed(2)
          if (ans < 60) {
            return ans
          } else if (ans < 70) {
            return Math.floor(ans / 60) + ":0" + (ans % 60).toFixed(2)
          } else {
            return Math.floor(ans / 60) + ":" + (ans % 60).toFixed(2)
          }
        } else if (count == 1) {
          solvesAvg.sort(function (a, b) {
            return a - b
          })
          solvesAvg.splice(0, 1)
          for (var i = 0; i < solvesAvg.length; i++) {
            sum += solvesAvg[i]
          }
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
    mo5.innerHTML = "mo5: " + meanOf(5)
    ao5.innerHTML = "ao5: " + averageOf(5)
  }
}
document.body.onkeydown = function (e) {
  if (e.keyCode == 32 && window.reset == true) {
    // when key space bar is hold and timer isn't start
    second.style.color = "rgb(153, 255, 102)"
    millisecond.style.color = "rgb(153, 255, 102)"
    minutes.style.color = "rgb(153, 255, 102)"
    document.getElementById("semicolon1").style.color = "rgb(153, 255, 102)"
    document.getElementById("semicolon2").style.color = "rgb(153, 255, 102)"
    document.getElementById("go").style.display = "inline-block"
    millisecond.innerHTML = "00"
    second.innerHTML = "00"
    minutes.innerHTML = "00"
  }
}

function dnfhide() {
  if (window.penAvailable) {
    DNF.style.display = "none"
  }
}

function plus2hide() {
  if (window.penAvailable) {
    plus2.style.display = "none"
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
