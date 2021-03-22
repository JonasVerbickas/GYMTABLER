import {
    Container,
    Row,
} from "reactstrap";
import "../App.css";
import { Link } from "react-router-dom"
import { useEffect, useState } from "react";
import useFetchedData from "../components/useFetchedData";

const WorkoutsPage = () => {
    const data = useFetchedData()
    return (
        <div>
            <div className="content-center">
                <Container style={{ marginTop: 80 }}>
                    <h3 style={{ display: "flex", alignContent: "left" }}>Pre-built Workouts</h3>
                    <Row>{data.map(element => (
                        <Link to={'workouts/' + element["slug"]} >
                            <div className="exerciseContainer">
                                <p style={{ fontSize: 22, justifyContent: "center", color: "#0892d0", fontWeight: "bold" }}>{element["slug"]}</p>
                                <p>Difficulty: {element["difficulty"]}</p>
                            </div>
                        </Link>
                    ))}</Row>
                    <h3 style={{ display: "flex", alignContent: "left" }}>Custom Workouts</h3>
                    <Row>
                        <Link to="createworkout">
                            <div className="exerciseContainer">
                                <div className="plusSign">+</div>
                                <p>Create your custom workout</p>
                            </div>
                        </Link>
                    </Row>
                </Container>
            </div>
        </div >
    );
}

export default WorkoutsPage;
