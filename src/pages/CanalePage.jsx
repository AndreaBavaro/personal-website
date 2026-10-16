import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { openPage, tokenIsValid } from '../viola/crypto';

// Unlisted hub reached only from the printed link. Decrypts the page with the URL token
// and swaps it in for the whole document (it is a self-contained static page).
export default function CanalePage() {
  const { token } = useParams();
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        if (!(await tokenIsValid(token))) throw new Error('bad token');
        const html = await openPage(token);
        if (cancelled) return;
        document.open();
        document.write(html);
        document.close();
      } catch {
        if (!cancelled) setFailed(true);
      }
    })();
    return () => { cancelled = true; };
  }, [token]);

  if (failed) {
    return (
      <div style={{ minHeight: '100svh', display: 'grid', placeItems: 'center', background: '#0b1030', color: '#fff4de', fontFamily: 'system-ui' }}>
        <p>Niente qui.</p>
      </div>
    );
  }
  return <div style={{ minHeight: '100svh', background: '#0b1030' }} aria-busy="true" />;
}
