import { Route, Routes } from "react-router-dom"
import { Header } from "./components/Header"
import { PrivateRoute } from "./components/PrivateRoute"
import { Home } from "./pages/ Home"
import { Tutores } from "./pages/Tutores"
import { TutorForm } from "./pages/TutorForm"
import { Animais } from "./pages/Animais"
import { Login } from "./pages/Login"
import { Cadastro } from "./pages/Cadastro"
import { AnimaisForm } from "./pages/AnimaisForm"

// Componente principal da aplicação
function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      
      <Header />

      <main className="max-w-6xl mx-auto p-8">
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/cadastro" element={<Cadastro />}></Route>
          <Route path="*" element={<Login />}></Route>
          <Route path="/AnimalHotel" element={<Login />}></Route>
          <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>}></Route>
          <Route path="/animais" element={<PrivateRoute><Animais /></PrivateRoute>}></Route> 
          <Route path="/animais/cadastro" element={<PrivateRoute><AnimaisForm /></PrivateRoute>}></Route>
          <Route path="/animais/editar/:id" element={<PrivateRoute><AnimaisForm /></PrivateRoute>}></Route>
          <Route path="/tutores" element={<PrivateRoute><Tutores /></PrivateRoute>}></Route>
          <Route path="/tutores/cadastro" element={<PrivateRoute><TutorForm /></PrivateRoute>}></Route>
          <Route path="/tutores/editar/:id" element={<PrivateRoute><TutorForm /></PrivateRoute>}></Route>
        </Routes>
      </main>

    </div>
  )
}

export default App
