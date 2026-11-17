import React, { useEffect } from 'react';

/**
 * Shim ringan pengganti @inertiajs/react khusus untuk Static Build (Vercel / Netlify).
 * Tidak memengaruhi build Laravel/Inertia yang sudah berjalan.
 */
export function Head({ title }) {
    useEffect(() => {
        if (title) {
            document.title = title;
        }
    }, [title]);

    return null;
}

export function Link({ href = '/', children, onClick, className = '', ...rest }) {
    const handleClick = (e) => {
        if (onClick) onClick(e);
        if (
            e.defaultPrevented ||
            e.metaKey ||
            e.ctrlKey ||
            e.shiftKey ||
            e.altKey ||
            e.button !== 0 ||
            href.startsWith('http')
        ) {
            return;
        }

        e.preventDefault();
        if (window.location.pathname !== href) {
            window.history.pushState({}, '', href);
            window.dispatchEvent(new PopStateEvent('popstate'));
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <a href={href} onClick={handleClick} className={className} {...rest}>
            {children}
        </a>
    );
}
