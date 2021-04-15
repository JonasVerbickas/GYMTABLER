import React, { useState, useEffect } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { signup } from '../actions/auth';
import { toast } from 'react-toastify'
import {
    Button,
    Input,
    FormGroup,
    Container
} from "reactstrap"

const Signup = ({ signup, isAuthenticated, status }) => {
    let history = useHistory()
    const [feedback, UpdateFeedback] = useState("")
    const [accountCreated, setAccountCreated] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        re_password: ''
    });

    const { username, email, password, re_password } = formData;

    // Validate User Input
    function ValidateUsername() {
        let element = document.querySelector('form')
        if (element.username.value < 4 || element.username.value > 15) {
            return (false)
        }
        return (true)
    }
    function ValidatePassword() {
        let element = document.querySelector('form')
        if (element.password.value < 8) {
            return (false)
        }
        else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(element.password.value)) {
            return (false)
        }
        return (true)
    }
    function validateForm() {
        if (!ValidateUsername()) {
            UpdateFeedback("The username should have between 4-15 characters")
            return false
        }
        else if (!ValidatePassword()) {
            UpdateFeedback("The password should be at least 8 characters long.\n The password should contain at least 1 lowercase letter, 1 uppercase letter, 1 numerical character and 1 special character")
            return false
        }
        else if (password != re_password) {
            UpdateFeedback("Passwords do not match")
        }
        else {
            UpdateFeedback("")
            return true
        }
    }

    useEffect(() => {
        if (accountCreated && status === "signup success") {
            toast.success('Registered Successfully! Please verify your email.', 
            {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
            });
            history.push("/login")
        }
    }, [status])

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        if (validateForm()) {
            signup(username, email, password, re_password);
            setAccountCreated(true);
        }
    };

    // if (status === "signup failed") {
    //     return <Redirect to='#' />
    // }
    // if (accountCreated) {
    //     return <Redirect to='/login' />
    // }

    return (
        <Container style={{ marginTop: '5em' }}>
            <div className="card px-0 pt-4 pb-0 mt-3 mb-3">
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <h3><strong>Create an account</strong></h3>
                    <p>and start your journey</p>
                </div>
                <div className="row">
                    <div className="col-md-12 mx-0">
                        <form onSubmit={e => onSubmit(e)} id="msform" autoComplete="on">
                            <ul id="progressbar">
                                <li className="active" id="account"><strong>Account</strong></li>
                            </ul>
                            <div className='activediv'>
                                <FormGroup>
                                    <Input
                                        className='msInput'
                                        type='text'
                                        placeholder='Username*'
                                        name='username'
                                        value={username}
                                        onChange={e => onChange(e)}
                                        required
                                    />
                                    <Input
                                        className='msInput'
                                        type='email'
                                        placeholder='Email*'
                                        name='email'
                                        value={email}
                                        onChange={e => onChange(e)}
                                        required
                                    />
                                    <Input
                                        className='msInput'
                                        type='password'
                                        placeholder='Password*'
                                        name='password'
                                        value={password}
                                        onChange={e => onChange(e)}
                                        minLength='6'
                                        required
                                    />
                                    <Input
                                        className='msInput'
                                        type='password'
                                        placeholder='Confirm Password*'
                                        name='re_password'
                                        value={re_password}
                                        onChange={e => onChange(e)}
                                        minLength='6'
                                        required
                                    />
                                    <span style={{ color: 'red' }} >{feedback}</span>
                                    <Button
                                        className="nav-link d-lg-block"
                                        color="primary"
                                        name="next">
                                        Submit
                                    </Button>
                                </FormGroup>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Container>
    );
};


const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    status: state.auth.status,
});

export default connect(mapStateToProps, { signup })(Signup);
