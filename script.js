var minutes = document.getElementById("minutes")
var second = document.getElementById("seconds")
var millisecond = document.getElementById("miliseconds")
var totalSecond = 0
var a = 0
window.reset = true

function setTime() {
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
  var valueString = value + ""
  if (valueString.length < 2) {
    return "0" + valueString
  } else {
    return valueString
  }
}

document.body.onkeyup = function (e) {
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
  if (e.keyCode == 32 && window.reset == false) {
    clearInterval(myFunc)
  }
}
document.body.onkeydown = function (e) {
  if (e.keyCode == 32 && window.reset == true) {
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
