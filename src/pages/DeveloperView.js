import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { POST, GET, INTERVAL } from "../service";
import { Button, Row, Col } from "antd";
import StoryList from "../components/StoryList";
import Selection from "../components/Selection";
import { Alert } from "antd";
function DeveloperView() {
  let { id } = useParams();
  const [data, setData] = useState();
  const [activeStory, setActiveStory] = useState();
  const [msg, setMsg] = useState();

  useEffect(() => {
    async function getData() {
      const voterId = sessionStorage.getItem("voterId") || "initial";
      const url = `/sessions/${id}?voterId=${voterId}`;
      const res = await GET(url);

      console.log("KML: Scrumview -> res", res);

      if (res) {
        if (!res.session) {
          setMsg(res);
        } else {
          setData(res);

          if (res.voter && res.voter._id) {
            sessionStorage.setItem("voterId", res.voter._id + "");
          }
          if (Array.isArray(res.stories) && res.stories.length) {
            setActiveStory(res.stories.find((e) => e.status === "Active"));
          }
        }
      }
    }

    getData();
    const interval = setInterval(() => {
      getData();
    }, INTERVAL);

    return () => {
      clearInterval(interval);
    };
  }, []);

  async function exitVoter() {
    const res = await POST(
      `/sessions/${data && data.session._id}/remove-voter`,
      {
        voterId: sessionStorage.getItem("voterId"),
      }
    );

    if (res) {
      sessionStorage.removeItem("voterId");
      window.location.href("/");
    }
  }
  if (msg) {
    return (
      <div>
        <Alert message={msg} type="warning" />
      </div>
    );
  }
  return (
    <div>
      <div style={{ marginBottom: 40, marginTop: 20 }}>
        <h3>
          Planning as Developer - Session Name:{" "}
          <b>{data && data.session ? data.session.name : ""}</b>
          <br></br>
          <Button onClick={() => exitVoter()}> Exit from this session</Button>
        </h3>
      </div>

      <Row gutter={16} justify="space-around" style={{ padding: 30 }}>
        <Col span={12}>
          <StoryList stories={data ? data.stories : null}></StoryList>
        </Col>
        <Col span={12}>
          <Selection activeStory={activeStory}></Selection>
        </Col>
      </Row>
    </div>
  );
}

export default DeveloperView;
