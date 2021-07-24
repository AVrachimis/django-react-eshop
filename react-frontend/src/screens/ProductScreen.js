import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ListGroup, Button, Image, Row, Col, Card, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'

import products from '../products'
import { listProductDetails, createProductReview } from '../actions/productActions'

import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'


function ProductScreen({ match, history }) {

    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')


    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const productReviewCreate = useSelector(state => state.productReviewCreate)
    const { loading: loadingReview, error: errorReview, success: successReview } = productReviewCreate

    useEffect(() => {

        if (successReview) {
            setRating(0)
            setComment('')
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })

        }

        dispatch(listProductDetails(match.params.id))

    }, [dispatch, match, successReview])

    const addToCardHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()
        dispatch(createProductReview(
            match.params.id, {
            rating,
            comment
        }

        ))

    }

    return (
        <div>
            <Link to='/' className='btn btn-light my-3'> Back to </Link>
            {loading ?
                <Loader />
                : error
                    ? <Message variant='danger'>{error}</Message>
                    : (


                        <div>

                            <Row>

                                <Col md={6}>
                                    <Image src={product.image} alt={product.name} fluid />
                                </Col>

                                <Col md={3}>
                                    <ListGroup variant='flush'>

                                        <ListGroup.Item>
                                            <h3>{product.name}</h3>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#ffd700'} />
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            Price: ${product.price}
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            Description: {product.description}
                                        </ListGroup.Item>

                                    </ListGroup>
                                </Col>

                                <Col md={3}>
                                    <Card>
                                        <ListGroup variant='flush'>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Price:</Col>
                                                    <Col><strong>${product.price}</strong></Col>
                                                </Row>
                                            </ListGroup.Item>

                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Status:</Col>
                                                    <Col>
                                                        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>

                                            {product.countInStock > 0 && (
                                                <ListGroup.Item>
                                                    <Row>
                                                        <Col>Qty</Col>
                                                        <Col xs='auto' className='my-1'>
                                                            <Form.Control
                                                                as="select"
                                                                value={qty}
                                                                onChange={(e) => setQty(e.target.value)}
                                                            >
                                                                {

                                                                    [...Array(product.countInStock).keys()].map((x) => (
                                                                        <option key={x + 1} value={x + 1}>
                                                                            {x + 1}
                                                                        </option>
                                                                    ))
                                                                }

                                                            </Form.Control>
                                                        </Col>

                                                    </Row>
                                                </ListGroup.Item>
                                            )}

                                            <ListGroup.Item>
                                                <Button
                                                    onClick={addToCardHandler}
                                                    className='btn-block'
                                                    disabled={product.countInStock === 0}
                                                    type='button'>
                                                    Add to Card
                                                </Button>

                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Card>
                                </Col>

                            </Row>



                            <Row>
                                <Col md={6} className='pt-5'>
                                    <h4>
                                        Reviews
                                    </h4>

                                    {product.reviews.length == 0 && <Message variant='info'>No Reviews</Message>}

                                    <ListGroup variant='flush'>
                                        {product.reviews.map((review) => (
                                            <ListGroup.Item key={review._id}>
                                                <Row>
                                                    <Col md={4}>
                                                        <strong>{review.name}</strong>
                                                        <p>{review.createdAt.substring(0, 16).replace("T", ", ")}</p>
                                                    </Col>

                                                    <Col>
                                                        <Rating value={review.rating} color={'#ffd700'} />

                                                    </Col>

                                                    <p>{review.comment}</p>

                                                </Row>
                                                <Col>

                                                </Col>
                                                {/* <strong>{review.name}</strong>
                                                <Rating value={review.rating} color={'#ffd700'} />
                                                <p>{review.createdAt.substring(0, 16).replace("T", ", ")}</p>
                                                <p>{review.comment}</p> */}
                                            </ListGroup.Item>
                                        ))}

                                        <ListGroup.Item>
                                            <h4>Write a Review</h4>

                                            {loadingReview && <Loader />}
                                            {successReview && <Message variant='success'>Review Submitted</Message>}

                                            {errorReview && <Message variant='danger'>{errorReview}</Message>}

                                            {userInfo ? (
                                                <Form onSubmit={onSubmitHandler}>
                                                    <Form.Group controlId='rating'>
                                                        <Form.Label>Rating</Form.Label>
                                                        <Form.Control
                                                            as='select'
                                                            value={rating}
                                                            onChange={(e) => setRating(e.target.value)}
                                                        >
                                                            <option value=''>Select..</option>
                                                            <option value='1'>1</option>
                                                            <option value='2'>2</option>
                                                            <option value='3'>3</option>
                                                            <option value='4'>4</option>
                                                            <option value='5'>5</option>

                                                        </Form.Control>

                                                    </Form.Group>

                                                    <Form.Group controlId='comment'>
                                                        <Form.Label>Review</Form.Label>
                                                        <Form.Control
                                                            as='textarea'
                                                            row='5'
                                                            value={comment}
                                                            onChange={(e) => setComment(e.target.value)}
                                                        >

                                                        </Form.Control>
                                                    </Form.Group>

                                                    <Button
                                                        className='mb-3'
                                                        disable={loadingReview}
                                                        type='submit'
                                                        variant='primary'
                                                    >
                                                        Submit
                                                    </Button>

                                                </Form>
                                            ) : (
                                                <Message variant='info'>Please <Link to='/login'>login</Link> to write a review</Message>
                                            )}
                                        </ListGroup.Item>

                                    </ListGroup>

                                </Col>
                            </Row>

                        </div>


                    )

            }
        </div>
    )
}

export default ProductScreen
