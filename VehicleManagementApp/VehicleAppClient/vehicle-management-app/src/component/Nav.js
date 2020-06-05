import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav, NavItem } from 'react-bootstrap'

class Navigation extends React.Component {
  constructor(props) {
    super(props)
    this.setNavbar = this.setNavbar.bind(this)
  }

  setNavbar() {
    return (
      <div className="navigationPanel">
        <Navbar inverse collapseOnSelect fixedTop>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">
                <span>Home</span>
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>

          <Navbar.Collapse>
            <Nav>
              <NavItem>
                <Link to="/vehicleData"><span>Vehicle Data</span></Link>
              </NavItem>
              <NavItem>
                <Link to="/vehicleModel"><span>Vehicle Model</span></Link>
              </NavItem>
              <NavItem>
                <Link to="/vehicleMaker"><span>Vehicle Maker</span></Link>
              </NavItem>
              <NavItem>
                <Link to="/feedback"><span>Feedback</span></Link>
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>

    )
  }

  render() {
    return (
      this.setNavbar()
    )
  }
}

export default Navigation