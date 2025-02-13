import React from 'react';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import AddCircleIcon from '@mui/icons-material/AddCircle';


function MyIcon() {
  return (
    <div style={{ position: 'relative', display: 'inline-block', width: '48px', height: '48px' }}>
      {/* Main icon */}
      <EventNoteOutlinedIcon style={{ fontSize: '72px', color: '#FF4500' }} />

      {/* Add icon positioned to be partially overlapping */}
      <AddCircleIcon
        style={{
          borderRadius: '50%',
          backgroundColor: '#FFFFFF',
          position: 'absolute',
          bottom: '-30px',  // Move it further down
          right: '-30px',   // Move it further right
          fontSize: '40px', // Smaller size for the add icon
          color: '#20B486',
        }}
      />
    </div>
  );
}

export default MyIcon;
