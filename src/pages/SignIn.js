import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Layout, Button, Row, Col, Typography, Form, Input } from "antd";
import signinbg from "../assets/images/img-signin.jpg";
import axios from "axios";

const { Title } = Typography;
const { Header, Content } = Layout;

export default class SignIn extends Component {
  state = {
    redirectToDashboard: false,
    loading: false,
  };

  onFinish = async (values) => {
    this.setState({ loading: true });
    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        username: values.username,
        password: values.password,
      });

      const { token } = response.data;
      const user = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
      if (user.role === "admin") {
        this.setState({ redirectToDashboard: true });
      } else {
        alert("Error: This is not an admin account.");
      }
    } catch (error) {
      console.error("Error logging in:", error.response || error);
      alert(error.response?.data?.message || "Error logging in. Please try again.");
    } finally {
      this.setState({ loading: false });
    }
  };

  handleNavigate = () => {
    window.location.href = "http://localhost:3001/";
  };

  render() {
    const { loading, redirectToDashboard } = this.state;
    return (
      <>
        {redirectToDashboard && <Redirect to="/dashboard" />}
        <Layout className="layout-default layout-signin">
          <Header>
            <div className="header-col header-brand">
              <h5>Admin</h5>
            </div>
          </Header>
          <Content className="signup">
            <Row gutter={[24, 0]} justify="space-around">
              <Col xs={{ span: 24, offset: 0 }} lg={{ span: 6, offset: 2 }} md={{ span: 12 }}>
                <Title className="mb-15">Sign in</Title>
                <Title className="font-regular text-muted" level={5}>
                  Enter your username and password to sign in
                </Title>
                <Form onFinish={this.onFinish} layout="vertical" className="row-col">
                  <Form.Item
                    className="username"
                    label="username"
                    name="username"
                    rules={[{ required: true, message: "Please input your username" }]}
                  >
                    <Input placeholder="username" />
                  </Form.Item>

                  <Form.Item
                    className="password"
                    label="password"
                    name="password"
                    rules={[{ required: true, message: "Please input your password!" }]}
                  >
                    <Input.Password placeholder="password" />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ width: "100%" }}
                      loading={loading}
                    >
                      SIGN IN
                    </Button>
                  </Form.Item>
                  <Form.Item>
                    <Button type="link" onClick={this.handleNavigate} block>
                      Return to the main page 
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
              <Col className="sign-img" style={{ padding: 12 }} xs={{ span: 24 }} lg={{ span: 12 }} md={{ span: 12 }}>
                <img src={signinbg} alt="" />
              </Col>
            </Row>
          </Content>
        </Layout>
      </>
    );
  }
}
