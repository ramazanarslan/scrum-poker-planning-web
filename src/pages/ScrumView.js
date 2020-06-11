import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { POST, GET, INTERVAL } from "../service";
import { useHistory } from "react-router-dom";

import { CopyToClipboard } from "react-copy-to-clipboard";
import { Button, Row, Col } from "antd";
import StoryList from "../components/StoryList";
import Selection from "../components/Selection";
import ScrumPanel from "../components/ScrumPanel";
import { Alert } from "antd";

function ScrumView() {
  let { id } = useParams();
  let location = useLocation();
  let history = useHistory();

  const [data, setData] = useState();
  const [activeStory, setActiveStory] = useState();
  const [url, setUrl] = useState();
  const [msg, setMsg] = useState();
  const isScrumMaster = location.pathname.includes(
    "view-planning-as-scrum-master"
  );
  useEffect(() => {
    async function getData() {
      const voterId = sessionStorage.getItem("voterId") || "initial";

      const url = `/sessions/${id}?voterId=${voterId}&isScrumMaster=${
        isScrumMaster ? "1" : "0"
      }`;
      const res = await GET(url);

      console.log("KML: Scrumview -> res", res);

      if (res) {
        if (!res.session) {
          setMsg(res);
        } else {
          if (res.voter && res.voter._id) {
            sessionStorage.setItem("voterId", res.voter._id + "");
          }
          setData(res);
          setUrl(window.location.origin + "/view-planning-as-developer/" + id);
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

  if (msg) {
    return (
      <div>
        <Alert message={msg} type="warning" />
      </div>
    );
  }

  async function finishSession() {
    const res = await GET(`/sessions/${data.session._id}/deactivate`);
    if (res) {
      sessionStorage.removeItem("voterId");

      history.push(`/`);
    }
  }
  return (
    <div>
      <div
        style={{ right: 20, top: 10, position: "absolute" }}
        onClick={() => finishSession()}
      >
        <img src="https://img.icons8.com/fluent/48/000000/shutdown.png" />
      </div>
      <div style={{ marginBottom: 40, marginTop: 20 }}>
        <h4>
          Please share link of developers to the teammates: <b>{url}</b> {"   "}
          <CopyToClipboard text={url} onCopy={() => null}>
            <Button size="small" type="primary" htmlType="submit" shape="round">
              Copy to clipboard
            </Button>
          </CopyToClipboard>
        </h4>
      </div>

      <Row
        style={{ height: "100%" }}
        gutter={16}
        justify="space-around"
        style={{ padding: 30 }}
      >
        <Col xl={12} lg={12} md={12} sm={24} xs={24} span={12}>
          <StoryList stories={data ? data.stories : null}></StoryList>
        </Col>
        <Col xl={6} lg={6} md={6} sm={24} xs={24} span={6}>
          <Selection activeStory={activeStory}></Selection>
        </Col>
        <Col xl={6} lg={6} md={6} sm={24} xs={24} span={6}>
          <ScrumPanel
            numOfVoters={
              (data && data.session && data.session.numOfVoters) || 0
            }
            activeStory={activeStory}
            votes={data ? data.votes : []}
            isAllVoterAreVoted={data && data.isAllVoterAreVoted}
          ></ScrumPanel>
        </Col>
      </Row>
    </div>
  );
}

export default ScrumView;
