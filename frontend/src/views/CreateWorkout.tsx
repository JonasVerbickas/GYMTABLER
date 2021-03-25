import {
    Container,
} from "reactstrap";
import "../App.css";
import AllSortedExercises from '../components/createWorkout/AllSortedExercises';
function CreateWorkout() {
    return (
        <div>
            <AllSortedExercises />
            <div className="space-50" />
        </div>
    );
}

export default CreateWorkout;
