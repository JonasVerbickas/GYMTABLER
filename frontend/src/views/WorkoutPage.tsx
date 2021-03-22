import { useEffect, useState } from "react"
import {
    Container,
    Card, CardText, CardTitle, CardSubtitle, CardImg,
} from "reactstrap"
import "../App.css"
import useFetchedData from "../components/useFetchedData"
interface exercise {
    bodypart: String;
    description: String;
    difficulty: number;
    equimpent: null;
    id: number;
    link: String;
    name: String;
}
interface data {
    slug: String;
    user: String;
    difficulty: number;
    exercises: exercise[];
}
const WorkoutPage = (props: any) => {
    const data = useFetchedData()
    const [found, setFound] = useState<data>({ "slug": "", "user": "", "difficulty": 0, "exercises": [] })
    useEffect(() => {
        let aux: data = { "slug": "", "user": "", "difficulty": 0, "exercises": [] }
        let auxfound = data.find(element => element["slug"] === props.match.params.id) || aux
        setFound(auxfound)
    }, [data])

    function URL2IMG(link: String) {
        if (link) {
            if (link.includes("youtube.com")) {

                if (link[link.length - 1] === "/") {
                    link = link.slice(0, link.length - 1)
                }
                let video_id = link.slice(link.length - 11, link.length);
                let thumbnail_link = "http://img.youtube.com/vi/" + video_id + "/0.jpg";
                return thumbnail_link;
            }
        }
        return undefined;
    }

    return (
        <div>
            <div className="content-center">
                <Container style={{ marginTop: 80 }}>
                    <h2 style={{ display: "flex", alignContent: "left", color: "#0892d0" }}>Workout: {props.match.params.id}</h2>
                    <h3 style={{ display: "flex", alignContent: "left" }}>Difficulty: {found["difficulty"]}</h3>
                    <Container style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>{found["exercises"].map((element: exercise) =>
                        <Card style={{ padding: 15, maxWidth: 400, margin: 15 }}>
                            <CardImg top style={{ maxWidth: 400 }} src={URL2IMG(element.link)} alt="CardImage" />
                            <CardTitle style={{ fontSize: 20 }}>{element.name}</CardTitle>
                            <CardSubtitle>{element.bodypart}</CardSubtitle>
                            <CardText>{element.description}</CardText>
                        </Card>)}
                    </Container>
                </Container>
            </div>
        </div >
    );
}

export default WorkoutPage;
