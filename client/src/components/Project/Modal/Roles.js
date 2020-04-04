import React, { Component } from 'react';

class Roles extends Component {
  render() {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridGap: '20px',
        }}
      >
        <div>Roles</div>
        <div>Roles Settings</div>
      </div>
    );
  }
}

export default Roles;
