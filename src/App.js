import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import ImageSlider from './components/ImageSlider';
import BioSection from './components/BioSection';
import PriceEstimator from './components/PriceEstimator';
import CallbackForm from './components/CallbackForm';
import ReviewsSlider from './components/ReviewsSlider';
import AdminPage from './pages/AdminPage';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={
            <>
              <ImageSlider />
              <BioSection />
              <PriceEstimator />
              <CallbackForm />
              <ReviewsSlider />
            </>
          } />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

