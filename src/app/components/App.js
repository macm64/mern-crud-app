import React, {Component} from 'react';
import ContactsList from './ContactsList';
class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      _id:'',
      name:'',
      lastName:'',
      email:'',
      contactNumber:'',
      age:'',
      contacts:[]
    };
      this.addContact= this.addContact.bind(this);
      this.handleChange= this.handleChange.bind(this);
      this.fetchContacts = this.fetchContacts.bind(this);
      this.editStates = this.editStates.bind(this);
  }
  editStates(data){
    this.setState({
      _id:data._id,
      name:data.name,
      lastName:data.lastName,
      email:data.email,
      contactNumber:data.contactNumber,
      age:data.age
    })
  }

  addContact(e){
    if(this.state._id){
      fetch(`/api/contact/${this.state._id}`,{
        method: 'PUT',
        body: JSON.stringify(this.state),
        headers:  {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
          .then(res => res.json())
          .then(data => {
            console.log(data)
            M.toast({html:"Contact Updated"});
            this.setState({
              _id:'',
              name:'',
              lastName:'',
              email:'',
              contactNumber:'',
              age:'',
              contacts:[]
            })
            this.fetchContacts();
          })
          .catch(err => console.error(err));
    }else{
      fetch('/api/contact/', {
          method: 'POST',
          body: JSON.stringify(this.state),
          headers:  {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
      })
          .then(res => res.json())
          .then(data => {
            console.log(data)
            M.toast({html:"Contact Saved"});
            this.setState({
              _id:'',
              name:'',
              lastName:'',
              email:'',
              contactNumber:'',
              age:'',
              contacts:[]
            })
            this.fetchContacts();
          })
          .catch(err => console.error(err));
    }

      e.preventDefault();
  }
  componentDidMount(){
    this.fetchContacts()
  }
  fetchContacts(){
    fetch('/api/contact/')
          .then(res => res.json())
          .then(data =>{
            this.setState({contacts: data});
            console.log(this.state.contacts);
          });
  }
  handleChange(e){
    const {name, value} = e.target;
    this.setState({
      [name]:value
    });
  }
  render(){
    return(
      <div>
          {/*NAVIGATION*/}
          <nav  className="light-blue darken-4">
              <div className="container">
                  <a className="brand-logo" href="/">MERN Stack CRUD Simple Contact Form</a>
              </div>
          </nav>
          <div className="container">
              <div className="row">
                  <div className="col s4">
                      <div className="card">
                          <div className="card-content">
                              <form onSubmit={this.addContact}>
                                <div className="row">
                                    <div className="input-field col s12">
                                      <input name="name" type="text" onChange={this.handleChange} value={this.state.name} placeholder="First Name"/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s12">
                                      <input name="lastName" type="text" onChange={this.handleChange} value={this.state.lastName} placeholder="Last Name"/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s12">
                                      <input name="email" type="text" onChange={this.handleChange} value={this.state.email} placeholder="Email"/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s12">
                                      <input name="contactNumber" type="text" onChange={this.handleChange} value={this.state.contactNumber} placeholder="Contact Number"/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s12">
                                      <input name="age" type="text" onChange={this.handleChange} value={this.state.age} placeholder="Age"/>
                                    </div>
                                </div>
                                <button  type="submit" className="btn light-blue darken-4">
                                  {(this.state._id)?'Update':'Send'}
                                </button>
                              </form>
                          </div>
                      </div>
                  </div>
                  <ContactsList contacts= {this.state.contacts} fetchContacts={this.fetchContacts} editStates={this.editStates}/>
              </div>

          </div>
      </div>
    )
  }
}

export default App;
