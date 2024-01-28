import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header, Private } from './components';
import { CreateListing, Home, ListingDetails, Profile, SignIn, SignUp, UpdateListing, Verification, VerificationConfirm } from './pages'

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/verification/:id" element={<Verification />} />
        <Route path="/verification-confirm/:id/:token" element={<VerificationConfirm />} />
        <Route path="/listing/:id" element={<ListingDetails />} />
        <Route element={<Private />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/listing/create" element={<CreateListing />} />
          <Route path="/listing/update/:id" element={<UpdateListing />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App