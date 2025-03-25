import React from 'react';

function DualToneIcon({
  MainIcon,
  OverlayIcon,
  mainColor = '#FF4500',
  overlayColor = '#20B486',
  mainSize = 72,
  overlaySize = 40,
  overlayPosition = { bottom: '-30px', right: '-30px' },
  rotation = '0deg',
}) {
  return (
    <div style={{ position: 'relative', display: 'inline-block', width: `${mainSize}px`, height: `${mainSize}px`, transform: `rotate(${rotation})`}}>
      {/* Main Icon */}
      <MainIcon style={{ fontSize: `${mainSize}px`, color: mainColor }} />

      {/* Overlay Icon positioned and styled based on props */}
      <OverlayIcon
        style={{
          borderRadius: '50%',
          backgroundColor: '#FFFFFF',
          position: 'absolute',
          ...overlayPosition,
          fontSize: `${overlaySize}px`,
          color: overlayColor,
        }}
      />
    </div>
  );
}

export default DualToneIcon;
