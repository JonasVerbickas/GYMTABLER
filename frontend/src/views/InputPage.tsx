import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Button,
    Input,
    FormGroup,
    Label,
    FormText,
    Container,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from "reactstrap";
// @ts-ignore
import Slider from "nouislider";
import { toast } from 'react-toastify';
function InputPage() {
    const [step, UpdateStep] = useState(1)
    const [weightUnit,UpdateWeightUnit] = useState('')
    const [heightUnit,UpdateHeightUnit] = useState('')
    const second = useRef<HTMLLIElement>(null)
    const third = useRef<HTMLLIElement>(null)
    const user = useRef<HTMLDivElement>(null)
    const info = useRef<HTMLDivElement>(null)
    const pref = useRef<HTMLDivElement>(null)

    function decrementStep() {
        // step is current value
        UpdateStep(prevStep => prevStep - 1)
        //remove active className
        if (step === 2 && second && second.current && user.current && pref.current) {
            second.current.className = ""
            user.current.className = "activediv"
            pref.current.className = "hidden"
        }
        else if (step === 3 && third && third.current && pref.current && info.current) {
            third.current.className = ""
            pref.current.className = "activediv"
            info.current.className = "hidden"
        }
    }

    function incrementStep() {
        // step is current value
        UpdateStep(prevStep => prevStep + 1)
        if (step === 1 && second.current && user.current && pref.current) {
            second.current.className = "active"
            user.current.className = "hidden"
            pref.current.className = "activediv"

        }
        else if (step === 2 && third && third.current && pref.current && info.current) {
            third.current.className = "active"
            pref.current.className = "hidden"
            info.current.className = "activediv"
        }
        //add active className
    }
    useEffect(() => {
        const sliderRef = document.getElementById('slider');
        const experienceRef = document.getElementById('experienceSlider');

        Slider.create(sliderRef, {
            start: [3],
            connect: [true, false],
            step: 1,
            range: { min: 1, max: 7 },
            behaviour: 'tap-drag',
            tooltips: false,
            pips: {
                mode: 'steps',
                density: 14
            }

        });
        Slider.create(experienceRef, {
            start: 1,
            connect: [true, false],
            step: 1,
            range: { min: 1, max: 5 },
            behaviour: 'tap-drag',
            tooltips: false,
            pips: {
                mode: 'steps',
                density: 20
            }

        });
    }, [])

    function SubmitForm() {
        toast.success('Registered Successfully!', {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
        });
        let element = document.querySelector('form') as HTMLFormElement
        const sliderRef = document.getElementById('slider') as Slider.Instance
        const experienceRef = document.getElementById('experienceSlider') as Slider.Instance
        if (element){
            let formData = new FormData(element)
            for(let [name, value] of formData) {
                console.log(`${name} = ${value}`); // key1 = value1, then key2 = value2
              }
            console.log(weightUnit)
            console.log(heightUnit)
            if (sliderRef && experienceRef){
                console.log(sliderRef.noUiSlider.get())
                console.log(experienceRef.noUiSlider.get())
            }

        }
            
    }
    function selectUnitforWeight(value:string){
        UpdateWeightUnit(value)
    }
    function selectUnitforHeight(value:string){
        UpdateHeightUnit(value)
    }
    return (
        <Container style={{ marginTop: '5em' }}>
            <div className="card px-0 pt-4 pb-0 mt-3 mb-3">
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <h3><strong>Create an account</strong></h3>
                    <p>and start your journey</p>
                </div>
                <div className="row">
                    <div className="col-md-12 mx-0">
                        <form id="msform">
                            <ul id="progressbar">
                                <li className="active" id="account"><strong>Account</strong></li>
                                <li ref={second} id="preferences"><strong>Preferences</strong></li>
                                <li ref={third} id="info"><strong>Info</strong></li>
                            </ul>
                            <div ref={user} className="activediv">
                                <FormGroup>
                                    <Input
                                        type="email"
                                        name="email"
                                        id="exampleEmail"
                                        placeholder="Enter email"
                                        className="msInput"
                                    />
                                    <Input
                                        type="text"
                                        name="username"
                                        id="exampleName"
                                        placeholder="Enter username"
                                        className="msInput"
                                    />
                                    <Input
                                        type="password"
                                        name="password"
                                        id="examplePass"
                                        placeholder="Enter password"
                                        className="msInput"
                                    />
                                    <Button
                                        className="nav-link d-lg-block"
                                        color="primary"
                                        name="next"
                                        onClick={incrementStep}>
                                        Next Step
                                    </Button>
                                </FormGroup>
                            </div>
                            <div ref={pref} className="hidden">
                                <FormGroup>
                                    <FormText>Select how many days a week would you like to work out:</FormText>
                                    <div id='slider' style={{ margin: '20px' }} ></div>
                                    <div className="custom-form-radio" >
                                        <FormText style={{ margin: '20px' }}>Select your equipment access: </FormText>
                                        <Label >
                                            <Input type="radio" name="noEquipment" id="equipment1" defaultChecked />No equipment
                                    </Label>
                                        <Label >
                                            <Input type="radio" name="basicEquipment" id="equipment2" />Basic equipment
                                    </Label>
                                        <Label className="form-check-label">
                                            <Input type="radio" name="gymEquipment" id="equipment3" />Gym equipment
                                    </Label>
                                    </div>
                                    <FormText>How would you rate your level of comfort and experience working out:</FormText>
                                    <div id='experienceSlider' style={{ margin: '20px' }} ></div>
                                    <div style={{ display: 'flex', marginTop: '3em' }}>
                                        <Button
                                            className="nav-link d-lg-block"
                                            color="default"
                                            name="prev"
                                            onClick={decrementStep}>
                                            Previous
                                    </Button>
                                        <Button
                                            className="nav-link d-lg-block"
                                            color="primary"
                                            name="next"
                                            onClick={incrementStep}>
                                            Next Step
                                    </Button>
                                    </div>
                                </FormGroup>
                            </div>
                            <div ref={info} className="hidden" >
                                <FormGroup>
                                    <div>
                                        <Label for="exampleSelectMulti">Select Age</Label>
                                        <Input className="selectGroup" type="select" name="ageSelect" id="ageSelect">
                                            <option>16-18</option>
                                            <option>18-25</option>
                                            <option>25-35</option>
                                            <option>35-45</option>
                                            <option>&gt;50</option>
                                        </Input>
                                        <Label for="exampleSelectMulti">Select Height</Label>
                                        <div className="split-dropdown">
                                            <Input className="selectGroup" type="number" name="heightSelect" id="heightSelect"/>
                                            <UncontrolledDropdown>
                                                <DropdownToggle caret data-toggle="dropdown">
                                                    {heightUnit || 'Select a unit' } 
                                                </DropdownToggle>
                                                <DropdownMenu>
                                                    <DropdownItem onClick={()=>{selectUnitforHeight('cm')}} dropDownValue="cm">cm</DropdownItem>
                                                    <DropdownItem onClick={()=>{selectUnitforHeight('inch')}} dropDownValue="inch">inch</DropdownItem>
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                        </div>
                                        <Label for="exampleSelectMulti">Select Weight</Label>
                                        <div className="split-dropdown">
                                            <Input className="selectGroup" type="number" name="weightSelect" id="weightSelect" />
                                            <UncontrolledDropdown>
                                                <DropdownToggle caret data-toggle="dropdown">
                                                    {weightUnit || 'Select a unit' } 
                                                </DropdownToggle>
                                                <DropdownMenu>
                                                    <DropdownItem onClick={()=>{selectUnitforWeight('kg')}} dropDownValue="kg">kg</DropdownItem>
                                                    <DropdownItem onClick={()=>{selectUnitforWeight('lbs')}} dropDownValue="lbs">lbs</DropdownItem>
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex' }}>
                                        <Button
                                            className="nav-link d-lg-block"
                                            color="default"
                                            name="prev"
                                            onClick={decrementStep}>
                                            Previous
                                    </Button>
                                    <Link style={{ color: 'white' }} to="/">
                                        <Button
                                            className="nav-link d-lg-block"
                                            color="primary"
                                            name="next"
                                            onClick={SubmitForm}>
                                            Confirm
                                        </Button>
                                    </Link>
                                    </div>
                                </FormGroup>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default InputPage;
