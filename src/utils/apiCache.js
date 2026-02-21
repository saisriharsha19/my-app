// src/utils/apiCache.js
// Lightweight sessionStorage cache for API responses.
// Data is valid for TTL_MS within the same browser session.
// On repeated navigations (Portfolio → Home → Portfolio), the second
// visit is instant — no network request is made.

const TTL_MS = 5 * 60 * 1000; // 5 minutes

/**
 * Fetch with sessionStorage caching.
 * @param {string} url
 * @param {RequestInit & { signal?: AbortSignal }} options
 * @returns {Promise<any>} Parsed JSON response
 */
export async function fetchWithCache(url, options = {}) {
    const cacheKey = `api_cache:${url}`;

    // Try sessionStorage first
    try {
        const raw = sessionStorage.getItem(cacheKey);
        if (raw) {
            const { data, expires } = JSON.parse(raw);
            if (Date.now() < expires) {
                return data; // Cache hit — no network
            }
            sessionStorage.removeItem(cacheKey); // Expired — evict
        }
    } catch {
        // sessionStorage unavailable (private browsing, quota) — fall through to fetch
    }

    // Cache miss — fetch from network
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    // Write to sessionStorage (best-effort)
    try {
        sessionStorage.setItem(cacheKey, JSON.stringify({
            data,
            expires: Date.now() + TTL_MS,
        }));
    } catch {
        // Quota exceeded or private mode — ignore, fetch will work normally next time
    }

    return data;
}
