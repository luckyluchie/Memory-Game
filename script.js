const memoryGrid = document.querySelector('.memory-grid')
const btnRestart = document.querySelector('.restart')

let gameTable = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0]
]



let gameTableReturn = randomTableGenerator()

let previousSelection = []
let nbShowed = 0
let ok = true

// clics counter
const counter = document.querySelector('.counter')
let scoreCounter = 0

// Restart Game
btnRestart.addEventListener('click', function() {
  document.location.reload()
})

showGameTable()

function showGameTable () {
  let content = ''

  for (let i = 0; i < gameTable.length; i++) {
    content += "<div>"
    for (let j = 0; j < gameTable[i].length; j++) {
      if (gameTable[i][j] === 0){
        content += "<button onClick='verif(\""+i+"-"+j+"\")'>Memory</button>"
      } else {
        content += "<img src='"+getImage(gameTable[i][j])+"'>"
      }
    } 
    content += "</div>"
  }
  memoryGrid.innerHTML = content
}

function getImage(value) {
  let imgContent = ""
  switch (value) {
    case 1 : imgContent = "images/14-18-plaque.png"
    break;
    case 2 : imgContent = "images/croix.jpg"
    break;
    case 3 : imgContent = "images/croix-cimetiere.jpg"
    break;
    case 4 : imgContent = "images/ecole1962.jpg"
    break;
    case 5 : imgContent = "images/eglise.png"
    break;
    case 6 : imgContent = "images/fusion.jpg"
    break;
    case 7 : imgContent = "images/logo.jpg"
    break;
    case 8 : imgContent = "images/page-de-couv.jpg"
    break;
    default : console.log('error')
  }
  return imgContent
}

// function called onClick images buttons
function verif(bouton) {
  scoreCounter++
  counter.innerHTML = `<span>Vous avez cliqué ${scoreCounter} fois</span>`
  if (ok) {
    nbShowed++

    let row = bouton.substr(0,1)
    let col = bouton.substr(2,1)

    gameTable[row][col] = gameTableReturn[row][col]
    showGameTable()

    if (nbShowed > 1) {
      ok = false
      // hide images after 1s if they are not the same
      setTimeout(() => {
        if (gameTable[row][col] !== gameTableReturn[previousSelection[0]]       [previousSelection[1]]) {
          gameTable[row][col] = 0
          gameTable[previousSelection[0]][previousSelection[1]] = 0
        }
        showGameTable()
        ok = true
        nbShowed = 0
        previousSelection = [row, col]
      }, 1000)
    } else {
      previousSelection = [row, col]
    } 
}
}

// Place images randomly
function randomTableGenerator () {
  let table = []
  let imgPosition = [0, 0, 0, 0, 0, 0, 0, 0]

  for (let i = 0; i < 4; i++) {
    let row = []
    for (let j = 0; j < 4; j++) {
      let end = false
      while (!end) {
        let randomImage = Math.floor(Math.random() * 8)
        // to be sure that tere is only to example of one image
        if (imgPosition[randomImage] < 2) {
          row.push(randomImage+1)
          imgPosition[randomImage]++
          end = true
        }
      }
    }
    table.push(row)
  }
  return table
}
