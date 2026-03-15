import React from "react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";
import AuthProvider from "./context/AuthContext";
import Loader from "./components/Loader";

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <div className="app-container">
        <Navbar />
        <div className="main-content">
          <React.Suspense fallback={<Loader />}>
            <AppRoutes />
          </React.Suspense>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
