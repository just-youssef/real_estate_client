import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header, Private } from './components';
import { Home, Profile, SignIn, SignUp, Verification, VerificationConfirm } from './pages'

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route element={<Private />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/verification/:id" element={<Verification />} />
        <Route path="/verification-confirm/:id/:token" element={<VerificationConfirm />} />
      </Routes>
    </Router>
  )
}

export default App