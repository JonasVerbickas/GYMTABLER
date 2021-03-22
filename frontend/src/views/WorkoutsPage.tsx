import {
    Container,
    Row,
} from "reactstrap";
import "../App.css";
import { Link } from "react-router-dom"
import { useEffect } from "react";
import { PREBUILD_WKOUT } from '../constants/index'
function WorkoutsPage() {
    useEffect(() => {
        const requestOptions = {
            method: 'POST',
            headers: { Accept: 'application/json' }
        };
        fetch(PREBUILD_WKOUT, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data)
            });
    }, [])
    return (
        <div>
            <div className="page-header header-filter">
                <div className="content-center">
                    <Container>
                        <h3 style={{ display: "flex", alignContent: "left" }}>Pre-built Workouts</h3>
                        <Row>
                            <div className="exerciseContainer">
                                <p>Exercises 1</p>
                                <p>Level:</p>
                                <p>Target:</p>
                            </div>
                            <div className="exerciseContainer">
                                <p>Exercises 2</p>
                                <p>Level:</p>
                                <p>Target:</p>
                            </div>
                            <div className="exerciseContainer">
                                <p>Exercises 3</p>
                                <p>Level:</p>
                                <p>Target:</p>
                            </div>
                        </Row>
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
            </div>
        </div>
    );
}

export default WorkoutsPage;
