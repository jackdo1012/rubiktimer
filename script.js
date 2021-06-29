var minutes = document.getElementById("minutes")
var second = document.getElementById("seconds")
var milisecond = document.getElementById("miliseconds")
var totalSecond = 0
var a = 0

function setTime() {
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
      myFunc = setInterval(setTime, 10)
    } else if (a % 2 == 0) {
      clearInterval(myFunc)
      totalSecond = 0
    }
  }
}
