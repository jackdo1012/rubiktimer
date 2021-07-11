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
  document.body.style.visibility = "hidden"
  timer.style.visibility = "visible"

  document.getElementById("semicolon1").style.fontSize = "10vw"
  document.getElementById("semicolon2").style.fontSize = "10vw"
  minutes.style.fontSize = "10vw"
  seconds.style.fontSize = "10vw"
  milliseconds.style.fontSize = "10vw"
  timer.style.position = "relative"
  timer.style.gridRow = "3/ span 2"
  timer.style.gridColumn = "2/ span 2"
  timer.style.textAlign = "center"
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
export { setTime, pad }
