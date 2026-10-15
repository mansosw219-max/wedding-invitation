import React, { useState, useEffect } from 'react';
import './App.css';

// رابط الصورة المطلوبة لخلفية السكشن الأول
const heroBgImage = "https://ahmed-aya-wedding-invetaion.vercel.app/hero.webp";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const [weddingData, setWeddingData] = useState(() => {
    const saved = localStorage.getItem('');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { }
    }
    return {
      groom: "Mohamed",
      bride: "Samaa",
      dateString: "28 - 1 - 2027",
      targetDate: "2027-01-28T19:00:00",
      timeString: "7 PM to 8 PM",
      locationName: "Grand Plaza Hall, Cairo, Egypt",
      mapUrl: "https://maps.google.com",
      photos: [
        "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80"
      ]
    };
  });

  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [tempData, setTempData] = useState(weddingData);

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [currentPhotoIdx, setCurrentPhotoIdx] = useState(0);

  useEffect(() => {
    localStorage.setItem('wedding_custom_data', JSON.stringify(weddingData));
  }, [weddingData]);

  useEffect(() => {
    const target = new Date(weddingData.targetDate).getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = target - now;
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [weddingData.targetDate]);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentPhotoIdx((prevIdx) => (prevIdx + 1) % weddingData.photos.length);
    }, 3000);
    return () => clearInterval(slideInterval);
  }, [weddingData.photos.length]);

  const handleOpenInvitation = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsOpen(true);
    }, 750);
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminPassword === "admin2027") {
      setIsAdminLoggedIn(true);
    } else {
      alert("Wrong Password!");
    }
  };

  const handleSaveAdminChanges = (e) => {
    e.preventDefault();
    setWeddingData(tempData);
    setShowAdminModal(false);
    alert("Updated Successfully!");
  };

  // توحيد لون الموقع بالكامل ليكون متناسقاً مع لون الخلفية الموحدة
  const globalSkyBgStyle = {
    background: 'linear-gradient(to bottom, #dbeafe, #eff6ff, #e0f2fe)',
    color: '#334155'
  };

  return (
    <div style={{ ...globalSkyBgStyle, minHeight: '100vh', position: 'relative', fontFamily: "'Poppins', sans-serif" }}>
      
      {/* 1. صفحة الغلاف الأولي (Welcome Modal) */}
      {!isOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(15, 23, 42, 0.65)', backdropFilter: 'blur(6px)', padding: '1rem' }}>
          <div className={`relative w-full max-w-sm bg-[#fefcf8] rounded-2xl shadow-2xl p-6 text-center border border-[#e2e8f0] transition-all duration-700 ${isAnimating ? 'animate-fly-up animate-glow' : ''}`}>
            
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem', marginTop: '0.5rem' }}>
              <div className="w-14 h-14 bg-[#881337] rounded-full flex items-center justify-center shadow-md animate-pulse-heart" style={{ width: '3.5rem', height: '3.5rem', backgroundColor: '#881337', borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg style={{ width: '1.75rem', height: '1.75rem', fill: 'white' }} viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
            </div>

            <h1 className="font-playfair text-3xl font-medium" style={{ fontSize: '1.875rem', color: '#881337', fontWeight: 600 }}>{weddingData.groom}</h1>
            <span style={{ color: '#be123c', fontStyle: 'italic', fontSize: '1.125rem', margin: '0.25rem 0', display: 'block' }}>&</span>
            <h1 className="font-playfair text-3xl font-medium" style={{ fontSize: '1.875rem', color: '#881337', fontWeight: 600 }}>{weddingData.bride}</h1>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '1rem 0' }}>
              <div style={{ height: '1px', width: '4rem', backgroundColor: '#f3e8ff' }}></div>
              <span style={{ margin: '0 0.5rem', fontSize: '0.75rem', color: '#be123c' }}>🌿</span>
              <div style={{ height: '1px', width: '4rem', backgroundColor: '#f3e8ff' }}></div>
            </div>

            <p style={{ color: '#475569', fontSize: '0.875rem', letterSpacing: '0.05em', textTransform: 'uppercase', fontWeight: 500, marginBottom: '0.25rem' }}>{weddingData.dateString}</p>
            <p style={{ color: '#94a3b8', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>Cordially Invites</p>

            <button 
              onClick={handleOpenInvitation}
              style={{ width: '100%', padding: '0.75rem', background: 'linear-gradient(to right, #9f1239, #881337)', color: 'white', borderRadius: '9999px', fontWeight: 500, border: 'none', cursor: 'pointer', textTransform: 'uppercase', fontSize: '0.875rem', letterSpacing: '0.05em', boxShadow: '0 10px 15px -3px rgba(159, 18, 57, 0.3)' }}>
              Open
            </button>
          </div>
        </div>
      )}

      {/* 2. محتوى الموقع بالكامل */}
      <div style={{ filter: !isOpen ? 'blur(5px)' : 'none', userSelect: !isOpen ? 'none' : 'auto', pointerEvents: !isOpen ? 'none' : 'auto', transition: 'all 1s ease' }}>
        
        {/* السكشن الأول: الصورة المطلوبة بالرابط المباشر */}
        <section style={{ 
          minHeight: '100vh', 
          backgroundImage: `url(${heroBgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          textAlign: 'center', 
          padding: '2rem 1rem', 
          position: 'relative' 
        }}>
          
          <div style={{ 
            maxWidth: '24rem', 
            width: '90%', 
            backgroundColor: 'rgba(255, 255, 255, 0.88)', 
            backdropFilter: 'blur(6px)', 
            borderRadius: '1.5rem', 
            padding: '2rem 1.5rem', 
            boxShadow: '0 20px 25px -5px rgba(0,0,0,0.15)', 
            border: '1px solid rgba(255,255,255,0.9)',
            margin: 'auto'
          }}>

            <p className="font-amiri" style={{ fontSize: '1.35rem', color: '#881337', marginBottom: '0.75rem', fontWeight: 'bold' }}>بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>

            <div style={{ width: '5rem', height: '1.5px', backgroundColor: '#be123c', margin: '0 auto 1.25rem auto' }}></div>

            <p style={{ fontWeight: 300, fontSize: '0.7rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#475569', marginBottom: '1rem', lineHeight: 1.6 }}>
              YOU ARE INVITED TO CELEBRATE THE WEDDING OF
            </p>

            <h2 className="font-playfair" style={{ fontSize: '2.25rem', fontWeight: 'bold', color: '#881337', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
              {weddingData.groom} & {weddingData.bride}
            </h2>

            <p style={{ fontSize: '0.8rem', color: '#be123c', fontStyle: 'italic', marginBottom: '1.25rem', fontFamily: 'serif' }}>من القلب للحكاية</p>

            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', padding: '0.75rem 1rem', borderRadius: '0.75rem', border: '1px solid #fecdd3', fontSize: '0.875rem', color: '#881337', fontWeight: 600 }}>
              <p style={{ marginBottom: '0.25rem', letterSpacing: '0.05em' }}>{weddingData.dateString}</p>
              <p style={{ fontSize: '0.75rem', color: '#9f1239' }}>{weddingData.timeString}</p>
            </div>
          </div>
        </section>

        {/* السكشن الثاني: العداد التنازلي */}
        <section style={{ padding: '4rem 1.5rem', textAlign: 'center' }}>
          <div style={{ maxWidth: '28rem', margin: '0 auto' }}>
            <h3 className="font-playfair" style={{ fontStyle: 'italic', fontSize: '1.75rem', color: '#881337', letterSpacing: '0.1em', marginBottom: '1.5rem', fontWeight: 600 }}>COUNTDOWN</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '0.75rem' }}>
              <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.85)', padding: '1rem 0.5rem', borderRadius: '1rem', border: '1px solid #cbd5e1', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                <span className="font-playfair" style={{ display: 'block', fontSize: '1.5rem', fontWeight: 'bold', color: '#881337' }}>{timeLeft.days}</span>
                <span style={{ fontSize: '0.625rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748b' }}>Days</span>
              </div>
              <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.85)', padding: '1rem 0.5rem', borderRadius: '1rem', border: '1px solid #cbd5e1', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                <span className="font-playfair" style={{ display: 'block', fontSize: '1.5rem', fontWeight: 'bold', color: '#881337' }}>{timeLeft.hours}</span>
                <span style={{ fontSize: '0.625rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748b' }}>Hours</span>
              </div>
              <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.85)', padding: '1rem 0.5rem', borderRadius: '1rem', border: '1px solid #cbd5e1', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                <span className="font-playfair" style={{ display: 'block', fontSize: '1.5rem', fontWeight: 'bold', color: '#881337' }}>{timeLeft.minutes}</span>
                <span style={{ fontSize: '0.625rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748b' }}>Minutes</span>
              </div>
              <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.85)', padding: '1rem 0.5rem', borderRadius: '1rem', border: '1px solid #cbd5e1', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                <span className="font-playfair" style={{ display: 'block', fontSize: '1.5rem', fontWeight: 'bold', color: '#881337' }}>{timeLeft.seconds}</span>
                <span style={{ fontSize: '0.625rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748b' }}>Seconds</span>
              </div>
            </div>
          </div>
        </section>

        {/* السكشن الثالث: Save The Date والآية الكريمة */}
        <section style={{ padding: '4rem 1.5rem', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.6)', borderBottom: '1px solid rgba(255,255,255,0.6)' }}>
          <div style={{ maxWidth: '28rem', margin: '0 auto' }}>
            <h3 className="font-playfair" style={{ fontSize: '1.25rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#881337', fontWeight: 'bold', marginBottom: '1.5rem' }}>Save The Date</h3>
            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.85)', padding: '1.5rem', borderRadius: '1.25rem', border: '1px solid #cbd5e1', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
              <p className="font-amiri" style={{ fontSize: '1.15rem', lineHeight: 1.9, color: '#1e293b', textAlign: 'justify', padding: '0 0.5rem' }}>
                وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُمْ مِنْ أَنْفُسِكُمْ أَزْوَاجًا لِتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَوَدَّةً وَرَحْمَةً إِنَّ فِي ذَلِكَ لآيَاتٍ لِقَوْمٍ يَتَفَكَّرُونَ
              </p>
            </div>
          </div>
        </section>

        {/* السكشن الرابع: معرض الصور Our Moments */}
        <section style={{ padding: '4rem 1.5rem', textAlign: 'center' }}>
          <div style={{ maxWidth: '28rem', margin: '0 auto' }}>
            <h3 className="font-playfair" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#881337', marginBottom: '1.5rem', letterSpacing: '0.05em' }}>Our Moments</h3>
            
            <div style={{ position: 'relative', width: '100%', height: '20rem', borderRadius: '1.25rem', overflow: 'hidden', boxShadow: '0 10px 20px -5px rgba(0,0,0,0.1)', border: '4px solid white' }}>
              {weddingData.photos.map((photo, idx) => (
                <div 
                  key={idx}
                  style={{ position: 'absolute', inset: 0, opacity: idx === currentPhotoIdx ? 1 : 0, transition: 'opacity 1s ease-in-out', zIndex: idx === currentPhotoIdx ? 10 : 0 }}>
                  <img src={photo} alt={`Moment ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
            <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.75rem', fontStyle: 'italic' }}>Memories to last a lifetime</p>
          </div>
        </section>

        {/* السكشن الخامس: التفاصيل وجوجل ماب */}
        <section style={{ padding: '4rem 1.5rem', textAlign: 'center' }}>
          <div style={{ maxWidth: '28rem', margin: '0 auto' }}>
            <h3 className="font-playfair" style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#881337', marginBottom: '0.25rem' }}>The Details</h3>
            <p style={{ fontSize: '0.75rem', letterSpacing: '0.12em', color: '#be123c', textTransform: 'uppercase', marginBottom: '2rem' }}>EVERYTHING YOU NEED TO KNOW</p>

            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', padding: '2rem', borderRadius: '1.5rem', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)', border: '1px solid #cbd5e1', position: 'relative' }}>
              <div style={{ width: '3.5rem', height: '3.5rem', backgroundColor: '#fff1f2', borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto', fontSize: '1.5rem' }}>
                🕌
              </div>

              <h4 className="font-playfair" style={{ fontSize: '1.125rem', fontWeight: 600, color: '#881337', marginBottom: '0.5rem' }}>Wedding Venue</h4>
              <p style={{ fontSize: '0.875rem', color: '#475569', marginBottom: '1.5rem' }}>{weddingData.locationName}</p>

              <a 
                href={weddingData.mapUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ display: 'block', width: '100%', padding: '0.75rem', backgroundColor: '#881337', color: 'white', borderRadius: '9999px', fontWeight: 500, textDecoration: 'none', letterSpacing: '0.05em', textTransform: 'uppercase', fontSize: '0.75rem', boxShadow: '0 4px 6px -1px rgba(136, 19, 55, 0.2)' }}>
                Open Google Maps
              </a>
            </div>
          </div>
        </section>

        {/* Footer وزر الإدارة المخفي */}
        <footer style={{ padding: '1.5rem', textAlign: 'center', fontSize: '0.75rem', color: '#64748b', backgroundColor: 'rgba(255, 255, 255, 0.4)', position: 'relative' }}>
          <p>© 2027 {weddingData.groom} & {weddingData.bride}. All Rights Reserved.</p>
          
          <button 
            onClick={() => setShowAdminModal(true)}
            style={{ position: 'absolute', bottom: '0.5rem', right: '0.5rem', fontSize: '9px', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
            ⚙️ Manage
          </button>
        </footer>

      </div>

      {/* لوحة التحكم السرية لإدارة التعديلات */}
      {showAdminModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(4px)', padding: '1rem' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '1rem', maxWidth: '28rem', width: '100%', padding: '1.5rem', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', maxHeight: '90vh', overflowY: 'auto' }}>
            <h3 style={{ fontWeight: 'bold', fontSize: '1.125rem', marginBottom: '1rem', color: '#881337' }}>Secret Admin Panel</h3>
            
            {!isAdminLoggedIn ? (
              <form onSubmit={handleAdminLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <p style={{ fontSize: '0.75rem', color: '#64748b' }}>Enter password (<code>admin2027</code>):</p>
                <input 
                  type="password" 
                  placeholder="Enter Password" 
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid #cbd5e1', borderRadius: '0.75rem', fontSize: '0.875rem' }}
                />
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button type="submit" style={{ flex: 1, padding: '0.5rem', backgroundColor: '#881337', color: 'white', border: 'none', borderRadius: '0.75rem', cursor: 'pointer' }}>Login</button>
                  <button type="button" onClick={() => setShowAdminModal(false)} style={{ flex: 1, padding: '0.5rem', backgroundColor: '#e2e8f0', border: 'none', borderRadius: '0.75rem', cursor: 'pointer' }}>Cancel</button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleSaveAdminChanges} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', textAlign: 'left' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#334155' }}>Groom Name:</label>
                  <input type="text" value={tempData.groom} onChange={(e) => setTempData({...tempData, groom: e.target.value})} style={{ width: '100%', padding: '0.5rem', border: '1px solid #cbd5e1', borderRadius: '0.5rem', fontSize: '0.875rem' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#334155' }}>Bride Name:</label>
                  <input type="text" value={tempData.bride} onChange={(e) => setTempData({...tempData, bride: e.target.value})} style={{ width: '100%', padding: '0.5rem', border: '1px solid #cbd5e1', borderRadius: '0.5rem', fontSize: '0.875rem' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#334155' }}>Location Name:</label>
                  <input type="text" value={tempData.locationName} onChange={(e) => setTempData({...tempData, locationName: e.target.value})} style={{ width: '100%', padding: '0.5rem', border: '1px solid #cbd5e1', borderRadius: '0.5rem', fontSize: '0.875rem' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#374151' }}>Google Maps URL:</label>
                  <input type="text" value={tempData.mapUrl} onChange={(e) => setTempData({...tempData, mapUrl: e.target.value})} style={{ width: '100%', padding: '0.5rem', border: '1px solid #cbd5e1', borderRadius: '0.5rem', fontSize: '0.875rem' }} />
                </div>
                
                <div style={{ display: 'flex', gap: '0.5rem', paddingTop: '0.75rem' }}>
                  <button type="submit" style={{ flex: 1, padding: '0.5rem', backgroundColor: '#16a34a', color: 'white', border: 'none', borderRadius: '0.75rem', fontSize: '0.875rem', fontWeight: 'bold', cursor: 'pointer' }}>Save</button>
                  <button type="button" onClick={() => setShowAdminModal(false)} style={{ flex: 1, padding: '0.5rem', backgroundColor: '#cbd5e1', border: 'none', borderRadius: '0.75rem', fontSize: '0.875rem', cursor: 'pointer' }}>Close</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

export default App;