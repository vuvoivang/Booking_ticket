import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Alert from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLogin, resetAuth } from './modules/action';
import { NavLink } from 'react-router-dom';
import { LinearProgress } from '@material-ui/core';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://cybersoft.edu.vn/">
                CyberSoft
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        background: '#82ada9',
        '&:hover': {
            background: '#fff',
            color: "#82ada9",
        }
    },
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function Login(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const logo = process.env.PUBLIC_URL + "images/logo.png";
    const loading = useSelector(state => state.authReducer.loading);
    const err = useSelector(state => state.authReducer.err);
    const [render, setRender] = useState(false);
    const [isDisable, setIsDisable] = useState(true);
    const [emptyUsernameNotice, setEmptyUsernameNotice] = useState(false);
    const [emptyPasswordNotice, setEmptyPasswordNotice] = useState(false);
    const [state, setState] = useState({
        taiKhoan: "",
        matKhau: ""
    });
    useEffect(() => {
        setTimeout(handleReset, 2000);
        setState({
            taiKhoan: "",
            matKhau: ""
        });
    }, [render])
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setState({
            ...state,
            [name]: value,
        })
        if (state.taiKhoan !== "") {
            setEmptyUsernameNotice(false);
        }
        if (state.matKhau !== "") {
            setEmptyPasswordNotice(false);
        }
        if (state.taiKhoan !== "" && state.matKhau !== "") {
            setIsDisable(false);
        }
    }
    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(fetchLogin(state, props.history));
        setRender(!render)
    }
    const handleValidation = () => {
        if (state.taiKhoan === "") {
            setEmptyUsernameNotice(true)
        }
        if (state.matKhau === "") {
            setEmptyPasswordNotice(true)
        }
    }
    const handleReset = () => {
        dispatch(resetAuth());
    }
    const renderNotice = () => {
        if (err) return <Alert severity="error">{err.response.data}</Alert>
        if (emptyUsernameNotice) return <Alert severity="error">Tài khoản không được để trống</Alert>
        if (emptyPasswordNotice) return <Alert severity="error">Mật khẩu không được để trống</Alert>
    }
    if (loading) return (
        <div className={classes.root}>
            <LinearProgress />
        </div>
    );
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <Avatar alt="Logo" src={logo} />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Đăng Nhập
        </Typography>
                {renderNotice()}
                <form onSubmit={handleLogin} className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Tài Khoản"
                        name="taiKhoan"
                        autoFocus
                        onChange={handleChange}
                        onBlur={handleValidation}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="matKhau"
                        label="Mật Khẩu"
                        type="password"
                        onChange={handleChange}
                        onBlur={handleValidation}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={isDisable}
                    >
                        Đăng Nhập
          </Button>
                </form>
                <Grid container>
                    <Grid item>
                        <NavLink to={`/signup`} variant="body2" style={{ color: "#82ada9" }}>
                            {"Bạn chưa có tài khoản? Đăng kí ngay"}
                        </NavLink>
                    </Grid>
                </Grid>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}