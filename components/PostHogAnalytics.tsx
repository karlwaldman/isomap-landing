'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { capturePublicPageview } from '@/lib/posthog';

export default function PostHogAnalytics() {
  const pathname = usePathname();
  const previous = useRef<string | null>(null);
  const pageId = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname || previous.current === pathname) return;
    previous.current = pathname;
    pageId.current ??= crypto.randomUUID();
    void capturePublicPageview(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
      hostname: location.hostname,
      pathname,
      referrer: document.referrer,
      doNotTrack: navigator.doNotTrack,
      globalPrivacyControl: (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl,
      automation: navigator.webdriver || new URLSearchParams(location.search).get('telemetry') === 'smoke',
      distinctId: pageId.current,
    }).then((result) => {
      if (result === 'failed') console.warn('gettariff analytics delivery failed');
    });
  }, [pathname]);

  return null;
}
