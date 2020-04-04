import React, { Component } from 'react';


class Settings extends Component {
  

  getDate = (milisecond) => {
    const date = new Date(milisecond);
    return date.toString();
  };
  render() {
    return (
      
        <div className="grid">
          <h5>Settings</h5>
          <form className="det-form" onSubmit={(e) => e.preventDefault()}>
            <div className="input-field col s12">
              <p
                htmlFor="name"
                style={{
                  margin: '25px 0 0 0',
                  padding: '0',
                  fontSize: '12px',
                }}
              >
                Created by
              </p>
              <input
                id="createdby"
                disabled
                style={{ fontWeight: 'bolder' }}
                type="text"
                value={this.props.state.createdby}
                required
                onChange={this.props.handleChange}
              />
            </div>
            <div className="input-field">
              <p
                style={{
                  margin: '25px 0 0 0',
                  padding: '0',
                  fontSize: '12px',
                }}
              >
                Created at
              </p>

              <input
                disabled
                style={{ fontWeight: 'bolder' }}
                type="text"
                id="createdad"
                value={this.getDate(this.props.state.createdAt)}
                required
                onChange={this.props.handleChange}
              />
            </div>
            <div className="input-field">
              <p
                style={{
                  margin: '25px 0 0 0',
                  padding: '0',
                  fontSize: '12px',
                }}
              >
                Last update
              </p>

              <input
                disabled
                style={{ fontWeight: 'bolder' }}
                type="text"
                id="lastupdate"
                value={this.getDate(this.props.state.lastupdate)}
                required
                onChange={this.props.handleChange}
              />
            </div>
            <div className="input-field" style={{ padding: '20px 0' }}>
              <span
                style={{
                  margin: '25px 200px 0 0',
                  padding: '0',
                  fontSize: '12px',
                }}
              >
                Active
              </span>
              <span>{this.props.state.active ? 'Active' : 'Not Active'}</span>
              <br />
              <button
                className="btn-det btn waves-effect"
                disabled={
                  !this.props.state.flag &&
                  this.props.match.params.id !== 'create-project'
                }
                style={{
                  margin: '15px 25px',
                  fontSize: '10px',
                  padding: '0 5px',
                  width: '80%',
                }}
                onClick={this.props.handleActive}
              >
                Activate/Deactivate
              </button>
            </div>
            <div
              className="input-field"
              style={{ padding: '20px 0', marginTop: '40px' }}
            >
              <span
                style={{
                  margin: '25px 200px 0 0',
                  padding: '0',
                  fontSize: '12px',
                }}
              >
                Archive
              </span>
              <span>{this.props.state.archive ? 'True' : 'False'}</span>
              <br />
              <button
                className="btn-det btn waves-effect"
                style={{
                  margin: '15px 25px',
                  fontSize: '10px',
                  padding: '0 5px',
                  width: '80%',
                }}
              >
                Archive
              </button>
            </div>
            <div
              className="input-field"
              style={{ padding: '20px 0', marginTop: '40px' }}
            >
              <span
                style={{
                  margin: '25px 200px 0 0',
                  padding: '0',
                  fontSize: '12px',
                }}
              >
                Delete Project
              </span>

              <br />
              <button
                className="btn-det btn waves-effect"
                style={{
                  margin: '15px 25px',
                  fontSize: '10px',
                  padding: '0 5px',
                  width: '80%',
                }}
                onClick={this.props.deleteProject}
              >
                Delete
              </button>
            </div>
          </form>
        </div>
        
    );
  }
}

export default Settings;
