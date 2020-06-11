import React, { useState } from "react";
import {
  Card,
  Table,
  Tag,
  InputNumber,
  Form,
  FormItem,
  Button,
  Alert,
} from "antd";
import moment from "moment";
import { POST } from "../service";

export default function ScrumPanel({
  activeStory,
  votes = [],
  isAllVoterAreVoted,
  numOfVoters,
}) {
  const [msg, setMsg] = useState();
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

  const columns = [
    {
      title: "Voter",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Point",
      dataIndex: "point",
      key: "point",
    },

    {
      title: "Time",
      key: "updatedAt",
      dataIndex: "updatedAt",
      render: (updatedAt) => (
        <Tag color={"green"} key={updatedAt}>
          {updatedAt ? moment(updatedAt).fromNow() : " - "}
        </Tag>
      ),
    },
  ];

  const onFinish = async (values) => {
    const res = await POST(`/story/${activeStory._id}/finish`, values);
    console.log("KML: onFinish -> res", res);

    if (res && res.sessionStatus === "end") {
      setMsg("Voting finished");
    }
  };
  return (
    <Card title={"Scrum Master Panel"} loading={!activeStory}>
      <div>
        <b>{(activeStory && activeStory.name) || ""}</b> is active<br></br>
        Number of Voters: {numOfVoters}
      </div>
      {msg ? (
        <Alert message={msg} type="success" />
      ) : (
        <Table
          size="small"
          pagination={{ hideOnSinglePage: true }}
          columns={columns}
          dataSource={votes}
        />
      )}
      <Form
        style={{ paddingTop: 30 }}
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={["storyPoint"]}
          label="Final Point"
          rules={[
            {
              type: "number",
              min: 1,
            },
          ]}
        >
          <InputNumber
            disabled={!isAllVoterAreVoted}
            min={1}
            defaultValue={3}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button
            disabled={!isAllVoterAreVoted}
            type="primary"
            htmlType="submit"
            shape="round"
          >
            Confirm
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
