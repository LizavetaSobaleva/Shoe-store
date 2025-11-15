import { useLocation, useParams, useNavigate } from "react-router-dom";
import { Button, Typography } from "antd";
import ReactPlayer from "react-player";

const { Title } = Typography;

export default function VideoPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const url =
    (location.state as { url?: string } | null)?.url ||
    "https://www.youtube.com";

  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      <Title level={3}>Product Video #{id}</Title>

      <div style={{ position: "relative", paddingTop: "56.25%" }}>
        <ReactPlayer
          src={url}
          playing
          controls
          width="100%"
          height="100%"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
      </div>

      <Button style={{ marginTop: 16 }} onClick={() => navigate(-1)}>
        Back
      </Button>
    </div>
  );
}
