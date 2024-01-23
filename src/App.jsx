import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components';
import { Home, Profile, SignIn, SignUp, Verfication } from './pages'

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/verfication/:id" element={<Verfication />} />
      </Routes>
    </Router>
  )
}

export default App