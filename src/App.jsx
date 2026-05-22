import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './layout/Sidebar';
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';
import Home from './pages/Home';
import BookStart from './components/MachineLearning/start/BookStart';
import BookReader from './pages/BookReader';

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    // পুরো স্ক্রিনকে একটি কলাম ফ্লেক্স কন্টেইনার হিসেবে ধরছি
    <div className="flex flex-col bg-[#0b0f19] h-screen overflow-hidden font-sans antialiased text-slate-200">
      
      {/* গ্লোবাল ন্যাভবার (সবার উপরে থাকবে) */}
      <Navbar onMenuClick={() => setIsMobileMenuOpen(true)} />
      
      {/* ন্যাভবারের নিচের অংশ: সাইডবার এবং মূল কনটেন্ট */}
      <div className="relative flex flex-1 overflow-hidden">
        
        {/* বাম পাশে সাইডবার */}
        <Sidebar 
          isMobileOpen={isMobileMenuOpen} 
          closeMobileMenu={() => setIsMobileMenuOpen(false)} 
        />
        
        {/* ডান পাশে মেইন রাউটার ভিউ */}
        <main className="flex-1 overflow-y-auto custom-scrollbar relative bg-[#0b0f19]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/start" element={<BookStart />} />
            <Route path="/word/:wordPath" element={<BookReader />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        
      </div>

      <Footer />
    </div>
  );
}

export default App;