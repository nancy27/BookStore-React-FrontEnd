import React, { Component } from 'react'
import AppNav from './AppNav'
import axios from 'axios'

import {Table,Form,Input,Container,InputGroup,InputGroupAddon, Button } from 'reactstrap'
class UserList extends Component {

    constructor(props) {
        super(props)
    
         this.state = {
             users:[],
             currentPage:1,
             usersPerPage:5
             
        }
    }

    componentDidMount(){
        axios.get('https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb?fmt=raw&sole')
             .then(response=> response.data).then(data => {
                 this.setState({users : data})
                 console.log(this.state.users)
             })
    }

    handleChange =(event)=>{
        this.setState({
            [event.target.name]:parseInt(event.target.value)
        })

    }

    firstPage = ()=>{
        if(this.state.currentPage> 1 ){
            this.setState({
                currentPage:1
            })
        }
    }

    prevPage =() =>{
        if(this.state.currentPage> 1)
        this.setState({
            currentPage : this.state.currentPage -1
        })
    }
    
    nextPage =()=>{
        if(this.state.currentPage < Math.ceil(this.state.users.length/this.state.usersPerPage)){
            this.setState({
                currentPage:this.state.currentPage +1
            })
        }
    }
    
    lastPage =()=>{
        if(this.state.currentPage < Math.ceil(this.state.users.length/this.state.usersPerPage)){
            this.setState({
                currentPage:Math.ceil(this.state.users.length/this.state.usersPerPage)
            })
        }
    }
    
    render() {
        const{users,currentPage,usersPerPage}=this.state
        const lastUserIndex= currentPage * usersPerPage
        const firstUserIndex=lastUserIndex-usersPerPage
        const currentUser= users.slice(firstUserIndex,lastUserIndex)
        const totalPages= Math.ceil(users.length / usersPerPage)

        let value=currentUser.map(user =>(
            <tr key={user.name}>
                <td>{user.first} {' '} {user.last}</td>
                <td>{user.email} </td>
                <td>{user.address} </td>
                <td>{user.created} </td>
            </tr>
            )
        )

        const pageNumCss={
            width:"45px",
            border:"1px solid #17A2B8",
            color: "#17A2B8",
            textAlign:"center",
            fontWeight: "bold"
        }
           
        return (
            <div>
                <AppNav/>

                <h1>Users List</h1>
                <Container>
                <Table bordered color="dark">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>created</th>
                        </tr>
                    </thead>
                    <tbody>
                        {value}
                    </tbody>
                </Table>
                   <div style={{"float":"left"}}>Showing Page {currentPage} of {totalPages}</div>
                   <div style={{"float":"right"}}>
                     <InputGroup className="bg-dark">
                     <InputGroupAddon addonType="prepend">

                       <Button disabled={currentPage ===1 ?'true' : false} 
                       onClick={this.firstPage}>first</Button>
                       <Button disabled={currentPage ===1 ?'true' : false}
                       onClick={this.prevPage}>previous</Button>
                       
                       </InputGroupAddon>
                       
                       <Input style={pageNumCss} className="bg-dark" value={currentPage} 
                       onChange={this.handleChange}/>
                       
                       <InputGroupAddon addonType="append">
                       <Button disabled={currentPage === totalPages ?'true' : false} onClick={this.nextPage}>next</Button>
                       <Button disabled={currentPage === totalPages ?'true' : false}
                       onClick={this.lastPage}>last</Button>

                       </InputGroupAddon>
                       </InputGroup>

                     
             </div>
                </Container>
                     
            </div>
        )
    }
}

export default UserList
