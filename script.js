var minutes = document.getElementById("minutes")
var second = document.getElementById("seconds")
var milisecond = document.getElementById("miliseconds")
var totalSecond = 0
var a = 0
var start = false

function setTime() {
  second.style.color = "white"
  milisecond.style.color = "white"
  minutes.style.color = "white"
  document.getElementById("semicolon1").style.color = "white"
  document.getElementById("semicolon2").style.color = "white"
  ++totalSecond
  milisecond.innerHTML = pad(totalSecond % 100)
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
      reset = 0
      myFunc = setInterval(setTime, 10)
      totalSecond = 0
    } else if (a % 2 == 0) {
      reset = 1
      clearInterval(myFunc)
      totalSecond = 0
    }
  }
}
document.body.onkeydown = function (e) {
  if (e.keyCode == 32) {
    second.style.color = "rgb(153, 255, 102)"
    milisecond.style.color = "rgb(153, 255, 102)"
    minutes.style.color = "rgb(153, 255, 102)"
    document.getElementById("semicolon1").style.color = "rgb(153, 255, 102)"
    document.getElementById("semicolon2").style.color = "rgb(153, 255, 102)"
    if (reset == 0) {
      milisecond.innerHTML = "00"
      second.innerHTML = "00"
      minutes.innerHTML = "00"
    }
  }
}
