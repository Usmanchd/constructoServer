import React, { Component } from 'react'
import { Form, Input, Button, message, Row, Col, Spin } from 'antd'
import { Helmet } from 'react-helmet'
import firebase from '../../../config/fbConfig'
import FileUploader from 'react-firebase-file-uploader'
import { connect } from 'react-redux'
import { signUp } from '../../../redux/user/actions'
import styles from './style.module.scss'

const avatarURL =
  'https://firebasestorage.googleapis.com/v0/b/abstract-lane-269917.appspot.com/o/images%2F9f0524f8-059a-4401-9ee0-9057eb3878ed.jpg?alt=media&token=3f63a559-ece2-4bc4-a647-0a3746f14e76'

@Form.create()
class RegisterForm extends Component {
  state = {
    isUploading: false,
    progress: 0,
    loading: false,
    avatarURL,
  }
  onSubmit = event => {
    event.preventDefault()
    const { form, signUp, email, password } = this.props
    form.validateFields((error, values) => {
      if (!error) {
        message.loading('Action in progress..', true)
        values = { ...values, email, password, avatarURL: this.state.avatarURL }
        console.log(values)
        signUp(values)
      }
    })
  }

  handleUploadStart = () => {
    this.setState({ isUploading: true, progress: 0 })
  }
  handleProgress = progress => this.setState({ progress })
  handleUploadError = error => {
    this.setState({ isUploading: false })
  }
  handleUploadSuccess = filename => {
    this.setState({ avatar: filename, progress: 100 })
    firebase
      .storage()
      .ref('images')
      .child(filename)
      .getDownloadURL()
      .then(url => this.setState({ avatarURL: url }))
    setTimeout(() => {
      this.setState({ isUploading: false })
    }, 1000)
  }

  render() {
    const { form } = this.props

    // const uploadButton = (
    //   <div>
    //     {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
    //     <div className="ant-upload-text">Upload</div>
    //   </div>
    // )

    return (
      <div>
        <Helmet title="Register" />
        <div className={`${styles.title} login-heading`}>
          <h1>
            <strong>COMPLETE YOUR SIGNUP</strong>
          </h1>
          {/* <p>
            Pluggable enterprise-level react application framework.
            <br />
            An excellent front-end solution for web applications built upon Ant Design and UmiJS.
            <br />
            Credentials for testing purposes - <strong>admin@mediatec.org</strong> /{' '}
            <strong>cleanui</strong>
          </p> */}
        </div>
        <div className={styles.block}>
          <div className="row">
            <div className="col-xl-12">
              <div className={styles.inner}>
                <div className={styles.form}>
                  <h4 className="text-uppercase">
                    <strong>Please sign up</strong>
                  </h4>
                  <br />

                  <Form layout="vertical" hideRequiredMark onSubmit={this.onSubmit}>
                    <Row>
                      <Col span={12}>
                        <Form.Item label="Name">
                          {form.getFieldDecorator('Name', {
                            initialValue: '',
                            rules: [
                              {
                                required: true,
                                message: 'Please input your name',
                              },
                            ],
                          })(<Input size="default" />)}
                        </Form.Item>
                        <Form.Item label="Surname">
                          {form.getFieldDecorator('surname', {
                            initialValue: '',
                            rules: [
                              {
                                required: true,
                                message: 'Please input your surname',
                              },
                            ],
                          })(<Input size="default" />)}
                        </Form.Item>
                        <Form.Item label="Title">
                          {form.getFieldDecorator('title', {
                            initialValue: '',
                            rules: [
                              {
                                required: true,
                                message: 'Please input your title',
                              },
                            ],
                          })(<Input size="default" />)}
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="Phone">
                          {form.getFieldDecorator('phone', {
                            initialValue: '',
                            rules: [
                              {
                                required: true,
                                message: 'Please input your phone',
                              },
                            ],
                          })(<Input size="default" type="number" />)}
                        </Form.Item>
                        <Form.Item label="Image">
                          <label>
                            <div
                              style={{
                                width: 34,
                                height: 34,
                                color: '#fbd800',
                                margin: '2px auto',
                              }}
                            >
                              <Spin
                                spinning={this.state.isUploading}
                                style={{
                                  width: '120px',
                                  height: '120px',
                                  margin: '0 auto',
                                }}
                              >
                                <img
                                  src={this.state.avatarURL}
                                  // htmlFor="image"
                                  style={{
                                    width: '120px',
                                    height: '120px',

                                    margin: '0 auto',
                                  }}
                                  alt="userIcon"
                                />
                              </Spin>
                            </div>
                            <FileUploader
                              accept="image/*"
                              name="avatar"
                              listType="picture-card"
                              className="avatar-uploader"
                              randomizeFilename
                              storageRef={firebase.storage().ref('images')}
                              onUploadStart={this.handleUploadStart}
                              onUploadError={this.handleUploadError}
                              onUploadSuccess={this.handleUploadSuccess}
                              onProgress={this.handleProgress}
                              style={{ width: '200px', display: 'none' }}
                            />
                            {/* <p className="label-low" style={{ textAlign: 'center' }}>
                          Upload Your Image
                        </p> */}
                          </label>
                        </Form.Item>
                      </Col>
                    </Row>
                    <div className="form-actions">
                      <Button type="primary" className="width-150 mr-4" htmlType="submit">
                        Sign Up
                      </Button>
                    </div>
                    {/* <div className="form-group">
                      <p>Use another service to Log In</p>
                      <div className="mt-2">
                        <a href="javascript: void(0);" className="btn btn-icon mr-2">
                          <i className="icmn-facebook" />
                        </a>
                        <a href="javascript: void(0);" className="btn btn-icon mr-2">
                          <i className="icmn-google" />
                        </a>
                        <a href="javascript: void(0);" className="btn btn-icon mr-2">
                          <i className="icmn-windows" />
                        </a>
                        <a href="javascript: void(0);" className="btn btn-icon mr-2">
                          <i className="icmn-twitter" />
                        </a>
                      </div>
                    </div> */}
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  null,
  { signUp },
)(RegisterForm)
