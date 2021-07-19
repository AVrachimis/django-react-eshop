import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'

import FormContainer from '../components/FormContainer'

import { listProductDetails } from '../actions/productActions'

function ProductEditScreen({ match, history }) {

    const productId = match.params.id

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [category, setCategory] = useState('')
    const [brand, setBrand] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')


    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { error, loading, product } = productDetails

    // const userUpdate = useSelector(state => state.userUpdate)
    // const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = userUpdate


    useEffect(() => {

        if (!product.name || product._id !== Number(productId)) {
            dispatch(listProductDetails(productId))
        } else {
            setName(product.name)
            setPrice(product.price)
            setImage(product.image)
            setDescription(product.description)
            setCategory(product.category)
            setBrand(product.brand)
            setCountInStock(product.countInStock)

        }


    }, [product, productId, history])

    const submitHandler = (e) => {
        e.preventDefault()
        // dispatch(updateProduct({ _id: user._id, name, email, isAdmin }))

    }

    return (
        <div>

            <Link to='/admin/productList'>
                Go Back
            </Link>

            <FormContainer>
                <h1>Edit Product Details</h1>
                {/* {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{error}</Message>} */}

                {loading ? <Loader /> :
                    error ? <Message variant='danger'> {error} </Message>
                        : (

                            <Form onSubmit={submitHandler}>

                                <Form.Group controlId='name'>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type='name'
                                        placeholder='Enter Name'
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    >

                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId='price'>
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control
                                        type='number'
                                        placeholder='Enter Price'
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    >
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId='image'>
                                    <Form.Label>Image</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Upload Image'
                                        value={image}
                                        onChange={(e) => setImage(e.target.value)}
                                    >
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId='Drand'>
                                    <Form.Label>Brand</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter Brand'
                                        value={brand}
                                        onChange={(e) => setBrand(e.target.value)}
                                    >
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId='countInStock'>
                                    <Form.Label>Stock</Form.Label>
                                    <Form.Control
                                        type='number'
                                        placeholder='Enter Stock'
                                        value={countInStock}
                                        onChange={(e) => setCountInStock(e.target.value)}
                                    >
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId='category'>
                                    <Form.Label>Category</Form.Label>
                                    <Form.Control

                                        type='text'
                                        placeholder='Enter category'
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                    >
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId='description'>
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control

                                        type='text'
                                        placeholder='Enter description'
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    >
                                    </Form.Control>
                                </Form.Group>









                                <Button type='submit' variant='primary'>
                                    Update
                                </Button>

                            </Form>


                        )}

            </FormContainer>

        </div>
    )
}

export default ProductEditScreen
