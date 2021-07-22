import React from 'react';
import {Link} from 'react-router-dom'

function SignupSuccessful() {
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-10 mx-auto mt-5">
                    <div className="card shad mt-5">
                        <div className="card-body ml-3 my-4 text-center">
                            <h2>
                                <svg aria-hidden="true" width="32px" height="32px" focusable="false" data-prefix="fas" data-icon="check-circle" class="svg-inline--fa fa-check-circle fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="green" d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path></svg>
                                &nbsp;&nbsp;You have Signed-in successfully!
                            </h2>
                           <Link to='/Login'><h5 className="mt-4 text-dark">Click here to go to login page</h5></Link>
                            <h5 className="mt-n1">or</h5>
                            <Link to='/'><h5 className="mt-n1 text-dark">Return to home page</h5></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignupSuccessful
