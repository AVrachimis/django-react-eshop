import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import { listTopProducts } from '../actions/productActions'


function ProductCarousel() {

    const dispatch = useDispatch()

    const productTop = useSelector(State => state.productTop)
    return (
        <div>

        </div>
    )
}

export default ProductCarousel
