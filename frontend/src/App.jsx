import Home from "./pages/Home"
import { Toaster } from "sonner"

function App() {
  return (
    <>
      <Home />
      <Toaster richColors closeButton position="top-right" />
    </>
  )
}

export default App
