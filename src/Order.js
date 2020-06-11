import React, { Component } from 'react'
import AppNav from './AppNav'
import { Container, FormGroup, Table } from 'reactstrap'
import {Form,Button, input, label} from 'reactstrap'
import {Link} from 'react-router-dom'
import Moment from 'react-moment';
import BookEdit from './BookEdit'

class Order extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading:true,
            
            Books:[]
        }
        }    
      
      async componentDidMount(){
          const response=await fetch('/bookstore/book/getAllBooks')
          const body=await response.json()
          this.setState({
              isLoading:false,
              Books :body
          })
      }
     
      
      async remove(id){
          await fetch(`/bookstore/book/deleteBook/${id}`,{
              method:'DELETE',
              headers:{
              'Accept':'application/json',
              'Content-Type':'application/json'}
              ,
          }).then(()=>{
              let updatedBooks=[...this.state.Books].filter(i => i.id !== id)
              this.setState({
                  Books:updatedBooks              })
          })
      }
    render() {
        const{Books,isLoading}=this.state
        if(isLoading)
        return <div>isLoading</div>

        
        let rows=Books.map(book  =>
            
            <tr key={book.bookId}> 
                <td> {book.title} </td>
                <td> {book.author}</td>
                <td> {book.pages} </td>
                <td> {book.description} </td>
                <td><Moment date={book.published} format="YYYY/MM/DD"/> </td>
                <td> {book.price} </td>
                <td> <Button color="danger" size="sm" onClick={()=>this.remove(book.bookId)}>
                     Delete</Button>{' '}
                     <Button color="secondary" size="sm" tag={Link} to={"/books/" + book.bookId}>Edit</Button> </td> 
            </tr>
        )

        return (

            <div>
                <AppNav className="m-2"/>
                
                <Container >
                <div className="float-right" >
                    <Button className="m-3"color="success" 
                    tag={Link} to="/books/new">Add Book</Button>
                </div>
                
        
                <h2 className="p-2 m-2">Book List</h2>
                    <Table className="mt-6 m-2" >
                        
                        <thead>
                            <tr>
                              <th >Title</th>
                              <th >Author</th>
                              <th >Pages</th>
                              <th width="30%" >Description</th>
                              <th >Published Date</th>
                              <th >Price</th>
                              <th width="15%">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                                {rows}
                            
                        </tbody>

                    </Table>
                </Container>
                
            </div>
        )
    }
}

export default Order
