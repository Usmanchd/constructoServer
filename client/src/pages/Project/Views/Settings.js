import React, { Component } from 'react'
import { Input, Button } from 'antd'
import styles from '../style.module.css'

class Settings extends Component {
  getDate = milisecond => {
    const date = new Date(milisecond)
    return date.toString()
  }

  render() {
    const { state, handleChange, handleActive, match, deleteProject } = this.props
    return (
      <div className={styles.grid}>
        <h5>Settings</h5>
        <form className={styles.detForm} onSubmit={e => e.preventDefault()}>
          <div className="input-field col s12">
            <p
              htmlFor="name"
              style={{
                margin: '25px 0 6px 0',
                padding: '0',
                fontSize: '14px',
              }}
            >
              Created by
            </p>
            <Input
              id="createdby"
              disabled
              style={{ fontWeight: 'bolder' }}
              type="text"
              value={state.createdby}
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
              Created at
            </p>

            <Input
              disabled
              style={{ fontWeight: 'bolder' }}
              type="text"
              id="createdad"
              value={this.getDate(state.createdAt)}
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
              Last update
            </p>

            <Input
              disabled
              style={{ fontWeight: 'bolder' }}
              type="text"
              id="lastupdate"
              value={this.getDate(state.lastupdate)}
              required
              onChange={handleChange}
            />
          </div>
          <div className="input-field" style={{ padding: '20px 0' }}>
            <span
              style={{
                margin: '25px 200px 0 0',
                padding: '0',
                fontSize: '14px',
              }}
            >
              Active
            </span>
            <span>{state.active ? 'Active' : 'Not Active'}</span>
            <br />
            <Button
              disabled={!state.flag && match.params.id !== 'create-project'}
              style={{
                margin: '15px 25px',
                fontSize: '10px',
                padding: '0 5px',
                width: '80%',
              }}
              onClick={handleActive}
            >
              Activate/Deactivate
            </Button>
          </div>
          <div className="input-field" style={{ padding: '20px 0', marginTop: '40px' }}>
            <span
              style={{
                margin: '25px 200px 0 0',
                padding: '0',
                fontSize: '14px',
              }}
            >
              Archive
            </span>
            <span>{state.archive ? 'True' : 'False'}</span>
            <br />
            <Button
              style={{
                margin: '15px 25px',
                fontSize: '10px',
                padding: '0 5px',
                width: '80%',
              }}
            >
              Archive
            </Button>
          </div>
          <div className="input-field" style={{ padding: '20px 0', marginTop: '40px' }}>
            <span
              style={{
                margin: '25px 200px 0 0',
                padding: '0',
                fontSize: '14px',
              }}
            >
              Delete Project
            </span>

            <br />
            <Button
              style={{
                margin: '15px 25px',
                fontSize: '10px',
                padding: '0 5px',
                width: '80%',
              }}
              onClick={deleteProject}
            >
              Delete
            </Button>
          </div>
        </form>
      </div>
    )
  }
}

export default Settings
