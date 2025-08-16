// frontend/src/components/VoiceConsent.tsx
import React, { useState } from 'react';

const VoiceConsent = () => {
  const [consentGiven, setConsentGiven] = useState(false);
  const [userId, setUserId] = useState(''); // This should be set from authentication context

  const handleConsentChange = async () => {
    try {
      const response = await fetch('/api/voice/consent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, consentGiven }),
      });
      const result = await response.json();
      if (!response.ok) {
        console.error('Error updating consent:', result.error);
      } else {
        console.log('Consent updated:', result.message);
      }
    } catch (error) {
      console.error('Error updating consent:', error);
    }
  };

  return (
    <div>
      <h2>Voice Cloning Consent</h2>
      <label>
        <input
          type="checkbox"
          checked={consentGiven}
          onChange={() => setConsentGiven(!consentGiven)}
        />
        I consent to voice cloning features
      </label>
      <button onClick={handleConsentChange}>Save Consent</button>
    </div>
  );
};

export default VoiceConsent;