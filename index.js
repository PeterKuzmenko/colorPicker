const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const pointer = document.getElementById('pointer')

const colorOutput = document.getElementById('color')
const rgbOutput = document.getElementById('rgb')
const hexOutput = document.getElementById('hex')

const cWidth = canvas.offsetWidth
const cHeight = canvas.offsetHeight

let color, cR, cG, cB

let gradient = ctx.createLinearGradient(0, 0, cWidth, cHeight)

gradient.addColorStop(0, 'yellow')
gradient.addColorStop(1, 'red')

ctx.fillStyle = gradient;
ctx.fillRect(0, 0, cWidth, cHeight)

color = ctx.getImageData(0, 0, 1, 1).data
cR = color[0]
cG = color[1]
cB = color[2]

pointer.style.background = `rgb(${cR}, ${cG}, ${cB})`

function mousedown(e) {
    const x = e.offsetX
    const y = e.offsetY

    color = ctx.getImageData(x, y, 1, 1).data
    cR = color[0]
    cG = color[1]
    cB = color[2]

    pointer.style.background = rgbToHex(cR, cG, cB)
    colorOutput.style.background = rgbToHex(cR, cG, cB)
    rgbOutput.innerText = `rgb(${cR}, ${cG}, ${cB})`
    hexOutput.innerText = rgbToHex(cR, cG, cB)

    pointer.style.left = `${x-10}px`
    pointer.style.top = `${y-10}px`
}

canvas.addEventListener('mousedown', e => {
    const x = e.offsetX
    const y = e.offsetY

    color = ctx.getImageData(x, y, 1, 1).data
    cR = color[0]
    cG = color[1]
    cB = color[2]

    renderResult(cR, cG, cB)

    pointer.style.left = `${x-10}px`
    pointer.style.top = `${y-10}px`

    canvas.addEventListener('mousemove', mousedown)
    document.addEventListener('mouseup', e => {
        canvas.removeEventListener('mousemove', mousedown)
    })
})

function renderResult(cR, cG, cB) {
    pointer.style.background = rgbToHex(cR, cG, cB)
    colorOutput.style.background = rgbToHex(cR, cG, cB)
    rgbOutput.innerText = `rgb(${cR}, ${cG}, ${cB})`
    hexOutput.innerText = rgbToHex(cR, cG, cB)
}

//convertation to hex
function componentToHex(c) {
    let hex = c.toString(16)
    return hex.length == 1 ? "0" + hex : hex
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b)
}

//line to choose color
const line = document.getElementById('line')
const ctxLine = line.getContext('2d')

const pointerLine = document.getElementById('line-pointer')

gradient = ctxLine.createLinearGradient(0, 0, 400, 10)

gradient.addColorStop(0, 'red')
gradient.addColorStop(0.2, 'yellow')
gradient.addColorStop(0.4, 'green')
gradient.addColorStop(0.6, 'blue')
gradient.addColorStop(0.8, 'purple')
gradient.addColorStop(1, 'red')

ctxLine.fillStyle = gradient
ctxLine.fillRect(0, 0, 400, 10)

line.addEventListener('mousedown', e => {
    const x = e.offsetX

    color = ctxLine.getImageData(x, 5, 1, 1).data
    cR = color[0]
    cG = color[1]
    cB = color[2]

    pointerLine.style.background = rgbToHex(cR, cG, cB)
    pointerLine.style.left = `${x-5}px`
    renderResult(cR, cG, cB)

    setColor(rgbToHex(cR, cG, cB))

    document.addEventListener('mousemove', mousedownLine)
    document.addEventListener('mouseup', e => {
        document.removeEventListener('mousemove', mousedownLine)
    })
})

function setColor(color) {
    ctx.clearRect(0, 0, cWidth, cHeight);

    gradient = ctxLine.createLinearGradient(0, 0, 0, cHeight)

    gradient.addColorStop(0, 'rgb(255, 255, 255)')
    gradient.addColorStop(1, 'rgb(0, 0, 0)')

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 400, 300)

    gradient = ctxLine.createLinearGradient(cWidth, 0, 0, cHeight)

    gradient.addColorStop(0, color)
    gradient.addColorStop(1, 'transparent')

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, cWidth, cHeight)

    let pointerX = pointer.style.left ? +pointer.style.left.match(/[0-9]/g).join('') : 0
    let pointerY = pointer.style.top ? +pointer.style.top.match(/[0-9]/g).join('') : 0

    color = ctx.getImageData(pointerX, pointerY, 1, 1).data
    cR = color[0]
    cG = color[1]
    cB = color[2]

    pointer.style.background = rgbToHex(cR, cG, cB)
}

function mousedownLine(e) {
    let x = e.offsetX

    if (e.target.id === 'line-pointer') {
        x += +e.target.style.left.match(/[0-9]/g).join('')
    }

    if (x >= 390) {
        return x
    }

    color = ctxLine.getImageData(x, 5, 1, 1).data
    cR = color[0]
    cG = color[1]
    cB = color[2]

    pointerLine.style.background = rgbToHex(cR, cG, cB)
    pointerLine.style.left = `${x-5}px`
    renderResult(cR, cG, cB)

    setColor(rgbToHex(cR, cG, cB))
}