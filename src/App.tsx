import { useState , FC} from 'react'

interface Dot{
  x: number;
  y: number;
}

const App: FC = () => {
  const [dots, setDots] = useState<Array<Dot>>([])
  const [clearedDots, setClearedDots] = useState<Array<Dot> | any>([])
  const handleChange = (event: React.MouseEvent<HTMLElement>) => {
    const newArr : Array<Dot> = [...dots, {x: event.clientX, y: event.clientY}]
    setDots(newArr)
  }
  const undo = () => {
    if (dots.length == 0) return
    const newArr = [...dots]
    const arr = clearedDots
    const last = newArr.pop()
    arr.push(last)
    setClearedDots(arr)
    setDots(newArr)
  }
  const redo = () => {
    if(clearedDots.length == 0) return
    const newArr = [...dots]
    const arr = clearedDots
    const last = arr.pop()
    newArr.push(last)
    setClearedDots(arr)
    setDots(newArr)
  }
  const clear = () => {
    setClearedDots([])
    setDots([])
  }
  return (
    <div className="App">
      <div id="btns">
        <button onClick={undo}>UNDO</button>
        <button onClick={redo}>REDO</button>
        <button onClick={clear}>CLEAR</button>
      </div>
      <div id="ground" onClick={(event: React.MouseEvent<HTMLElement>) => {
        handleChange(event)
        setClearedDots([])
        }}>
        {
        dots.map((dot, index:number) => {
          return <div key={index} className="dot" style={{top:dot.y-10, left:dot.x-10}}></div>
        })
      } 
      </div>

    </div>
  )
}

export default App
