import React, { useState, useEffect } from 'react'
import products from '../products'
import { Row, Col } from 'react-bootstrap'

import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import ProductCarousel from '../components/ProductCarousel'

import Paginate from '../components/Paginate'

import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'


function HomeScreen({ history }) {

    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const { error, loading, products, page, pages } = productList


    let keyword = history.location.search

    useEffect(() => {
        dispatch(listProducts(keyword))

    }, [dispatch, keyword])


    return (
        <div>

            {(!keyword || keyword.startsWith('?keyword=&page')) && (
                <div>
                    <h1>Top Rated Products</h1>
                    <ProductCarousel />
                </div>
            )
            }
            <h1>Latest Products</h1>

            {loading ? <Loader />
                : error ? <Message variant='danger'>{error}</Message>
                    :

                    <div>
                        <Row>
                            {!products.length == 0 ? (products.map(product => (
                                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                    <Product product={product} />
                                </Col>
                            )))
                                : (
                                    <Message variant='info'>No results found</Message>
                                )
                            }


                        </Row>

                        <Paginate page={page} pages={pages} keyword={keyword} />
                    </div>

            }
        </div>
    )
}

export default HomeScreen
