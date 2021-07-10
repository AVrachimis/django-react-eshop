import React from 'react'
import { useState, useEffect } from 'react'
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'

function PlaceOrderScreen() {
    const cart = useSelector(state => state.cart)
    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4 />
        </div>
    )
}

export default PlaceOrderScreen
