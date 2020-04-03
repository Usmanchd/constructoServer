import React, { Component } from 'react';

import Map from '../../../Map';

class General extends Component {
  render() {
    return (
      <div className="grid">
        <h5>General</h5>
        <form className="det-form" onSubmit={(e) => e.preventDefault()}>
          <div className="input-field">
            <p
              htmlFor="name"
              style={{
                margin: '25px 0 0 0',
                padding: '0',
                fontSize: '12px',
              }}
            >
              Name
            </p>
            <input
              id="name"
              disabled={!this.props.state.flag}
              style={{ fontWeight: 'bolder' }}
              type="text"
              value={this.props.state.name}
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
              Street
            </p>

            <input
              disabled={!this.props.state.flag}
              style={{ fontWeight: 'bolder' }}
              type="text"
              id="street"
              value={this.props.state.street}
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
              City
            </p>

            <input
              disabled={!this.props.state.flag}
              style={{ fontWeight: 'bolder' }}
              type="text"
              id="city"
              value={this.props.state.city}
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
              Zip
            </p>

            <input
              disabled={!this.props.state.flag}
              style={{ fontWeight: 'bolder' }}
              type="text"
              id="zip"
              value={this.props.state.zip}
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
              State
            </p>

            <input
              disabled={!this.props.state.flag}
              style={{ fontWeight: 'bolder' }}
              type="text"
              id="props.state"
              value={this.props.state.state}
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
              Location
            </p>

            <input
              disabled={!this.props.state.flag}
              style={{ fontWeight: 'bolder' }}
              type="text"
              id="location"
              value={this.props.state.location}
              required
              onChange={(e) => {
                this.props.handleLatLng(e);
              }}
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
              Project Description
            </p>

            <input
              disabled={!this.props.state.flag}
              style={{ fontWeight: 'bolder' }}
              type="text"
              id="projectDescription"
              value={this.props.state.projectDescription}
              required
              onChange={this.props.handleChange}
            />
          </div>
          <div className="map">
            <Map
              location={this.props.state.location}
              lat={this.props.state.lat}
              lng={this.props.state.lng}
              handleMarker={this.props.handleMarker}
              mode={!this.props.state.flag ? 'view' : 'edit'}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default General;
