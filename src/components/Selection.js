import React from "react";
import { Card, Button } from "antd";
import { useLocation } from "react-router-dom";
import { POST } from "../service";
const gridStyle = {
  width: "33.33%",
  textAlign: "center",
};
const options = [
  "1",
  "2",
  "3",
  "5",
  "8",
  "13",
  "21",
  "34",
  "55",
  "89",
  "134",
  "?",
];

export default function Selection({ activeStory }) {
  let location = useLocation();

  const isScrumMaster = location.pathname.includes(
    "view-planning-as-scrum-master"
  );

  async function voteStory(point) {
    const voterId = sessionStorage.getItem("voterId") || "initial";

    await POST(`/story/${activeStory._id}/add-vote?voterId=${voterId}`, {
      point,
      isScrumMaster,
    });
  }

  const voterId = sessionStorage.getItem("voterId") || "initial";
  const usedVote =
    activeStory &&
    activeStory.votes &&
    activeStory.votes.find((v) => v.voter === voterId);
  const isUsedVote = usedVote ? true : false;
  return (
    <Card
      title={`Active Story: ${(activeStory && activeStory.name) || ""}`}
      loading={!activeStory}
    >
      {options.map((e) => (
        <Card.Grid hoverable={!isUsedVote} style={gridStyle}>
          <Button
            disabled={isUsedVote && e !== usedVote.point}
            onClick={() => (isUsedVote ? null : voteStory(e))}
            size={"medium"}
            block={true}
            type={
              (isUsedVote && e === usedVote.point) || !isUsedVote
                ? "primary"
                : "dashed"
            }
          >
            {e}
          </Button>
        </Card.Grid>
      ))}

      <Card.Grid
        hoverable={false}
        style={{
          width: "100%",
          textAlign: "center",
        }}
      >
        <h4>{!isUsedVote ? "Please Vote !!!" : usedVote.point + " Voted"}</h4>
      </Card.Grid>
    </Card>
  );
}
