import React, {
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef
} from 'react'

const sCode =
  'A,B,C,E,F,G,H,I,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0,q,w,e,r,t,y,u,i,o,p,a,s,d,f,g,h,j,k,z,x,c,v,b,n,m'

const VerificationCode = forwardRef((props, ref) => {
  // const showNumber = [] // 显示验证码
  const [showNumber, setShowNumber] = useState([]) // 显示验证码

  const canvasRef = useRef()

  useEffect(() => {
    drawCanvas()
  }, [])

  const refreshCode = () => {
    drawCanvas()
  }

  const drawCanvas = () => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    const { canvasWidth, canvasHeight } = props || {}
    canvas.width = canvasWidth
    canvas.height = canvasHeight
    const aCode = sCode.split(',')
    const aLength = aCode.length

    for (let i = 0; i <= 3; i++) {
      const index = Math.floor(Math.random() * aLength) // 随机code索引
      const deg =
        ((Math.random() * 30 * Math.PI) / 180) * (Math.random() <= 0.5 ? -1 : 1) // 随机弧度
      const text = aCode[index] // 显示文本
      showNumber[i] = text
      setShowNumber(showNumber)
      const x = 10 + i * 20
      const y = 20 + Math.random() + 8 // 文字在canvas的x, y坐标
      context.font = 'bold 18px PingFangSC-Regular,PingFang SC'

      context.translate(x, y)
      context.rotate(deg)

      context.fillStyle = randomColor()
      context.fillText(text, 0, 0)

      context.rotate(-deg)
      context.translate(-x, -y)
    }
    // 验证码上显示线条
    // for (let i = 0; i <= 5; i++) {
    //   context.strokeStyle = randomColor()
    //   context.beginPath()
    //   context.moveTo(
    //     Math.random() * canvasWidth,
    //     Math.random() * canvasHeight
    //   )
    //   context.lineTo(
    //     Math.random() * canvasWidth,
    //     Math.random() * canvasHeight
    //   )
    //   context.stroke()
    // }

    // 验证码上显示小点
    for (let i = 0; i <= 30; i++) {
      context.strokeStyle = randomColor()
      context.beginPath()
      const x = Math.random() * canvasWidth
      const y = Math.random() * canvasHeight
      context.moveTo(x, y)
      context.lineTo(x + 1, y + 1)
      context.stroke()
    }
  }

  const randomColor = () => {
    const r = Math.floor(Math.random() * 256)
    const g = Math.floor(Math.random() * 256)
    const b = Math.floor(Math.random() * 256)
    return `rgb(${r},${g},${b})`
  }

  useImperativeHandle(ref, () => ({
    getShowNumber: () => showNumber,
    drawCanvas: () => drawCanvas()
  }))

  return (
    <div className="code-body">
      <canvas ref={canvasRef} onClick={refreshCode} />
    </div>
  )
})

export default VerificationCode
