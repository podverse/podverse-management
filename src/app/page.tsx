'use client';

import { useEffect, useState } from 'react';
import { getAdminAccountById, type AdminAccount } from '../lib/requests/adminAccount';

function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift();
  }
  return undefined;
}

export default function HomePage() {
  const [adminAccount, setAdminAccount] = useState<AdminAccount | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAdminAccount = async () => {
      try {
        setLoading(true);
        setError(null);
        const jwt = getCookie('pv_mgmt_auth');
        const account = await getAdminAccountById(1, jwt);
        setAdminAccount(account);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch admin account';
        setError(errorMessage);
        console.error('Error fetching admin account:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminAccount();
  }, []);

  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Podverse Management</h1>
        <p className="page-subtitle">Administrative Dashboard</p>
      </div>
      <main>
        <p>Welcome to the Podverse Management interface.</p>
        <p>This is a functional administrative interface for managing Podverse.</p>
        
        <div style={{ marginTop: '2rem', padding: '1.5rem', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
          <h2 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '1.25rem', fontWeight: '600' }}>
            Admin Account Demo
          </h2>
          
          {loading && (
            <p style={{ color: '#666', fontStyle: 'italic' }}>Loading admin account data...</p>
          )}
          
          {error && (
            <div style={{ padding: '0.75rem', backgroundColor: '#fee', border: '1px solid #fcc', borderRadius: '4px', color: '#c33' }}>
              <strong>Error:</strong> {error}
            </div>
          )}
          
          {!loading && !error && adminAccount && (
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              <div>
                <strong>ID:</strong> {adminAccount.id}
              </div>
              <div>
                <strong>ID Text:</strong> {adminAccount.id_text}
              </div>
              <div>
                <strong>Created At:</strong> {new Date(adminAccount.created_at).toLocaleString()}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
