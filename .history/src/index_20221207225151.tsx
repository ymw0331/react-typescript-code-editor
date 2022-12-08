import 'bulmaswatch/superhero/bulmaswatch.min.css'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store } from './state'
import CellList from './components/text-c'

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <CellList/>
      </div >
    </Provider>
  )

}

ReactDOM.render(
  <App />
  , document.querySelector("#root")
)
