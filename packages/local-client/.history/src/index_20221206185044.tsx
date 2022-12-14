import 'bulmaswatch/superhero/bulmaswatch.min.css'
import * as esbuild from 'esbuild-wasm'
import { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin'
import { fetchPlugin } from './plugins/fetch-plugin'
import CodeEditor from './components/code-editor'
import Preview from './components/preview'

const App = () => {
  const ref = useRef<any>()
  const [input, setInput] = useState<any>('')

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm'
    })

  }
  useEffect(() => {
    startService()
  }, [])

  const onClick = async () => {
    if (!ref.current) {
      return;
    }



    const result = await ref.current.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [
        unpkgPathPlugin(),
        fetchPlugin(input)
      ],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window',
      }
    })

    // console.log(result)


  }



  return (
    <div>
      <CodeEditor
        initialValue='const a = 1;'
        onChange={(value) => setInput(value)}
      />
      <textarea
        value={input}
        onChange={(e) =>
          setInput(e.target.value)
        }
      >
      </textarea>
      <div>
        <button onClick={onClick} >Submit</button>
      </div>
      <Preview />
    </div >
  )
}

ReactDOM.render(
  <App />
  , document.querySelector("#root")
)

