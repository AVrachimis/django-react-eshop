import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'

import { login } from '../actions/userActions'


function LoginScreen() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div>
            Login Screen
        </div>
    )
}

export default LoginScreen
