import React, { Component } from 'react'
import { connect } from 'react-redux'
import Dropdown from 'react-dropdown'
import { Input, Button, Modal } from 'antd'
import { Icon } from 'react-icons-kit'
import { cross } from 'react-icons-kit/icomoon/cross'
import 'react-dropdown/style.css'
import {
  handleAddUser,
  changeUserRole,
  deleteUserFromProject,
  deleteEmailFromPenReg,
} from '../../../redux/projects/projectActions'

import Roles from './Roles'
import styles from '../style.module.css'

const { confirm } = Modal

class Users extends Component {
  state = { isOpen: false, email: '', selectedOption: null, user: [] }

  componentDidMount = () => {
    const { viewUser } = this.props
    this.setState({
      ...this.state,
      user: viewUser.map(u => {
        return {
          uservalue: { ...u },
          selectedOption: this.getRole(u),
        }
      }),
      options: this.getOptions(),
    })
  }

  // componentDidUpdate = (pervProps) => {
  //   if (this.props !== pervProps) {
  //     this.setState({
  //       ...this.state,
  //       user: viewUser.map((u) => {
  //         return {
  //           uservalue: { ...u },
  //           selectedOption: this.getRole(u),
  //         };
  //       }),
  //       options: this.getOptions(),
  //     });
  //   }
  // };

  getRole = user => {
    const { roles } = this.props
    const u = roles.filter(role => role.usersID.includes(user.ID))

    if (u[0]) return u[0].roleName
    return null
  }

  getOptions = () => {
    const { roles } = this.props
    const uniqueNames = []
    roles.map(role => uniqueNames.push(role.roleName))

    const option = uniqueNames.map(un => {
      return {
        value: un,
        label: un,
      }
    })

    return option
  }

  openModal = () => {
    this.setState({ ...this.state, isOpen: true })
  }

  // afterOpenModal() {
  //   // references are now sync'd and can be accessed.
  //   subtitle.style.color = '#f00';
  // }
  handleChange = (selectedOption, i) => {
    const { user } = this.state
    const { roles, changeUserRole, projectID } = this.props
    if (selectedOption.value === user[i].selectedOption) return

    const User = user.map((u, index) => {
      if (i === index) {
        return { ...u, selectedOption: selectedOption.value }
      }
      return u
    })

    const role = roles.filter(role => role.roleName === selectedOption.value)

    const userID = user[i].uservalue.ID

    this.setState({
      ...this.state,
      user: User,
    })

    changeUserRole(role[0], userID, projectID)
  }

  closeModal = () => {
    this.setState({ ...this.state, isOpen: false })
  }

  addUser = () => {
    const { handleAddUser, projectID } = this.props
    const { email } = this.state
    if (email === '') return
    handleAddUser(email, projectID)
  }

  handleDelete = (ID, projectID, deleteUser) => {
    confirm({
      title: 'Do you want to delete this User?',
      content: 'When clicked the OK button, User will be deleted from the project!',
      onOk() {
        deleteUser(ID, projectID)
      },
      onCancel() {},
    })
  }

  showConfirm = (pr, projectID, deleteUser) => {
    confirm({
      title: 'Do you want to delete this User?',
      content: 'When clicked the OK button, User will be deleted from the project!',
      onOk() {
        deleteUser(pr, projectID)
      },
      onCancel() {},
    })
  }

  render() {
    const { email, user, isOpen, options } = this.state
    const {
      deleteEmailFromPenReg,
      deleteUserFromProject,
      projectID,
      pendingRegistrations,
      roles,
    } = this.props
    return (
      <div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
          }}
        >
          <span>
            {/* <h5 style={{ margin: '0', padding: '0' }}>Users</h5>
            <p style={{ margin: '0', padding: '0' }}>Configuration of Users and their Roles</p> */}

            <p
              htmlFor="name"
              style={{
                margin: '25px 0 0 0',
                padding: '0',
                fontSize: '12px',
              }}
            >
              New User Email
            </p>
            <div
              className="input-field"
              style={{
                width: '100%',

                marginTop: '0',
              }}
            >
              <form onSubmit={e => e.preventDefault()}>
                <span>
                  <Input
                    id="email"
                    // disabled={!state.flag}
                    style={{ fontWeight: 'bolder', width: '60%' }}
                    type="email"
                    value={email}
                    required
                    onChange={e => this.setState({ ...this.state, email: e.target.value })}
                  />
                </span>
                <Button type="submit" onClick={this.addUser}>
                  Add User
                </Button>

                <Button onClick={this.openModal}>Configure Roles</Button>
              </form>
            </div>
            <div className={styles.usersList} style={{ height: '240px' }}>
              {user &&
                user.map((v, i) => (
                  <React.Fragment>
                    <p
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                      className={styles.defaultList}
                    >
                      {v.uservalue.Name}
                      <span
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <Dropdown
                          options={options && options}
                          onChange={selectedOption => this.handleChange(selectedOption, i)}
                          value={v.selectedOption}
                          placeholder="Select an option"
                          className="dropdown"
                        />
                        <span
                          style={{ color: '#c4302b', marginLeft: '8px' }}
                          onClick={() =>
                            this.handleDelete(v.uservalue.ID, projectID, deleteUserFromProject)
                          }
                        >
                          <Icon size={18} icon={cross} />
                        </span>
                      </span>
                    </p>
                    <hr />
                  </React.Fragment>
                ))}
              {pendingRegistrations.map(pr => (
                <React.Fragment>
                  <span
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <p className={styles.defaultList}>{pr} (Pending Registation)</p>{' '}
                    <span style={{ color: '#c4302b', marginLeft: '8px' }}>
                      <Icon
                        size={18}
                        icon={cross}
                        onClick={() => this.showConfirm(pr, projectID, deleteEmailFromPenReg)}
                      />
                    </span>
                  </span>
                  <hr />
                </React.Fragment>
              ))}
            </div>
          </span>
          {/* <Button
            onClick={closeModal}
            style={{ position: 'absolute', bottom: '5px', left: '5px', right: '5px',width:'98%' }}
          >
            Close
          </Button> */}
        </div>
        <Modal
          title={
            <span>
              <h5 style={{ margin: '0', padding: '0' }}>Roles</h5>
            </span>
          }
          visible={isOpen}
          onOk={this.closeModal}
          onCancel={this.closeModal}
          width="640px"
        >
          <Roles
            roles={roles}
            options={options}
            closeModal={this.closeModal}
            projectID={projectID}
          />
        </Modal>
      </div>
    )
  }
}

export default connect(
  null,
  {
    handleAddUser,
    changeUserRole,
    deleteUserFromProject,
    deleteEmailFromPenReg,
  },
)(Users)
