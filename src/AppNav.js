import React, { Component } from 'react'
import{Navbar,Nav,NavLink,NavItem,NavbarBrand} from 'reactstrap'

 class AppNav extends Component {
    render() {
        return (
            <div>
              <Navbar color="dark" dark expand="md">
                <NavbarBrand href="/">Online Book Store</NavbarBrand>
                  <Nav className="mr-auto" navbar>
                    <NavItem>
                      <NavLink href="/">Home</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="/books">Order</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="/order">Books</NavLink>
                    </NavItem>  
                    <NavItem>
                      <NavLink href="/listUser">Users</NavLink>
                    </NavItem>
                  </Nav>
                </Navbar>
            </div>
          );
        }
    }


export default AppNav
