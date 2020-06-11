import React, { Component } from 'react'
import axios from 'axios';
import AppNav from './AppNav'
import { Link, withRouter } from 'react-router-dom';
import DatePicker from "react-datepicker";
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';


 class EditBook extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             Book:{
                "bookId":'',
                "title": '',
                "author": '',
                "pages": '',
                "description": '',
                "price": ''     
               }
        }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this)
    }

    componentDidMount() {
        axios.get(`/bookstore/book/${this.props.match.params.id}`)
        .then(response => response.data)
    .then((data) => {
      this.setState({ Book: data })
      console.log(this.state.Book)
     })
  }

  handleChange(event){
    const target= event.target;
    const name=target.name;
    const value=target.value;
    let Book={...this.state.Book}
    Book[name] = value
    this.setState({
        Book
    })
}

async handleSubmit (event){
    event.preventDefault();
    const {Book} = this.state
    await fetch('/bookstore/book/addbook' + (Book.bookId ? '/' + Book.bookId : ''),{
      method: (Book.bookId) ? 'PUT' : 'POST',
    headers:{
        'Accept':'application/json',
        'Content-Type': 'application/json'
    },
    body:JSON.stringify(Book),
    })
    this.props.history.push('/order');
  }

  /*
        if (this.props.match.params.id !== 'new') {
           console.log(this.state.item.price)
           fetch()
           .then(response => response.json())
           .then(data=> this.setState({
            Book:{
                "title": data.title,
                 "author": data.author,
             }
            }))
        }

               <h2>{this.state.Book.title}</h2>
    }*/    
    
    render() {
        
        return (
            <div>
                 <AppNav />
                <h2>Adding Book</h2>              
               
                <Container>     
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                         <Label for="title" >Title</Label>
                          <Input type="text" name="title" id="title" 
                          value={this.state.Book.title || ''}
                          autoComplete="title"
                          onChange={this.handleChange}></Input>
                    </FormGroup>
                    <FormGroup>
                          <Label for="author" >Author</Label>
                          <Input type="text" name="author" id="author"
                          value={this.state.Book.author}
                          autoComplete="author"
                           onChange={this.handleChange}></Input>
                      </FormGroup>
                      <FormGroup>
                          <Label for="pages" >Pages</Label>
                          <Input type="text" name="pages" id="pages" 
                          value={this.state.Book.pages}
                          autoComplete="pages"
                           onChange={this.handleChange}></Input>
                      </FormGroup>
                      <FormGroup>
                          <Label for="description" >Description</Label>
                          <Input type="textarea" name="description" id="description"
                          value={this.state.Book.description}
                          autoComplete="description"
                           onChange={this.handleChange}/>
                      </FormGroup>
                      
                      <FormGroup>
                          <Label for="price" >Price</Label>
                          <Input type="text" name="price" id="price" 
                          value={this.state.Book.price}
                          autoComplete="price"
                           onChange={this.handleChange}></Input>
                      </FormGroup>
                      <FormGroup>
                          <Button color="primary" type="submit"> Add </Button>{' '}
                          <Button color="primary" tag={Link} to="/order">cancel</Button>
                      </FormGroup>
             
                </Form>
                </Container>
        
            </div>
        )
    }
}

export default withRouter(EditBook);
