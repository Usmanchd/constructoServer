import React, { Component } from 'react';

class Management extends Component {
  render() {
    return (
      <div className="grid">
        <h5>Management</h5>
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
              Timing
            </p>

            <input
              disabled={!this.props.state.flag}
              type="date"
              id="estimatestart"
              name="trip-start"
              value={this.props.state.estimatestart}
              onChange={this.props.handleChange}
              style={{ color: 'white', fontWeight: 'bolder' }}
            />
          </div>
          <div className="input-field col s12">
            <input
              disabled={!this.props.state.flag}
              type="date"
              id="estimatend"
              name="trip-end"
              value={this.props.state.estimatend}
              onChange={this.props.handleChange}
              style={{ color: 'white', fontWeight: 'bolder' }}
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
              Cloud Space
            </p>

            <input
              disabled
              type="text"
              id="spaceUsed"
              placeholder="Used"
              // value={this.props.state.street}
              required
              style={{ fontWeight: 'bolder' }}
              // onChange={this.props.handleChange}
            />
          </div>
          <div className="input-field">
            <input
              disabled
              style={{ fontWeight: 'bolder' }}
              type="text"
              id="spaceLimit"
              placeholder="Available"
              // value={this.props.state.street}
              required
              // onChange={this.props.handleChange}
            />
          </div>
          <div className="input-field">
            <p
              style={{
                margin: '25px 0 0 0',
                padding: '0',
                fontSize: '12px',
              }}
            ></p>

            <button
              className="btn-det btn waves-effect"
              style={{
                margin: '5px 25px',
                fontSize: '10px',
                padding: '0 5px',
                width: '80%',
              }}
            >
              Request More Space
            </button>
          </div>
          <div className="input-field">
            <p
              style={{
                margin: '25px 0 0 0',
                padding: '0',
                fontSize: '12px',
              }}
            >
              Users
            </p>
            <input
              placeholder="Used"
              disabled
              style={{ fontWeight: 'bolder' }}
              type="text"
              id="userUsed"
              // value={this.props.state.street}
              required
              // onChange={this.props.handleChange}
            />
          </div>
          <div className="input-field">
            <input
              disabled
              style={{ fontWeight: 'bolder' }}
              type="text"
              id="userLimit"
              placeholder="Available"
              // value={this.props.state.street}
              required
              // onChange={this.props.handleChange}
            />
          </div>
          <div className="input-field">
            <p
              style={{
                margin: '25px 0 0 0',
                padding: '0',
                fontSize: '12px',
              }}
            ></p>

            <button
              className="btn-det btn waves-effect"
              style={{
                margin: '5px 25px',
                fontSize: '10px',
                padding: '0 5px',
                width: '80%',
              }}
            >
              Request More Users
            </button>

            <div>
              <div className="users-list">
                <p
                  htmlFor="name"
                  style={{
                    margin: '25px 0 0 0',
                    padding: '0',
                    fontSize: '12px',
                  }}
                >
                  List of Users
                </p>
                {this.props.viewUser.map((v) => (
                  <p>{v.Name}</p>
                ))}
              </div>
              <button
                className="btn-det btn waves-effect"
                style={{
                  margin: '15px 25px',
                  fontSize: '10px',
                  padding: '0 5px',
                  width: '80%',
                }}
                onClick={this.props.openModal}
              >
                Configure Users
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Management;
