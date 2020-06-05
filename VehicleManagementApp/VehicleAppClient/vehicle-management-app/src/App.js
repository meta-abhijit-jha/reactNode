import React from 'react'
import Nav from './component/Nav'
import Home from './pages/Home'
import VehicleData from './pages/VehicleData'
import VehicleMaker from './pages/VehicleMaker'
import VehicleModel from './pages/VehicleModel'
import Feedback from './pages/Feedback'
import Footer from './container/Footer'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <Router>
    <div className="App">
      <Nav navbarType="Homepage"></Nav>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/vehicleData' exact component={VehicleData} />
        <Route path='/vehicleModel' exact component={VehicleModel} />
        <Route path='/vehicleMaker' exact component={VehicleMaker} />
        <Route path='/feedback' component={Feedback} />
      </Switch>
    </div>
    <Footer></Footer>
    </Router>
  )
}

export default App;
