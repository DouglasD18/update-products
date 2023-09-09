import { Dropzone } from "./components/dropzone"
import { Provider } from "./context/Provider"

function App() {
  return (
    <Provider>
      <Dropzone />
    </Provider>
  )
}

export default App
