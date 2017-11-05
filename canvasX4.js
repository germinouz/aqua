let canvas = document.querySelector('canvas')
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let c = canvas.getContext("2d")

// fini ne plus toucher
function circCentral(dRad, rad, which, offset){
    this.x = innerWidth / 2
    this.y = innerHeight / 2
    this.dRad = dRad
    this.rad = Math.abs(rad)
    this.isLeft = (which < 0.5)
    this.offset = offset
    
    this.alpha = 1

    let max = Math.hypot(innerWidth / 2, innerHeight / 2) * 2

    this.draw = function() {
        c.beginPath()
        let posX = 0
        let posY = 0

        let grad = c.createRadialGradient(posX + this.rad, posY + this.rad / 2, 1, posX,posY,2.5 * this.rad)
        grad.addColorStop(0, 'rgba(120, 120, 250, '+ this.alpha +')')
        grad.addColorStop(1, 'rgba(0, 0, 255, 0.00)')

        posX = innerWidth / 1.25
        posY = innerHeight / 1.14
        let gra = c.createRadialGradient(posX - this.rad ,posY - this.rad + this.offset,1, posX,posY, 4 * this.rad / this.offset * 0.5 )
        gra.addColorStop(0, 'rgba(250, 220, 200, '+ this.alpha +')')
        gra.addColorStop(1, 'rgba(0, 0, 250, 0.00)')

        c.arc(this.x , this.y, this.rad , 0, Math.PI * 2, false)

        c.fillStyle =  this.isLeft ? grad : gra
        c.fill()
    }
    this.up = function() {
        
        this.rad += dRad
        this.alpha = 1 - this.rad / max
        if(this.rad > max)
            this.rad = dRad
        else if(this.rad < 0)
            this.rad = max
        
        this.draw()
    }
}


function bulle(x, y, dx, dy, dRad, rad, max ){
    this.x = x
    this.y = y
    this.dx = dx
    this.dy = dy
    this.dRad = dRad
    this.rad = Math.abs(rad)
    this.alpha = 1
    this.max = max

    this.draw = function() {
        c.beginPath()
        let posX = 0
        let posY = 0

        let grad = c.createRadialGradient(posX + this.rad , posY + this.rad / this.y, 1, posX,posY,2.5 * this.rad)
        grad.addColorStop(0, 'rgba(50, 50, 70, '+this.alpha * 2+')')
        grad.addColorStop(1, 'rgba(5, 134, 170, 0.01)')

        c.arc(this.x , this.y, this.rad , 0, Math.PI * 2, false)

        c.fillStyle = grad
        c.fill()
    }
    this.up = function() {
        this.rad += dRad
        this.alpha = 1 - this.rad / this.max
        if(this.rad > this.max){
            this.rad = dRad
            this.x = Math.random() * innerWidth
            let y = Math.random() * innerHeight
        }
        else if(this.rad < 0){
            this.rad = this.max
            this.x = Math.random() * innerWidth
            this.y = Math.random() * innerHeight
        }
        
        this.draw()
    }
}

function planet(){
    
}

let antiCentral = []
let q = 50
let s = 10
//for(let i = 0; i < q; i++)
//    antiCentral.push(new circCentral( - (i / q) * (Math.random() * 3), s * Math.random() * 2.9, Math.random(), Math.random() ))

let central = []
for(let i = 0; i < q; i++)
    central.push(new circCentral((i / q) * (Math.random() * 3), i + s * Math.random() * 2.9, Math.random(), Math.random() ))

let bulles = []
for(let i = 0; i < 20; i++){
    let x = Math.random() * innerWidth
    let y = Math.random() * innerHeight
    bulles.push(new bulle(x, y, 0,0, Math.random() * 2, 1, Math.random() * innerHeight))
}

function anim(){
    requestAnimationFrame(anim)
    c.clearRect(0, 0, innerWidth, innerHeight)
    //for (let i = 0; i < antiCentral.length; i++)
    //     antiCentral[i].up()
    for (let i = 0; i < central.length; i++)
        central[i].up()

    for (let i = 0; i < bulles.length; i++)
        bulles[i].up()
}
anim()