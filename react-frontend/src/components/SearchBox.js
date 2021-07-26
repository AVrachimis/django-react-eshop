import React from 'react'
import { useState } from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'


function SearchBox() {

    const [keyword, setKeyword] = useState('')

    let history = useHistory()

    const submitHandler = (e) => {
        e.preventDefault()
        if (keyword) {
            history.push(`/?keyword=${keyword}&page=1`)
        } else {
            history.push(history.push(history.location.path))
        }


    }
    return (

        <Form onSubmit={submitHandler} inline>

            <Row className='g-2'>

                <Col md={8}>
                    <Form.Control
                        type='text'
                        name='q'
                        onChange={(e) => setKeyword(e.target.value)}
                        className='mr-sm-2 ml-sm-5'
                    >
                    </Form.Control>

                </Col>

                <Col md>

                    <Button
                        type='submit'
                        variant='outline-success'
                        className='p-2'
                    >
                        <i className=' fas fa-search'></i>
                    </Button>
                </Col>
            </Row >


        </Form>

    )
}

export default SearchBox
