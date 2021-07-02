var minutes = document.getElementById("minutes")
var second = document.getElementById("seconds")
var millisecond = document.getElementById("milliseconds")
var mo5 = document.getElementById("meanOfFive")
var ao5 = document.getElementById("averageOfFive")
var ao5Button = document.getElementById("averageOfFiveButton")
var mo5Button = document.getElementById("meanOfFiveButton")
var totalSecond = 0
var a = 0
window.reset = true
var solves = []
var meanOf5 = 0

ao5Button.addEventListener("click", ao5Hide)
mo5Button.addEventListener("click", mo5Hide)

function ao5Hide() {
  if (ao5Button.value == "hide") {
    ao5.style.display = "none"
    ao5Button.value = "show"
  } else {
    ao5.style.display = "inline-block"
    ao5Button.value = "hide"
  }
}

function mo5Hide() {
  if (mo5Button.value == "hide") {
    mo5.style.display = "none"
    mo5Button.value = "show"
  } else {
    mo5.style.display = "inline-block"
    mo5Button.value = "hide"
  }
}

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
    minutes.style.display = "none"
  } else {
    document.getElementById("semicolon1").style.display = "inline-block"
    minutes.style.display = "inline-block"
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
      myFunc = setInterval(setTime, 10)
      totalSecond = 0
    } else if (a % 2 == 0) {
      window.reset = true
      totalSecond = 0
    }
  }
}
document.body.onkeypress = function (e) {
  // when space bar is pressed and timer started already (press to stop)
  if (e.keyCode == 32 && window.reset == false) {
    clearInterval(myFunc)

    fiveSolvesArray = []
    timeOfSolve =
      parseInt(totalSecond / 6000) * 60 +
      (parseInt(totalSecond / 100) % 60) +
      (totalSecond % 100) / 100
    solves.push(timeOfSolve)
    if (solves.length >= 5) {
      //when there are more than 5 solves
      fiveSolvesArray = [
        solves[solves.length - 1],
        solves[solves.length - 2],
        solves[solves.length - 3],
        solves[solves.length - 4],
        solves[solves.length - 5],
      ]
      meanOf5 = (
        (fiveSolvesArray[0] +
          fiveSolvesArray[1] +
          fiveSolvesArray[2] +
          fiveSolvesArray[3] +
          fiveSolvesArray[4]) /
        5
      ).toFixed(2) // mo5
      console.log(fiveSolvesArray)
      fiveSolvesArray.sort(function (a, b) {
        //sort 5 solves from low to high
        return a - b
      })
      fiveSolvesArray.pop() // delete highest solve
      fiveSolvesArray.shift() // delete lowest solve
      averageOf5 = (
        (fiveSolvesArray[0] + fiveSolvesArray[1] + fiveSolvesArray[2]) /
        3
      ).toFixed(2) // ao5
    } else {
      // when there are less than 5 solves
      meanOf5 = ""
      averageOf5 = ""
    }
    mo5.innerHTML = "mo5: " + meanOf5
    ao5.innerHTML = "ao5: " + averageOf5
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
