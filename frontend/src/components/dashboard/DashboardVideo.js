export default function DashboardVideo(props) {
  if (props.video_link.length > 0) {
    return (
      <iframe
        src={props.video_link}
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen="allowfullscreen"
      ></iframe>
    );
  } else {
    return (
      <div className="empty-frame">
        <p>Select an exercise to see a video explaining how to perform it</p>
      </div>
    );
  }
}
