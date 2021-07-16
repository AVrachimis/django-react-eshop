import React from 'react'
import { useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'

import { listUsers } from '../actions/userActions'


function UserListScreen() {

    const dispatch = useDispatch()

    const userList = useSelector(state => state.userList)
    const { loading, error, users } = userList

    useEffect(() => {
        dispatch(listUsers())
    }, [dispatch])

    return (
        <div>
            <h1>Users</h1>

            {loading ?
                <Loader />
                : error ?
                    <Message variant='danger'>{error}</Message>
                    : (
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Admin</th>
                                <th></th>
                            </thead>

                            <tbody>
                                {users.map(user => (
                                    <tr key={user._id}>
                                        <td>{user._id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.isAdmin ? (
                                            <i className='fas fa-check' style={{ color: 'green' }}></i>
                                        ) : (
                                            <i className='fas fa-check' style={{ color: 'red' }}></i>
                                        )
                                        }</td>
                                        <td>{user._id}</td>

                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )
            }

        </div>
    )
}

export default UserListScreen
