import React, { Component } from 'react'
import { Input, Button } from 'antd'
import styles from '../style.module.css'

class Management extends Component {
  render() {
    const { state, handleChange, viewUser, match, openModal } = this.props
    return (
      <div className={styles.grid}>
        <h5>Management</h5>
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
              Timing
            </p>

            <Input
              disabled={!state.flag}
              type="date"
              id="estimatestart"
              name="trip-start"
              value={state.estimatestart}
              onChange={handleChange}
              style={{ fontWeight: 'bolder' }}
            />
          </div>
          <div className="input-field col s12">
            <Input
              disabled={!state.flag}
              type="date"
              id="estimatend"
              name="trip-end"
              value={state.estimatend}
              onChange={handleChange}
              style={{ fontWeight: 'bolder' }}
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
              Cloud Space
            </p>

            <Input
              disabled
              type="text"
              id="spaceUsed"
              placeholder="Used"
              // value={state.street}
              required
              style={{ fontWeight: 'bolder' }}
              // onChange={handleChange}
            />
          </div>
          <div className="input-field">
            <Input
              disabled
              style={{ fontWeight: 'bolder' }}
              type="text"
              id="spaceLimit"
              placeholder="Available"
              // value={state.street}
              required
              // onChange={handleChange}
            />
          </div>
          <div className="input-field">
            <p
              style={{
                margin: '25px 0 6px 0',
                padding: '0',
                fontSize: '14px',
              }}
            ></p>

            <Button
              style={{
                margin: '5px 25px',
                fontSize: '10px',
                padding: '0 5px',
                width: '80%',
              }}
            >
              Request More Space
            </Button>
          </div>
          <div className="input-field">
            <p
              style={{
                margin: '25px 0 6px 0',
                padding: '0',
                fontSize: '14px',
              }}
            >
              Users
            </p>
            <Input
              placeholder="Used"
              disabled
              style={{ fontWeight: 'bolder' }}
              type="text"
              id="userUsed"
              // value={state.street}
              required
              // onChange={handleChange}
            />
          </div>
          <div className="input-field">
            <Input
              disabled
              style={{ fontWeight: 'bolder' }}
              type="text"
              id="userLimit"
              placeholder="Available"
              // value={state.street}
              required
              // onChange={handleChange}
            />
          </div>
          <div className="input-field">
            <p
              style={{
                margin: '25px 0 6px 0',
                padding: '0',
                fontSize: '14px',
              }}
            ></p>

            <Button
              style={{
                margin: '5px 25px',
                fontSize: '10px',
                padding: '0 5px',
                width: '80%',
              }}
            >
              Request More Users
            </Button>

            <div>
              <p
                htmlFor="name"
                style={{
                  margin: '25px 0 6px 0',
                  padding: '0',
                  fontSize: '16px',
                  textAlign: 'center',
                }}
              >
                List of Users
              </p>
              <div className={styles.usersList}>
                {viewUser && viewUser.map(v => <p>{v.Name}</p>)}
              </div>
              {match.params.id !== 'create-project' && (
                <Button
                  style={{
                    margin: '15px 25px',
                    fontSize: '10px',
                    padding: '0 5px',
                    width: '80%',
                  }}
                  onClick={openModal}
                >
                  Configure Users
                </Button>
              )}
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default Management
