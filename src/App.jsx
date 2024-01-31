import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header, Private, NotFound } from './components';
import { CreateListing, Home, ListingDetails, ListingGallery, Profile, Search, SignIn, SignUp, UpdateListing, Verification, VerificationConfirm } from './pages'

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/sign-in" element={<SignIn />} />
        <Route exact path="/sign-up" element={<SignUp />} />
        <Route exact path="/verification/:id" element={<Verification />} />
        <Route exact path="/verification-confirm/:id/:token" element={<VerificationConfirm />} />
        <Route exact path="/listing/:id" element={<ListingDetails />} />
        <Route exact path="/search" element={<Search />} />
        <Route element={<Private />}>
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/listing/create" element={<CreateListing />} />
          <Route exact path="/listing/update/:id" element={<UpdateListing />} />
          <Route exact path="/listing/gallery" element={<ListingGallery />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App