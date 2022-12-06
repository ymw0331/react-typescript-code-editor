import * as esbuild from 'esbuild-wasm'
import { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin'
import { fetchPlugin } from './plugins/fetch-plugin'

const App = () => {
  const ref = useRef<any>()
  const iframe = useRef<any>()
  const [input, setInput] = useState<any>('')
  const [code, setCode] = useState('')

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
    // const result = await ref.current.transform(input, {
    //   loader: 'jsx',
    //   target: 'es2015'
    // });

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

    // setCode(result.outputFiles[0].text)
    iframe.current.contentWindow.postMessage(result.outputFiles[0].text, '*')
  }

  const html = `
    <html>
      <head>
      <body>
        <div id="root">
        <script>
          window.addEventListener('message',(event) =>{
            try{
              eval(event.data)
            } catch(err){
              const root = document.querySelector('#root')
            }
          }, false)
        </script>
        </div>
      </body>
      </head>
    </html>
  
  `;

  return (
    <div>
      <textarea value={input} onChange={(e) => setInput(e.target.value)} ></textarea>
      <div>
        <button onClick={onClick} >Submit</button>
      </div>
      <pre>{code}</pre>
      <iframe ref={iframe} sandbox="allow-scripts" srcDoc={html} />
    </div >
  )
}

ReactDOM.render(
  <App />
  , document.querySelector("#root")
)

