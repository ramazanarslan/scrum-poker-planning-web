import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { POST, GET } from "../service";

import { Form, Input, InputNumber, Button, Row, Col } from "antd";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not validate email!",
    number: "${label} is not a validate number!",
  },
  number: {
    range: "${label} must be min ${min}",
  },
};

function CreateSession() {
  let history = useHistory();

  const onFinish = async (values) => {
    const res = await POST("/sessions", values);
    if (res) {
      history.push(`/view-planning-as-scrum-master/${res.session._id}`);
    }
  };

  return (
    <Row>
      <Col span={12} offset={6}>
        <Form
          style={{ paddingTop: 100 }}
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
          validateMessages={validateMessages}
        >
          <Form.Item
            name={["name"]}
            label="Session Name"
            rules={[
              {
                required: true,
                max: 200,
              },
            ]}
          >
            <Input maxLength={201} placeholder={"Sprint 1"} />
          </Form.Item>

          <Form.Item
            name={["numOfVoters"]}
            label="Number of Voters"
            rules={[{ required: true, type: "number", min: 1 }]}
          >
            <InputNumber min={1} defaultValue={3} />
          </Form.Item>
          <p></p>
          <Form.Item
            rules={[
              {
                required: true,
              },
            ]}
            name={["stories"]}
            label="Stories"
          >
            <Input.TextArea autoSize={{ minRows: 15 }} allowClear />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit" shape="round">
              Create Session
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}

export default CreateSession;
