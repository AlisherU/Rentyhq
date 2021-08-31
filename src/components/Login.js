import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
// Styling 
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { login } from '../actions/userActions'

const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: 'white',

    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: 'blue',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: 'blue',
        '&:hover': {
          backgroundColor: '#1E90FF',
        }
    },
    link: {
      color: 'grey',
    }
}));






function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch()
    const history = useHistory()
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    // const redirect = location.search ? location.search.split('=')[1] : '/'
    const classes = useStyles();

    useEffect(() => {
        if (userInfo) {
            history.push('/main')
        }
    }, [history, userInfo])

    const loginSubmit = async e => {
        e.preventDefault()
        try {
            dispatch(login(email, password))

        } catch (err) {
            alert(err)
        }
    }

    return (
        <Container className={classes.root} component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate onSubmit={loginSubmit} >
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email} onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password} onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Grid container>

                        <Grid item>
                            <Link href="register#/register" variant="body2" className={classes.link}>
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}





// <div className="login-page">
//     <form onSubmit={loginSubmit}>
//         <h2>Login</h2>
//         <input type="email" name="email" required
//             placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

//         <input type="password" name="password" required autoComplete="on"
//             placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

//         <div className="row">
//             <button type="submit">Login</button>
//             <Link to="/register">Register</Link>
//         </div>
//     </form>
// </div>
//     )
// }


export default Login