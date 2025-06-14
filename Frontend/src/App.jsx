import { UserProvider } from './contexts/User'
import Index from './pages/index'
function App() {

  return (
    <>
      <UserProvider>
        <Index />
      </UserProvider>
    </>
  )
}

export default App
