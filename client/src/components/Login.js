import React, {useRef} from "react";
import axios from 'axios';

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const usernameRef = useRef();
  const passwordRef = useRef();

  const submit = () => {
    axios.post('http://localhost:5000/api/login', {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    })
    .then(res => {
      localStorage.setItem('token', res.data.payload)
      props.history.push('/bubbles');
    })
    .catch(error => {
    alert(error.response.data.message);
    });
  };

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      
      <div>
        <div>
          Username <input ref={usernameRef} type="text" />
          <br />
          Password <input ref={passwordRef} type="text" />
        </div>

        <div>
          <button onClick={submit}>Submit</button>
        </div>
      </div>
    </>
  );
};

export default Login;
