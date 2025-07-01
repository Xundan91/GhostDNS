'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Domain {
  id: string;
  domainName: string;
}

// Profile section skeleton loader
const ProfileSectionSkeleton: React.FC = () => (
  <section className="mb-14 animate-pulse">
    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Profile</h2>
    <form className="space-y-6">
      <div className="flex flex-col gap-2">
        <label className="text-base font-bold text-gray-700 dark:text-gray-200">Name</label>
        <div className="flex items-center gap-3">
          <div className="w-full h-10 bg-gray-200 dark:bg-zinc-800 rounded-lg" />
          <div className="ml-2 px-8 py-2 bg-gray-300 dark:bg-zinc-700 rounded-lg" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-base font-bold text-gray-700 dark:text-gray-200">Email</label>
        <div className="w-full h-8 bg-gray-200 dark:bg-zinc-800 rounded-lg" />
      </div>
    </form>
  </section>
);

const Account: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Stats
  const [owned, setOwned] = useState<Domain[]>([]);
  const [purchased, setPurchased] = useState<number>(0);
  const [configured, setConfigured] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch('/api/user').then(res => res.json()),
      fetch('/api/domain/user').then(res => res.json()),
      fetch('/api/purchase').then(res => res.json()),
      fetch('/api/configuredomain').then(res => res.json()),
    ]).then(([userRes, ownedRes, purchasedRes, configuredRes]) => {
      if (userRes.user) {
        setUser(userRes.user);
        setForm(f => ({ ...f, name: userRes.user.name, email: userRes.user.email }));
      }
      setOwned(ownedRes.domains || []);
      setPurchased((purchasedRes.purchases || []).length);
      setConfigured((configuredRes.domains || []).length);
      setLoading(false);
    }).catch(() => {
      setError('Failed to load account details');
      setLoading(false);
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = () => {
    setEditing(true);
    setSuccess(false);
    setError(null);
  };

  const handleCancel = () => {
    setEditing(false);
    setForm(f => ({ ...f, name: user.name, email: user.email, password: '' }));
    setError(null);
    setSuccess(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);
    const update: any = {};
    if (form.name !== user.name) update.name = form.name;
    if (form.email !== user.email) update.email = form.email;
    if (form.password) update.password = form.password;
    if (Object.keys(update).length === 0) {
      setSaving(false);
      setEditing(false);
      setSuccess(true);
      return;
    }
    const res = await fetch('/api/user', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(update),
    });
    const data = await res.json();
    if (res.ok) {
      setUser(data.user);
      setForm(f => ({ ...f, password: '' }));
      setEditing(false);
      setSuccess(true);
    } else {
      setError(data.error || 'Failed to update user');
    }
    setSaving(false);
  };

  // Stat blocks
  const statBlocks = [
    {
      label: 'Domains Owned',
      value: owned.length,
      preview: owned[0]?.domainName || '',
      onClick: () => router.push('/dashboard/my-domains'),
      showPreview: !!owned[0],
    },
    {
      label: 'Domains Purchased',
      value: purchased,
      onClick: () => router.push('/dashboard/purchased-domains'),
      showPreview: false,
    },
    {
      label: 'Domains Configured',
      value: configured,
      onClick: () => router.push('/dashboard/all-configured-domains'),
      showPreview: false,
    },
  ];

  return (
    <div className="max-w-3xl mx-auto py-14 px-4">
      <h1 className="text-4xl font-extrabold mb-2 text-gray-900 dark:text-white tracking-tight">Account Settings</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 font-semibold">Your profile and domain overview</p>
      {loading ? (
        <>
          <ProfileSectionSkeleton />
          <hr className="my-12 border-gray-200 dark:border-gray-800" />
          {/* Stats Section (can be skeletonized similarly if needed) */}
        </>
      ) : error ? (
        <div className="text-red-500 font-bold text-lg">{error}</div>
      ) : (
        <>
          {/* Profile Section */}
          <section className="mb-14">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Profile</h2>
            <form onSubmit={handleSave} className="space-y-6">
              <div className="flex flex-col gap-2">
                <label className="text-base font-bold text-gray-700 dark:text-gray-200">Name</label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className={`w-full bg-gray-100 dark:bg-zinc-800 text-xl font-bold rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-colors ${editing ? '' : 'pointer-events-none opacity-80'}`}
                    disabled={!editing}
                  />
                  {!editing && (
                    <button type="button" onClick={handleEdit} className="ml-2 px-4 py-2 bg-indigo-600 text-white font-bold rounded-lg shadow hover:bg-indigo-700 transition" title="Edit">Edit</button>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-base font-bold text-gray-700 dark:text-gray-200">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className={`w-full bg-gray-100 dark:bg-zinc-800 text-lg font-semibold rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-colors ${editing ? '' : 'pointer-events-none opacity-80'}`}
                  disabled={!editing}
                />
              </div>
              {editing && (
                <div className="flex flex-col gap-2">
                  <label className="text-base font-bold text-gray-700 dark:text-gray-200">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full bg-gray-100 dark:bg-zinc-800 text-lg font-semibold rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-colors"
                    placeholder="New password (leave blank to keep current)"
                    autoComplete="new-password"
                  />
                  <div className="flex gap-3 mt-2">
                    <button type="submit" className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold px-6 py-2 rounded-lg shadow hover:from-indigo-700 hover:to-purple-700 transition" disabled={saving}>Save</button>
                    <button type="button" onClick={handleCancel} className="bg-gray-200 dark:bg-zinc-700 text-gray-700 dark:text-gray-200 font-bold px-6 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-zinc-600 transition">Cancel</button>
                  </div>
                </div>
              )}
              {success && <div className="text-green-600 font-bold text-base mt-1">Profile updated!</div>}
              {error && <div className="text-red-500 font-bold text-base mt-1">{error}</div>}
            </form>
          </section>
          <hr className="my-12 border-gray-200 dark:border-gray-800" />
          {/* Stats Section */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Your Domain Stats</h2>
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 overflow-x-auto pb-2">
              {statBlocks.map((block, i) => (
                <button
                  key={block.label}
                  onClick={block.onClick}
                  className={`min-w-[220px] flex-1 rounded-2xl px-7 py-8 bg-white dark:bg-zinc-900 shadow-lg text-left focus:outline-none focus:ring-4 focus:ring-indigo-200 dark:focus:ring-indigo-700 transition transform hover:scale-105`}
                  style={{ zIndex: 10 - i, marginLeft: i !== 0 ? '-24px' : 0 }}
                >
                  <div className="text-lg font-bold text-gray-900 dark:text-white mb-2 tracking-wide">{block.label}</div>
                  <div className="text-4xl font-extrabold text-gray-900 dark:text-white mb-1">{block.value}</div>
                  {block.showPreview && block.preview && (
                    <div className="text-base font-semibold text-gray-500 dark:text-gray-300 truncate max-w-full mt-2">{block.preview}</div>
                  )}
                </button>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Account; 