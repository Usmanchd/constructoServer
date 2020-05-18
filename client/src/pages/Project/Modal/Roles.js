import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Input, Button } from 'antd'
import styles from '../style.module.css'
import { handleRole, handleUpdateRole, deleteRole } from '../../../redux/projects/projectActions'

const rolesArray = ['diaryRule', 'documentationRule', 'rolesRule', 'projectRule']

class Roles extends Component {
  state = { edit: true, showSetting: false, currentRole: {}, index: null }

  handleRole = roleName => {
    const { roles } = this.props
    let indexOfCurrentRole
    const currentRole = roles.filter((role, i) => {
      if (role.roleName === roleName.value) indexOfCurrentRole = i
      return role.roleName === roleName.value
    })
    this.setState({
      ...this.state,
      currentRole: currentRole[0],
      showSetting: true,
      edit: true,
      indexOfCurrentRole,
    })
  }

  handleDeleteRole = () => {
    const {
      currentRole: { roleName },
    } = this.state
    const { deleteRole, projectID } = this.props
    if (roleName === 'ADMINISTRATOR' || roleName === 'ORDINARY') return
    deleteRole(roleName, projectID)
  }

  handleAddNewRole = () => {
    const { roles } = this.props
    const currentRole = roles.filter(role => role.roleName === 'ORDINARY')
    this.setState({
      ...this.state,
      currentRole: { ...currentRole[0], roleName: 'New Role' },
      showSetting: true,
      edit: false,
    })
  }

  saveRole = () => {
    const { currentRole, edit, indexOfCurrentRole } = this.state
    const { handleUpdateRole, projectID, handleRole } = this.props

    if (currentRole.roleName === undefined) return
    if (edit) handleUpdateRole(currentRole, projectID, indexOfCurrentRole)
    else handleRole(currentRole, projectID)
  }

  render() {
    const { showSetting, currentRole, edit } = this.state
    const { options } = this.props
    return (
      <div className={styles.rolesGrid}>
        <div>
          <h5 style={{ margin: '0', padding: '0' }}>Users</h5>
          <p style={{ margin: '0 0 4px 0', padding: '0' }}>Configuration of Roles</p>
          <Button
            className="btn-det btn waves-effect"
            onClick={this.handleAddNewRole}
            style={{ width: '90%', marginBottom: '14px' }}
          >
            Add New
          </Button>
          <div className={styles.usersList} style={{ height: '300px' }}>
            {options.map(option => (
              <React.Fragment>
                <p
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                  className={styles.defaultList}
                  onClick={() => this.handleRole(option)}
                >
                  {option.label}
                </p>
                <hr />
              </React.Fragment>
            ))}
          </div>
          {/* <Button
            className="btn-det btn waves-effect"
            onClick={closeModal}
            style={{ position: 'absolute', bottom: '5px', left: '5px', right: '5px', width: '98%' }}
          >
            Close
          </Button> */}
        </div>
        {showSetting && (
          <div>
            <h5 style={{ margin: '0', padding: '0' }}>Roles Settings</h5>
            <p style={{ margin: '0', padding: '0' }}>Setting of Roles</p>
            <Input
              id="roleName"
              // disabled={!state.flag}
              style={{ fontWeight: 'bolder', width: '60%' }}
              type="text"
              value={currentRole.roleName && currentRole.roleName}
              required
              onChange={e =>
                this.setState({
                  ...this.state,
                  currentRole: {
                    ...currentRole,
                    roleName: e.target.value,
                  },
                })
              }
            />
            {edit ? (
              <Button className="btn-det btn waves-effect" onClick={this.saveRole}>
                Update
              </Button>
            ) : (
              <Button className="btn-det btn waves-effect" onClick={this.saveRole}>
                Save
              </Button>
            )}

            <div className={styles.usersList} style={{ height: '300px' }}>
              {rolesArray.map(role => (
                <React.Fragment>
                  <p className={styles.defaultList}>
                    {role}
                    <span
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Button
                        className={currentRole[role] === 'READ' && styles.btnYellow}
                        onClick={() => {
                          this.setState({
                            ...this.state,
                            currentRole: {
                              ...currentRole,
                              [role]: 'READ',
                            },
                          })
                        }}
                        style={{
                          margin: '6px 0',
                          borderRadius: '5px 0px 0px 5px',
                        }}
                      >
                        Read
                      </Button>
                      <Button
                        className={currentRole[role] === 'WRITE' && styles.btnYellow}
                        onClick={() => {
                          this.setState({
                            ...this.state,
                            currentRole: {
                              ...currentRole,
                              [role]: 'WRITE',
                            },
                          })
                        }}
                        style={{
                          margin: '6px 0',
                          borderRadius: '0',
                        }}
                      >
                        Write
                      </Button>
                      <Button
                        className={currentRole[role] === 'DISABLE' && styles.btnYellow}
                        onClick={() => {
                          this.setState({
                            ...this.state,
                            currentRole: {
                              ...currentRole,
                              [role]: 'DISABLE',
                            },
                          })
                        }}
                        style={{
                          margin: '6px 0',
                          borderRadius: '0px 5px 5px 0px',
                        }}
                      >
                        Disable
                      </Button>
                    </span>
                  </p>
                  <hr />
                </React.Fragment>
              ))}
            </div>
            {edit && (
              <Button
                className="btn-det btn waves-effect"
                // onClick={closeModal}
                onClick={this.handleDeleteRole}
                style={{ width: '90%', marginTop: '6px' }}
              >
                Delete
              </Button>
            )}
          </div>
        )}
      </div>
    )
  }
}

export default connect(
  null,
  {
    handleRole,
    handleUpdateRole,
    deleteRole,
  },
)(Roles)
