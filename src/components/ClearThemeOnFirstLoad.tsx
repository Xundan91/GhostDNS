'use client';

import { useEffect } from 'react';

export default function ClearThemeOnFirstLoad() {
  useEffect(() => {
    if (localStorage.getItem('theme')) {
      localStorage.removeItem('theme');
    }
  }, []);

  return null;
}
