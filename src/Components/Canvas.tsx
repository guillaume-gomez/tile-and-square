import React, { useRef, useState } from 'react';

function Canvas() {
  const [background, setBackground] = useState<string>("#FF5515");
  return (
    <canvas className="border rounded-lg" width="100px" height="100px" style={{ background }}>
    </canvas>
  );
}

export default Canvas;
