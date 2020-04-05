import React, { Component } from 'react';

class Roles extends Component {
  state = { showSetting: true };
  render() {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridGap: '20px',
        }}
      >
        <div>
          <h5 style={{ margin: '0', padding: '0' }}>Users</h5>
          <p style={{ margin: '0 0 4px 0', padding: '0' }}>
            Configuration of Roles
          </p>
          <button
            className="btn-det btn waves-effect"
            // onClick={this.props.closeModal}
            style={{ width: '90%', marginBottom: '6px' }}
          >
            Add New
          </button>
          <div className="users-list" style={{ height: '265px' }}>
            {this.props.options.map((option) => (
              <React.Fragment>
                <p
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                  className="default-list"
                >
                  {option.label}
                </p>
                <hr />
              </React.Fragment>
            ))}
          </div>
          <button
            className="btn-det btn waves-effect"
            onClick={this.props.closeModal}
            style={{ width: '90%', marginTop: '6px' }}
          >
            Close
          </button>
        </div>
        {this.state.showSetting && (
          <div>
            <h5 style={{ margin: '0', padding: '0' }}>Roles Setting</h5>
            <p style={{ margin: '0', padding: '0' }}>Setting of Roles</p>
          </div>
        )}
      </div>
    );
  }
}

export default Roles;
