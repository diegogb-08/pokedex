import React, { useEffect, useState }  from 'react'
import { useHistory } from 'react-router-dom'; 
import InputForm from '../InputForm/InputForm';
import axios from 'axios';
import { LOGIN } from '../../redux/types/userType';
import { connect } from 'react-redux';
import validate from "../../tools/validate";
import { PORT } from '../../tools/apiPaths';
import Button from '../Button/Button';



const Login = (props) => {

    let history = useHistory();

    // HOOKS

    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    })

    const [password, setPassword] = useState({
        hideShow: 'password',
        showHide: 'SHOW'
    })

    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState([]);

    // Style variable error

    const styles = {
        error: {
            borderColor: '#c92432',
            color: '#c92432',
            background: '#fffafa',
        },
        correct: {}
    }


    // HANDLERS

    const handleState = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value, [e.target.name]: e.target.value});
        setMessage('')
        if (Object.keys(errors).length > 0) 
        setErrors(validate({ ...credentials, [e.target.name]: e.target.value, [e.target.name]: e.target.value}, "login"));
    } 


    // it detects the changes from the input and on key press Enter, sends the info to multiSearch()
    useEffect(() => {
        const listener = event => {
            if (event.code === "Enter" || event.code === "NumpadEnter" || event.keyCode === 13) {
                toggle()
            }
        };
        document.addEventListener("keydown", listener);
        return () => {
        document.removeEventListener("keydown", listener);
        };
        // eslint-disable-next-line
    },[credentials]);


    // FUNCTIONS

    const showPassord = () => {

        if(password.hideShow === "password"){
            return setPassword({...password, hideShow: 'text', showHide: 'HIDE'});
        }else{
            return setPassword({...password, hideShow: 'password', showHide: 'SHOW'});
        }
    }

    const toggle = async () => {

        const errs = validate(credentials, "login");
        setErrors(errs);

        if (Object.keys(errs).length === 0) {
            try{
                let result = await axios.post(PORT+'login', credentials)

                if(result.data ) {
                    props.dispatch({type: LOGIN, payload: result.data});

                    setTimeout(()=>{
                        history.push('/home')
                    },500)
                }
            }catch(err){
                setMessage('Email or password not found')
            }
        }
        
    }


    return (
        <div className="loginComponent">
            <div className="loginTitle">
                <h2>SIGN IN!</h2>
            </div>
            <div className="loginContainer">
                <div className="loginInput">
                    <InputForm
                        type="text"
                        name="email"
                        onChange={handleState}
                        title="Email"
                        error={errors.email?.help}
                        style={errors.email?.status ?  styles.error : styles.correct}
                    />
                </div>
                <div className="loginInput">
                    <InputForm
                        type={password.hideShow}
                        name="password"
                        onChange={handleState}
                        title="Password"
                        error={errors.password?.help}
                        showHide={password.showHide} 
                        onClick={() => showPassord()}
                        style={errors.password?.status ?  styles.error : styles.correct}
                    />
                </div>
                <div className="errorMessage">
                    <p>{message}</p>
                </div>
                <div className="loginInput buttonLogin">
                    <Button onClick={()=>toggle()}>
                       <p>Enjoy!</p> 
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default connect()(Login)
