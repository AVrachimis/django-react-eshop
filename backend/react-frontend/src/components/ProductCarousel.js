import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Carousel, Image, Row, Col } from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import { listTopProducts } from '../actions/productActions'


function ProductCarousel() {

    const dispatch = useDispatch()

    const productTopRated = useSelector(state => state.productTopRated)
    const { error, loading, products } = productTopRated

    useEffect(() => {
        dispatch(listTopProducts())
    }, [dispatch])

    return (
        loading ? <Loader />
            : error ? <Message variant='danger'>{error}</Message>
                : (
                    <Row>
                        <Col
                            xs={5}
                            className='mx-auto'
                        >
                            <Carousel pause='hover'>
                                {products.map(product => (
                                    <Carousel.Item key={product._id}>
                                        <Link to={`/product/${product._id}`}>
                                            <Image src={product.image} alt={product.name} fluid className='center' />
                                            <Carousel.Caption className='carousel.caption'>
                                                <h4>{product.name} (${product.price})</h4>
                                            </Carousel.Caption>
                                        </Link>
                                    </Carousel.Item>
                                ))}
                            </Carousel>

                        </Col>
                    </Row >
                )

    )
}

export default ProductCarousel
