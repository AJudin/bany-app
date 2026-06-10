import { Routes, Route } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Home } from '@/pages/Home';
import { About } from '@/pages/About';
import { Production } from '@/pages/Production';
import { Catalog } from '@/pages/Catalog';
import { Privacy } from '@/pages/Privacy';
import { Consent } from '@/pages/Consent';

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/production" element={<Production />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/consent" element={<Consent />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
