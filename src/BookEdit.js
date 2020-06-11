import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AppNav from './AppNav'

class BookEdit extends Component {
  
constructor(props) {
    super(props)

    this.state = {
        item: {
          "bookId":'',
          "title": '',
          "author": '',
          "pages": '',
          "description": '',
          "published": '',
          "price": ''     
        }
        
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this)
}

componentDidMount() {
    if (this.props.match.params.id !== 'new') {
       console.log(this.state.item.price)
       fetch(`/bookstore/book/${this.props.match.params.id}`)
       .then(response => response.json())
       .then(data=> this.setState({ item:data}))
       
       /*const body = response.json();
       this.setState({ 
           item:body
       })
       */
   }
}
  handleChange(event){
    const target= event.target;
    const name=target.name;
    const value=target.value;
    let item={...this.state.item}
    item[name] = value
    this.setState({
        item
    })
}


handleDateChange(date){
    let item={...this.state.item}
    item.published=date
    this.setState({
        item
    })
  }

  async handleSubmit (event){
      event.preventDefault();
      const {item} = this.state
      await fetch('/bookstore/book/addbook' + (item.bookId ? '/' + item.bookId : ''),{
        method: (item.bookId) ? 'PUT' : 'POST',
      headers:{
          'Accept':'application/json',
          'Content-Type': 'application/json'
      },
      body:JSON.stringify(item),
      })
      this.props.history.push('/order');
    }
  
            /*
            const body=await response.json()
        const group = await (await fetch(`/bookstore/book/${this.props.match.params.id}`)).json();*/
      
    

    render() {
        const{item}=this.state
        const title= <h2>{item.bookId ? 'Edit Group' : 'Add Group'}</h2>
        const example=this.props.match.params.id

        return (
            <div>
                <AppNav />
                <h2>Adding Book</h2>              
               <div><h3> {this.props.match.params.id} " " </h3> {item.title}</div>
                <Container>
                    {title}
                  <Form onSubmit={this.handleSubmit}>
                      <FormGroup>
                          <Label for="title" >Title</Label>
                          <Input type="text" name="title" id="title" 
                          value={item.title || ''}
                          autoComplete="title"
                          onChange={this.handleChange}></Input>
                      </FormGroup>
                      <FormGroup>
                          <Label for="author" >Author</Label>
                          <Input type="text" name="author" id="author"
                          value={item.author}
                          autoComplete="author"
                           onChange={this.handleChange}></Input>
                      </FormGroup>
                      <FormGroup>
                          <Label for="pages" >Pages</Label>
                          <Input type="text" name="pages" id="pages" 
                          value={item.pages}
                          autoComplete="pages"
                           onChange={this.handleChange}></Input>
                      </FormGroup>
                      <FormGroup>
                          <Label for="description" >Description</Label>
                          <Input type="textarea" name="description" id="description"
                          value={item.description}
                          autoComplete="description"
                           onChange={this.handleChange}/>
                      </FormGroup>
                      <FormGroup>
                          <Label for="date" >Date</Label>
                          <DatePicker selected={this.state.item.published}
                          value={item.published}
                          autoComplete="published"
                          onChange={this.handleDateChange}/>
                      </FormGroup>
                      <FormGroup>
                          <Label for="price" >Price</Label>
                          <Input type="text" name="price" id="price" 
                          value={item.price}
                          autoComplete="price"
                           onChange={this.handleChange}></Input>
                      </FormGroup>
                      <FormGroup>
                          <Button color="primary" type="submit"> Add </Button>{' '}
                          <Button color="primary" tag={Link} to="/order">cancel</Button>
                      </FormGroup>
             
                  </Form>
                </Container>

                {' '}
                
            </div>
        )
    }
}

export default withRouter(BookEdit);
