import { test, expect } from '@playwright/test';

/**
 * tests/e2e/voice-lifecycle.spec.ts
 *
 * End-to-end smoke test for the voice consent → clone → revoke lifecycle.
 *
 * Notes:
 * - Requires the dev server running at PLAYWRIGHT_BASE_URL (defaults to http://localhost:3000)
 * - The test helper route /api/test/login-as is gated by PLAYWRIGHT_TESTING=true.
 * - We add the session cookie returned by /api/test/login-as to subsequent API calls by
 *   forwarding the cookie header on the request fixture.
 */

test('voice consent → clone → revoke lifecycle (simulated provider)', async ({ request, page }) => {
  // 1) Create a test user
  const createResp = await request.get('/api/create-user');
  expect(createResp.ok()).toBeTruthy();
  const createJson = await createResp.json();
  const user = createJson.user;
  expect(user?.id).toBeTruthy();
  const userId = user.id as string;

  // 2) Use test helper to create a session cookie for that user
  if (!process.env.PLAYWRIGHT_TESTING) {
    test.skip(true, 'PLAYWRIGHT_TESTING not enabled - skipping login-as flow');
    return;
  }

  const loginResp = await request.get(`/api/test/login-as?userId=${encodeURIComponent(userId)}`);
  expect(loginResp.ok()).toBeTruthy();
  // Extract session cookie token from Set-Cookie header
  const setCookie = loginResp.headers()['set-cookie'] || '';
  const m = setCookie.match(/(?:^|;\s*)session=([^;]+)/);
  expect(m).toBeTruthy();
  const sessionToken = m ? m[1] : '';
  const cookieHeader = `session=${sessionToken}`;

  // 3) Upload consent audio sample (multipart/form-data) using the request fixture with the session cookie
  const sampleBuffer = Buffer.from('E2E_TEST_SAMPLE'); // small synthetic payload; backend accepts base64 plaintext encryption
  const consentResp = await request.post('/api/voice/consent', {
    headers: { 'cookie': cookieHeader },
    multipart: {
      content: { buffer: sampleBuffer, mimeType: 'audio/wav', name: 'e2e-sample.wav' },
      consent: JSON.stringify({ accepted: true }),
      title: 'E2E voice sample',
      type: 'file',
    },
  });
  expect(consentResp.ok()).toBeTruthy();
  const consentJson = await consentResp.json();
  expect(consentJson.ok).toBeTruthy();
  const voiceProfileId = consentJson.voice_profile?.id;
  expect(voiceProfileId).toBeTruthy();

  // 4) Enqueue clone job
  const cloneResp = await request.post('/api/voice/clone', {
    headers: { 'cookie': cookieHeader, 'Content-Type': 'application/json' },
    data: { voiceProfileId },
  });
  expect(cloneResp.status()).toBe(202);
  const cloneJson = await cloneResp.json();
  expect(cloneJson.enqueued).toBeTruthy();
  const cloneJobId = cloneJson.jobId;
  expect(cloneJobId).toBeTruthy();

  // 5) Enqueue deletion (revoke) job
  const deleteResp = await request.delete(`/api/voice/profiles/${encodeURIComponent(voiceProfileId)}`, {
    headers: { 'cookie': cookieHeader },
  });
  expect(deleteResp.status()).toBe(202);
  const deleteJson = await deleteResp.json();
  expect(deleteJson.enqueued).toBeTruthy();
  const deleteJobId = deleteJson.jobId;
  expect(deleteJobId).toBeTruthy();

  // 6) Optional: visit a protected page to ensure the session cookie works in the browser context
  await page.context().addCookies([{
    name: 'session',
    value: sessionToken,
    domain: new URL(process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000').hostname,
    path: '/',
    httpOnly: true,
    sameSite: 'Strict',
  }]);
  await page.goto('/');
  // presence of logout link or account tile would be app-specific; we simply assert the page loads
  expect(page.url()).toContain('/');

  // Test completed
});