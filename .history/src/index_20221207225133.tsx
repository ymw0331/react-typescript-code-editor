import 'bulmaswatch/superhero/bulmaswatch.min.css'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store } from './state'
import TextEditor from './components/text-editor'
import CodeCell from './components/code-cell'

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <CellList>
        <TextEditor />
      </div >
    </Provider>
  )

}

ReactDOM.render(
  <App />
  , document.querySelector("#root")
)

