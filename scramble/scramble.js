var getScramble = () => {
  const scrambleLetter = ["U", "D", "F", "B", "R", "L"]
  const scrambleAfter = [
    ["'", ""],
    ["2", "'"],
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
  scramble.forEach((value, index, array) => {
    array[index] = value.join("")
  })
  return scramble.join(" ")
}
export { getScramble }
