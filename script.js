const cvs = document.getElementById("infms");
const ctx = cvs.getContext("2d");

let grid = [[
    {mine: false, shown: false, flag: false}, {mine: false, shown: false, flag: false}, {mine: false, shown: false, flag: false}
],[ {mine: false, shown: false, flag: false}, {mine: false, shown: false, flag: false}, {mine: false, shown: false, flag: false}
],[ {mine: false, shown: false, flag: false}, {mine: false, shown: false, flag: false}, {mine: false, shown: false, flag: false}
]]
let active = true
let cam = {x: 0, y: 0, zoom: 0}

function getNumber(x, y) {
  if (x * y == 0 || x == grid[0].length - 1 || y == grid.length - 1) return null
  let num = 0
  for (let dx = -1; dx <= 1; dx ++) for (let dy = -1; dy <= 1; dy ++) if (grid[y+dy][x+dx].mine) num ++
}
function getFlags(x, y) {
  if (x * y == 0 || x == grid[0].length - 1 || y == grid.length - 1) return null
  let num = 0
  for (let dx = -1; dx <= 1; dx ++) for (let dy = -1; dy <= 1; dy ++) if (grid[y+dy][x+dx].flag) num ++
}

function extend(dir) {
  let ext = []
  switch (dir) {
    case "UP":
      for (let i = 0; i < grid[0].length; i ++)
        ext = ext.concat({mine: (Math.random() < 0.1), shown: false, flag: false})
      grid = [ext].concat(grid)
      cam.y += 1
      break
    case "RIGHT":
      for (let i = 0; i < grid.length; i ++)
        grid[i] = grid[i].concat({mine: (Math.random() < 0.1), shown: false, flag: false})
      break
    case "DOWN":
      for (let i = 0; i < grid[0].length; i ++)
        ext = ext.concat({mine: (Math.random() < 0.1), shown: false, flag: false})
      grid = grid.concat([ext])
      break
    case "LEFT":
      for (let i = 0; i < grid.length; i ++)
        grid[i] = [{mine: (Math.random() < 0.1), shown: false, flag: false}].concat(grid[i])
      cam.x += 1
      break
  }
}

function uncover(x, y) {
  if (x < 0 || y < 0 || x >= grid[0].length || y >= grid.length) return
  if (!active || grid[y][x].flag) return
  if (grid[y][x].mine) {
    active = false
  }
  if (x == 0) extend("LEFT")
  else if (x == grid[0].length) extend("RIGHT")
  if (y == 0) extend("UP")
  else if (y == grid.length) extend("DOWN")
}
function flag(x, y) {
  if (x < 0 || y < 0 || x >= grid[0].length || y >= grid.length) return
  if (!active) return
  grid[y][x].flag = !grid[y][x].flag
}

function drawMine(gridX, gridY) {
  let trueZ = 2 ** cam.zoom * 15
  let cenX = (gridX - cam.x - grid[0].length/2) * trueZ + 150
  let cenY = (gridY - cam.y - grid.length/2) * trueZ + 75
  ctx.fillStyle = (grid[gridY][gridX].shown ? "darkgray" : "lightgray")
  ctx.fillRect(cenX - trueZ/2, cenY - trueZ/2, trueZ, trueZ)
  ctx.strokeStyle = "darkgray"
  ctx.strokeRect(cenX - trueZ/2, cenY - trueZ/2, trueZ, trueZ)
}

setInterval(function() {
  for (let x = 0; x < grid[0].length; x ++) for (let y = 0; y < grid.length; y ++) drawMine(x, y)
}, 50)

uncover(1, 1)