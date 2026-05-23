import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './layout/Sidebar';
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';

// পেজগুলো ইমপোর্ট
import Home from './pages/Home/Home';
import LandingPage from './pages/Landing/LandingPage';
import MLTopics from './pages/MLTopics/MLTopics';
import Contact from './pages/Contact/Contact';
import About from './pages/About/About';
import BookReader from './pages/BookReader/BookReader';
import BookStart from './components/MachineLearning/start/BookStart';
import TermsConditions from './pages/Legal/TermsConditions';
import PrivacyPolicy from './pages/Legal/PrivacyPolicy';
import Books from './pages/Books/Books';
function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // কন্ডিশনাল চেক: কোন কোন পেইজে সাইডবার লাগবে?
  // সাধারণত ড্যাশবোর্ড এবং বই পড়ার সময় (word path) সাইডবার দরকার হয়।
  const showSidebar = location.pathname === '/dashboard' || location.pathname.startsWith('/word/');

  // কন্ডিশনাল চেক: কোন পেইজে ফুটার দেখানো যাবে না? (ড্যাশবোর্ড ও রিডার পেইজে ফুটার হাইড থাকবে)
  const showFooter = !showSidebar && !location.pathname.startsWith('/word/');

  useEffect(() => {
    if (!showSidebar) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.pathname, showSidebar]);

  return (
    <div className={`flex flex-col bg-[#0b0f19] font-sans antialiased text-slate-200 ${showSidebar ? 'h-[100dvh] overflow-hidden' : 'min-h-screen overflow-x-hidden'}`}>
      
      {/* গ্লোবাল ন্যাভবার সবসময় উপরে থাকবে */}
      <Navbar onMenuClick={() => setIsMobileMenuOpen(true)} />
      
      <div className={`relative flex flex-1 ${showSidebar ? 'min-h-0 overflow-hidden' : ''}`}>
        
        {/* কন্ডিশন অনুযায়ী সাইডবার রেন্ডার করা হচ্ছে */}
        {showSidebar && (
          <Sidebar 
            isMobileOpen={isMobileMenuOpen} 
            closeMobileMenu={() => setIsMobileMenuOpen(false)} 
          />
        )}
        
        {/* কন্টেন্ট এরিয়া: সাইডবার না থাকলে ফুল উইডথ (w-full) হবে */}
        <div className={`flex-1 flex flex-col bg-[#0b0f19] ${showSidebar ? 'min-h-0 overflow-y-auto custom-scrollbar' : 'w-full'}`}>
          
          <main className="flex-1">
            <Routes>
              {/* ল্যান্ডিং পেইজ (No Sidebar, Has Footer) */}
              <Route path="/" element={<LandingPage />} />
              
              {/* ড্যাশবোর্ড (Has Sidebar, No Footer) */}
              <Route path="/dashboard" element={<Home />} />
              
              {/* এমএল টপিকস, কন্টাক্ট, অ্যাবাউট (No Sidebar, Has Footer) */}
              <Route path="/ml-topics" element={<MLTopics />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              
              {/* ইন্ট্রোডাকশন ও রিডার পেইজ (Has Sidebar, No Footer) */}
              <Route path="/start" element={<BookStart />} />
              <Route path="/word/:wordPath" element={<BookReader />} />
              <Route path="/terms" element={<TermsConditions />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/books" element={<Books />} />

              {/* ডিফল্ট রাউট */}
              <Route path="*" element={<LandingPage />} />
            </Routes>
          </main>

          {/* কন্ডিশন অনুযায়ী ফুটার রেন্ডার করা হচ্ছে */}
          {showFooter && <Footer />}
          
        </div>
      </div>
    </div>
  );
}

export default App;
