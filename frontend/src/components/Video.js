export default function Video(props) {
    if (props.video_link.length > 0)
    {
        return (
            <iframe src={props.video_link} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
        );
    }
    else
    {
        return (
        <div className="empty-frame">
            <p>Select an exercise to see a video explaining how to perform it</p>
        </div>)
    }
}
