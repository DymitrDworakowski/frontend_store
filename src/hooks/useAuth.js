import { useState, useEffect, useCallback } from 'react';

function useAuth() {
        const [user, setUser] = useState(null);
        const [tokenPresent, setTokenPresent] = useState(false);
        const [loading, setLoading] = useState(true);

    // Restore user from localStorage on mount, with safe JSON parsing
    useEffect(() => {
            try {
                const stored = localStorage.getItem('user');
                if (stored) {
                    setUser(JSON.parse(stored));
                }

                // If no stored user, check if a token exists (some flows store only token)
                const token = localStorage.getItem('token');
                setTokenPresent(!!token);
        } catch (e) {
            console.warn('useAuth: failed to parse stored user', e);
            localStorage.removeItem('user');
            setUser(null);
        } finally {
            setLoading(false);
        }

        // Sync auth state between tabs/windows
            function onStorage(e) {
                if (e.key === 'user') {
                    try {
                        setUser(e.newValue ? JSON.parse(e.newValue) : null);
                    } catch {
                        setUser(null);
                    }
                }

                if (e.key === 'token') {
                    setTokenPresent(!!e.newValue);
                }
            }

        window.addEventListener('storage', onStorage);
        return () => window.removeEventListener('storage', onStorage);
    }, []);

    const login = useCallback((userData) => {
        setUser(userData);
        try {
            localStorage.setItem('user', JSON.stringify(userData));
        } catch (e) {
            console.error('useAuth: failed to persist user', e);
        }
    }, []);

    const logout = useCallback(() => {
        setUser(null);
        try {
            localStorage.removeItem('user');
                // Also remove token when logging out (if present)
                try { localStorage.removeItem('token'); } catch {}
        } catch (e) {
            console.error('useAuth: failed to remove user', e);
        }
    }, []);

        const isAuthenticated = !!user || tokenPresent;

    return { user, isAuthenticated, loading, login, logout };
}

export default useAuth;
