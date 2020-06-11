import React from "react";
import { Table, Tag } from "antd";
const columns = [
  {
    title: "Story",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Story Point",
    dataIndex: "storyPoint",
    key: "storyPoint",
  },

  {
    title: "Status",
    key: "status",
    dataIndex: "status",
    render: (status) => (
      <Tag
        color={
          status === "Active"
            ? "green"
            : status === "Not Voted"
            ? "volcano"
            : "geekblue"
        }
        key={status}
      >
        {status.toUpperCase()}
      </Tag>
    ),
  },
];

export default function StoryList({ stories }) {
  return (
    <div>
      <Table
        pagination={{ hideOnSinglePage: true }}
        columns={columns}
        dataSource={stories}
      />
    </div>
  );
}
