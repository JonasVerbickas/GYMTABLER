import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { verify } from '../actions/auth';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

const Activate = ({ verify, match, status }) => {
    let history = useHistory()
    const [verified, setVerified] = useState(false);

    useEffect(() => {
        if (verified && status === "activation success") {
            toast.success('Account activated, you can now login', {
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

    const verify_account = e => {
        const uid = match.params.uid;
        const token = match.params.token;

        verify(uid, token);
        setVerified(true);
    };

    // if (verified) {
    //     return <Redirect to='/login' />
    // }

    return (
        <div className='container'>
            <div 
                className='d-flex flex-column justify-content-center align-items-center'
                style={{ marginTop: '200px' }}
            >
                <h1>Verify your Account:</h1>
                <button
                    onClick={verify_account}
                    style={{ marginTop: '50px' }}
                    type='button'
                    className='btn btn-primary'
                >
                    Verify
                </button>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    status: state.auth.status
});


export default connect(mapStateToProps, { verify })(Activate);
