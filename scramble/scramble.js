Array.prototype.containArray = function (arr) {
    for (var i2 = 0; i2 < arr.length; i2++) {
        if (this.includes(arr[i2])) {
            return true
        } else {
            return false
        }
    }
}

var getScramble = () => {
    const scrambleLetter = ["U", "D", "F", "B", "R", "L"]
    const scrambleAfter = [
        ["'", ""],
        ["2", "'"],
    ]
    const scramblePair = [
        ["F", "B"],
        ["R", "L"],
        ["D", "U"],
    ]
    var scramble = []
    const scrambleLength = 21
    var a = 0
    var getRandomBetween = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
    while (a < scrambleLength) {
        a++
        scramble.push([
            scrambleLetter[getRandomBetween(0, 5)],
            scrambleAfter[getRandomBetween(0, 1)][getRandomBetween(0, 1)],
        ])
    }
    for (let i = 0; i < scramble.length - 1; i++) {
        if (scramble[i][0] == scramble[i + 1][0]) {
            scramble[i + 1][0] = scrambleLetter.filter(
                (value) => value != scramble[i][0]
            )[getRandomBetween(0, 4)]
        }
    }
    for (var index = 0; index < scramble.length - 2; index++) {
        if (
            scramblePair[0].containArray(scramble[index]) &&
            scramblePair[0].containArray(scramble[index + 1]) &&
            scramblePair[0].containArray(scramble[index + 2])
        ) {
            scramble[index + 2][0] =
                scramblePair[getRandomBetween(1, 2)][getRandomBetween(0, 1)]
        } else if (
            scramblePair[1].containArray(scramble[index]) &&
            scramblePair[1].containArray(scramble[index + 1]) &&
            scramblePair[1].containArray(scramble[index + 2])
        ) {
            scramble[index + 2][0] =
                scramblePair[[0, 2][getRandomBetween(0, 1)]][
                    getRandomBetween(0, 1)
                ]
        } else if (
            scramblePair[2].containArray(scramble[index]) &&
            scramblePair[2].containArray(scramble[index + 1]) &&
            scramblePair[2].containArray(scramble[index + 2])
        ) {
            scramble[index + 2][0] =
                scramblePair[getRandomBetween(0, 1)][getRandomBetween(0, 1)]
        }
    }
    scramble.forEach((value, index, array) => {
        array[index] = value.join("")
    })
    return scramble.join(" ")
}
export { getScramble }
