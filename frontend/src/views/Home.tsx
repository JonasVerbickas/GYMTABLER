import React from 'react';
// @ts-ignore
import Typical from 'react-typical'
import {
    Container
} from "reactstrap";
import ExerciseTileTable from '../components/ExerciseTileTable.js';
import exercise_json from '../exercise.json';


const exercises = [{ title: 'Deadlift', img: "https://www.t-nation.com/system/publishing/articles/10006927/original/Crappy-Genetics-Deadlift-Like-This.jpg?1543517874" }, { title: 'Benchpress', link: "https://www.youtube.com/watch?v=rT7DgCr-3pg" }, { title: 'Squat', img: "https://d50b62f6164e0c4a0279-11570554cb5edae3285603e6ab25c978.ssl.cf5.rackcdn.com/html_body_blocks/images/000/014/508/original/SquatForm_enaca8d07704a3bef0815ed8ee3b7fdf76.jpg?1571368813" }, { title: 'Overhead press', img: "https://cdn2.omidoo.com/sites/default/files/imagecache/1200x630/images/headline/201705/13hl.jpg"}];

function Home() {
    return (
        <div>
            <div className="page-header header-filter">
                <Container>
                    <div className="content-center brand">
                        <h1 className="h1-seo">Gym Tabler</h1>
                        <h3 className="d-none d-sm-block">
                            Commit to be fit.
                        </h3>
                        <Typical
                            steps={['Anytime.', 400, 'Anywhere.', 400]}
                            loop={Infinity}
                            wrapper="h3"
                        />
                    </div>
                </Container>
            </div>
            <ExerciseTileTable listOfExercises={exercise_json}/>
            <div className="section section-examples" data-background-color="black">
                <div className="space-50" />
                <h3 className="text-center d-sm-block">
                    About
                </h3>
                <span className="text-center d-sm-block" style={{ margin: '15em', marginTop: '8em' }}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </span>
            </div>
        </div>
    );
}

export default Home;