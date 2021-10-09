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
var mediaQuery1 = window.matchMedia("(max-width: 800px)")
var totalSecond = 0
var a = 0
var reset = true
var solves = []
var scrambles = []
var run = false
;(() => {
	scramble()
	pen.disabled = true
	meanOfFiveButton.disabled = false
	averageOfFiveButton.disabled = false
	font.disabled = false
	ao5Button.addEventListener("click", ao5Hide)
	mo5Button.addEventListener("click", mo5Hide)
})()
function setTime() {
	import("./setTime.js").then((response) => {
		return response.setTime()
	})
}

function pad() {
	import("./setTime.js").then((response) => {
		return response.pad()
	})
}

function scramble() {
	import("../scramble/scramble.js").then((response) => {
		var scramble = response.getScramble()
		scrambles.push(scramble)
		document.querySelector("#scramble-text").innerHTML = scramble
	})
}

var statShow = () => {
	document.body.querySelector("#numOfSolves").innerHTML = `Solves: ${
		solves.filter((value) => value != "DNF").length
	}/${solves.length}`
	if (solves.includes("DNF")) {
		document.querySelector("#worst").innerHTML = "Worst: DNF"
		document.querySelector("#best").innerHTML =
			"Best: " + Math.min(...solves.filter((value) => value != "DNF"))
	} else {
		document.querySelector("#best").innerHTML =
			"Best: " + Math.min(...solves)
		document.querySelector("#worst").innerHTML =
			"Worst: " + Math.max(...solves)
	}
}

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
		}
	},
	false
)

var whenKeyUp = () => {
	import("./whenKeyIsUp.js").then((response) => response.whenKeyIsUp())
}
var whenKeyPress = () => {
	import("./whenKeyIsPress.js").then((response) => response.whenKeyIsPress())
}
var whenKeyHold = () => {
	import("./whenKeyIsHold.js").then((response) => response.whenKeyIsHold())
}
document.body.onkeyup = function (e) {
	// when you press space and the key is up
	if (e.keyCode == 32) {
		whenKeyUp()
	}
}
document.body.onkeypress = function (e) {
	if (e.keyCode == 32) {
		whenKeyPress()
	}
}
document.body.onkeydown = function (e) {
	pen.checked = false
	pen.disabled = true
	meanOfFiveButton.disabled = true
	averageOfFiveButton.disabled = true
	font.disabled = true
	if (e.keyCode == 32) {
		whenKeyHold()
	}
}

timer.ontouchend = () => {
	whenKeyUp()
}

timer.ontouchstart = () => {
	pen.checked = false
	pen.disabled = true
	meanOfFiveButton.disabled = true
	averageOfFiveButton.disabled = true
	font.disabled = true
	whenKeyHold()
	whenKeyPress()
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
