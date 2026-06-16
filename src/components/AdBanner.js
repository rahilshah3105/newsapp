import React, { useEffect, useRef, useState } from 'react';

export default function AdBanner({ position = 'top', className = '', minHeight = '90px' }) {
  const containerRef = useRef(null);
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return;

    // Clear any previous ad content
    containerRef.current.innerHTML = '';

    // Determine key and dimensions based on screen size
    let key = '';
    let adWidth = 728;
    let adHeight = 90;

    if (width >= 768) {
      // 728x90 Banner
      key = process.env.REACT_APP_AD_KEY_728X90 || '1e86c8091312c15519f6f7abf28774c5';
      adWidth = 728;
      adHeight = 90;
    } else {
      // 320x50 Banner
      key = process.env.REACT_APP_AD_KEY_320X50 || '9c46786f7cc4c17430e7e599be30851e';
      adWidth = 320;
      adHeight = 50;
    }

    try {
      const iframe = document.createElement('iframe');
      iframe.width = adWidth;
      iframe.height = adHeight;
      iframe.frameBorder = '0';
      iframe.scrolling = 'no';
      iframe.style.border = 'none';
      iframe.style.overflow = 'hidden';
      iframe.style.maxWidth = '100%';

      containerRef.current.appendChild(iframe);

      const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
      iframeDoc.open();
      iframeDoc.write(`
        <html>
          <body style="margin:0;padding:0;">
            <script type="text/javascript">
              var atOptions = {
                'key' : '${key}',
                'format' : 'iframe',
                'height' : ${adHeight},
                'width' : ${adWidth},
                'params' : {}
              };
              document.write('<scr' + 'ipt type="text/javascript" src="https://www.highperformanceformat.com/${key}/invoke.js"></scr' + 'ipt>');
            </script>
          </body>
        </html>
      `);
      iframeDoc.close();
    } catch (err) {
      console.error('Error loading ad script:', err);
    }
  }, [width]);

  return (
    <div 
      className={`ad-banner ${className}`.trim()} 
      style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        width: '100%', 
        minHeight,
        margin: '1rem auto',
        overflow: 'hidden'
      }}
    >
      <div ref={containerRef} style={{ display: 'flex', justifyContent: 'center', width: '100%', maxWidth: '100%' }} />
    </div>
  );
}
