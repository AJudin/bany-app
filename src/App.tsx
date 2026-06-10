import { Routes, Route, useLocation } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Home } from '@/pages/Home';
import { About } from '@/pages/About';
import { Production } from '@/pages/Production';
import { Catalog } from '@/pages/Catalog';
import { Privacy } from '@/pages/Privacy';
import { Consent } from '@/pages/Consent';
import { AdminPage } from '@/pages/Admin';

function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="flex min-h-screen flex-col">
      {!isAdmin && <Header />}
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/production" element={<Production />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/consent" element={<Consent />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>
      {!isAdmin && <Footer />}
    </div>
  );
}

export default App;
