import React from 'react';
import './App.css';
import InputField from './InputField.js';
import Button from './Button.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.imageUploader = this.imageUploader.bind(this);
    this.chooseGender = this.chooseGender.bind(this);
    this.inputTextFields = this.inputTextFields.bind(this);
    this.inputAddress = this.inputAddress.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.clearForm = this.clearForm.bind(this);
    this.logout = this.logout.bind(this);
    this.state = {
      name: "",
      age: "",
      email: "",
      phone: "",
      gender: "",
      address: "",
      avatar: null,
      isLoggedin: false
    };
  }

  inputTextFields(childCategory, childData) {
    var category = childCategory;
    this.setState(
      { [category]: childData }
    );
  }

  inputAddress(e) {
    this.setState(
      { address: e.target.value }
    );
  }

  chooseGender(e) {
    this.setState(
      { gender: e.target.value }
    );
  }

  imageUploader(e) {
    this.setState(
      { avatar: URL.createObjectURL(e.target.files[0]) }
    );
  }

  clearForm() {
    this.setState(
      {
        name: "",
        age: "",
        email: "",
        phone: "",
        gender: "",
        address: "",
        avatar: null
      }
    );
  }

  submitForm() {
    this.setState(
      { isLoggedin: true }
    );
  }

  logout() {
    this.clearForm();
    this.setState(
      { isLoggedin: false }
    );
  }

  render() {
    if (this.state.isLoggedin == false) {
      return (
        <div className="App">
          <InputField type="name" data={this.state.name} inputData={this.inputTextFields}></InputField>
          <InputField type="age"  data={this.state.age} inputData={this.inputTextFields}></InputField>
          <InputField type="email" data={this.state.email} inputData={this.inputTextFields}></InputField>
          <InputField type="phone" data={this.state.phone} inputData={this.inputTextFields}></InputField>
          <div>
            <p>Enter your gender</p>
            <label><input type="radio" name="gender" value="male" onClick={this.chooseGender} />Male</label>
            <label><input type="radio" name="gender" value="female" onClick={this.chooseGender} />Female</label>
          </div>
          <div>
            <p>Enter your address</p>
            <textarea style={{ "resize": "none" }} rows="6" column="30" value = {this.state.address} onChange={this.inputAddress}></textarea>
          </div>
          <div>
            <p>Enter your avatar</p>
            <input type="file" accept="image/*" onChange={this.imageUploader} />
          </div>
          <div>
            <Button type="submit" property={this.submitForm} />
            <Button type="clear" property={this.clearForm} />
          </div>
        </div>
      );
    } else {
      return (
        <div className="App">
          <h1>Your Profile</h1>
          <p>Name:{this.state.name}</p>
          <p>Age:{this.state.age}</p>
          <p>Email:{this.state.email}</p>
          <p>Phone:{this.state.phone}</p>
          <p>Gender:{this.state.gender}</p>
          <p>Address:{this.state.address}</p>
          <span>Avatar:</span><img src={this.state.avatar}></img>
          <Button type="logout" property={this.logout} />
        </div>
      );
    }
  }
}

export default App;
