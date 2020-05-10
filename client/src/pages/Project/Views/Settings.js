import React, { Component } from 'react'
import { Input, Button } from 'antd'
import styles from '../style.module.css'

class Settings extends Component {
  getDate = milisecond => {
    const date = new Date(milisecond)
    return date.toString()
  }
  render() {
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
              value={this.props.state.createdby}
              required
              onChange={this.props.handleChange}
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
              value={this.getDate(this.props.state.createdAt)}
              required
              onChange={this.props.handleChange}
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
                fontSize: '14px',
              }}
            >
              Active
            </span>
            <span>{this.props.state.active ? 'Active' : 'Not Active'}</span>
            <br />
            <Button
              disabled={!this.props.state.flag && this.props.match.params.id !== 'create-project'}
              style={{
                margin: '15px 25px',
                fontSize: '10px',
                padding: '0 5px',
                width: '80%',
              }}
              onClick={this.props.handleActive}
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
            <span>{this.props.state.archive ? 'True' : 'False'}</span>
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
              onClick={this.props.deleteProject}
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
