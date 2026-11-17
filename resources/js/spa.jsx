import '../css/app.css';
import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import Index from './Pages/PressVideo/Index';
import About from './Pages/PressVideo/About';
import Features from './Pages/PressVideo/Features';
import FAQ from './Pages/PressVideo/FAQ';

function StaticApp() {
    const [pathname, setPathname] = useState(() => window.location.pathname);

    useEffect(() => {
        const onPopState = () => setPathname(window.location.pathname);
        window.addEventListener('popstate', onPopState);
        return () => window.removeEventListener('popstate', onPopState);
    }, []);

    const normalized = pathname.replace(/\/+$/, '') || '/';

    switch (normalized) {
        case '/tentang':
            return <About />;
        case '/fitur':
            return <Features />;
        case '/faq':
            return <FAQ />;
        case '/':
        case '/press-video':
        default:
            return <Index />;
    }
}

const rootEl = document.getElementById('app');
if (rootEl) {
    createRoot(rootEl).render(<StaticApp />);
}
