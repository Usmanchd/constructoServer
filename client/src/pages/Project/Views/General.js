import React, { Component } from 'react'
import { Input } from 'antd'
import Map from '../Functions/Map'
import styles from '../style.module.css'

class General extends Component {
  render() {
    const { state, handleChange, handleLatLng, handleMarker } = this.props
    return (
      <div className={styles.grid}>
        <h5>General</h5>
        <form className={styles.detForm} onSubmit={e => e.preventDefault()}>
          <div className="input-field">
            <p
              htmlFor="name"
              style={{
                margin: '25px 0 6px 0',
                padding: '0',
                fontSize: '14px',
              }}
            >
              Name
            </p>
            <Input
              size="default"
              id="name"
              disabled={!state.flag}
              style={{ fontWeight: 'bolder' }}
              type="text"
              value={state.name}
              required
              onChange={handleChange}
            />
          </div>
          <div className="input-field">
            <p
              style={{
                margin: '25px 0 6px 0',
                padding: '0',
                fontSize: '14px',
              }}
            >
              Street
            </p>

            <Input
              disabled={!state.flag}
              style={{ fontWeight: 'bolder' }}
              type="text"
              id="street"
              value={state.street}
              required
              onChange={handleChange}
            />
          </div>
          <div className="input-field">
            <p
              style={{
                margin: '25px 0 6px 0',
                padding: '0',
                fontSize: '14px',
              }}
            >
              City
            </p>

            <Input
              disabled={!state.flag}
              style={{ fontWeight: 'bolder' }}
              type="text"
              id="city"
              value={state.city}
              required
              onChange={handleChange}
            />
          </div>
          <div className="input-field">
            <p
              style={{
                margin: '25px 0 6px 0',
                padding: '0',
                fontSize: '14px',
              }}
            >
              Zip
            </p>

            <Input
              disabled={!state.flag}
              style={{ fontWeight: 'bolder' }}
              type="text"
              id="zip"
              value={state.zip}
              required
              onChange={handleChange}
            />
          </div>
          <div className="input-field">
            <p
              style={{
                margin: '25px 0 6px 0',
                padding: '0',
                fontSize: '14px',
              }}
            >
              State
            </p>

            <Input
              disabled={!state.flag}
              style={{ fontWeight: 'bolder' }}
              type="text"
              id="state"
              value={state.state}
              required
              onChange={handleChange}
            />
          </div>
          <div className="input-field">
            <p
              style={{
                margin: '25px 0 6px 0',
                padding: '0',
                fontSize: '14px',
              }}
            >
              Location
            </p>

            <Input
              disabled={!state.flag}
              style={{ fontWeight: 'bolder' }}
              type="text"
              id="location"
              value={state.location}
              required
              onChange={e => {
                handleLatLng(e)
              }}
            />
          </div>
          <div className="input-field">
            <p
              style={{
                margin: '25px 0 6px 0',
                padding: '0',
                fontSize: '14px',
              }}
            >
              Project Description
            </p>

            <Input
              disabled={!state.flag}
              style={{ fontWeight: 'bolder' }}
              type="text"
              id="projectDescription"
              value={state.projectDescription}
              required
              onChange={handleChange}
            />
          </div>
          <div className={styles.map}>
            <Map
              location={state.location}
              lat={state.lat}
              lng={state.lng}
              handleMarker={handleMarker}
              mode={!state.flag ? 'view' : 'edit'}
            />
          </div>
        </form>
      </div>
    )
  }
}

export default General
