import * as esbuild from 'esbuild-wasm'
import { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'


const App = () => {
  const ref = useRef<any>()
  const [input, setInput] = useState<any>('');
  const [code, setCode] = useState('')

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: '/esbuild.wasm'
    })
  }


  useEffect(() => {
    startService()
  }, [])

  const onClick = () => {
    if (!ref.cuurent) {
      return;
    }
  }
  return (<div>
    <textarea value={input} onChange={(e) => setInput(e.target.value)} ></textarea>
    <div>
      <button onClick={onClick} >Submit</button>
    </div>
    <pre>
      {code}
    </pre>
  </div>)
}

ReactDOM.render(
  <App />
  , document.querySelector("#root")
)

