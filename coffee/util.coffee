class roundFrame extends Group
  # w:width, h:height, r:radius
  constructor:(w, h, r)->
    super()
    sur = new Surface(w, h)
    ctx = sur.context
    ctx.lineWidth = 5
    ctx.fillStyle = "#ff8c00"
    ctx.beginPath()
    ctx.moveTo(r, 0)
    ctx.lineTo(w - r, 0)
    ctx.arc(w - r, r, r, Math.PI*1.5, 0, false)
    ctx.lineTo(w, h - r)
    ctx.arc(w - r, h - r, r, 0, Math.PI*0.5, false)
    ctx.lineTo(r, h)
    ctx.arc(r, h - r, r, Math.PI*0.5, Math.PI, false)
    ctx.lineTo(0, r)
    ctx.arc(r, r, r, Math.PI, Math.PI*1.5, false)
    ctx.closePath()
    ctx.fill()

    sp = new Sprite(w, h)
    sp.image = sur
    sp.opacity = 0.4
    @addChild sp

class MessageView extends roundFrame
  constructor:->
    super(310, 26, 5)
    lbl = new Label("")
    lbl.font = "12px sans-serif"
    lbl.color = "white"
    lbl.x = 5
    lbl.width = 310 - 5*2
    lbl.height = 24
    @addChild lbl
    @setText = (text)->
      lbl.text = text
  setText:(text)->
    @setText text
    
