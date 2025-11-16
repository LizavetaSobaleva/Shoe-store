import { useLocation, useParams, useNavigate } from "react-router-dom";
import { Button, Typography } from "antd";
import ReactPlayer from "react-player";
import { trackEvent } from "../analytics";
import { useEffect } from "react";

const { Title } = Typography;

export default function VideoPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const url =
    (location.state as { url?: string } | null)?.url ||
    "https://www.youtube.com";

  useEffect(() => {
    trackEvent("view_product_video", {
      page: "video",
      product_id: id,
      video_url: url,
    });
  }, [id, url]);

  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      <Title level={3}>Product Video #{id}</Title>

      <div style={{ position: "relative", paddingTop: "56.25%" }}>
        <ReactPlayer
          src={url}
          controls
          width="100%"
          height="100%"
          onPlay={() =>
            trackEvent("video_play", {
              product_id: id,
              video_url: url,
            })
          }
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
