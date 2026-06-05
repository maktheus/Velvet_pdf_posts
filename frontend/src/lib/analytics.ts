const SESSION_KEY = 'pv_sid';

function getSessionId(): string {
  if (typeof window === 'undefined') return '';
  let sid = sessionStorage.getItem(SESSION_KEY);
  if (!sid) {
    sid = crypto.randomUUID();
    sessionStorage.setItem(SESSION_KEY, sid);
  }
  return sid;
}

export type AnalyticsEventType = 'PAGE_VIEW' | 'PRODUCT_VIEW' | 'ADD_TO_CART' | 'ORDER_COMPLETE' | 'SEARCH';

export function trackEvent(
  eventType: AnalyticsEventType,
  opts: { productId?: string; pagePath?: string; revenue?: number } = {}
): void {
  if (typeof window === 'undefined') return;
  const payload = {
    eventType,
    sessionId: getSessionId(),
    productId: opts.productId ?? null,
    pagePath: opts.pagePath ?? window.location.pathname,
    referrer: document.referrer || null,
    revenue: opts.revenue ?? null,
  };
  fetch('/api/analytics/event', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch(() => {});
}
