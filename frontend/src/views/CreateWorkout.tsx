import {
    Container,
} from "reactstrap";
import "../App.css";
import AllSortedExercises from '../components/exerciseTiles/AllSortedExercises';
function WorkoutsPage() {
    return (
        <div>
            <div className="page-header header-filter">
                <Container>
                    <AllSortedExercises />
                </Container>
            </div>
            <div className="space-50" />
        </div>
    );
}

export default WorkoutsPage;
