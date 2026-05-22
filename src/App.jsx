import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './layout/Sidebar';
import Home from './pages/Home';
import BookStart from './components/MachineLearning/start/BookStart';
import BookReader from './pages/BookReader';

function App() {
  return (
    <div className="flex bg-[#0b0f19] h-screen overflow-hidden font-sans antialiased text-slate-200">
      
      {/* বাম পাশে সাইডবার (সবার জন্য কমন থাকবে) */}
      <Sidebar />
      
      {/* ডান পাশে রাউটের উপর ভিত্তি করে পেজ লোড হবে */}
      <main className="relative flex flex-col flex-1 overflow-hidden">
        <Routes>
          {/* হোম পেজ */}
          <Route path="/" element={<Home />} />
          
          {/* রিমিশা ও তার বাবার গল্প (সূচনা পর্ব) */}
          <Route path="/start" element={<BookStart />} />
          
          {/* ডাইনামিক ওয়ার্ড পেজ (যেমন: /word/artificial-intelligence) */}
          <Route path="/word/:wordPath" element={<BookReader />} />
          
          {/* 404 / অন্য কোনো পাথে গেলে হোমে ফিরে যাবে */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

    </div>
  );
}

export default App;