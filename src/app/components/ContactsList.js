import React, {Component} from 'react';

class ContactsList extends Component{
  constructor(props){
    super(props);
    this.drawTable= this.drawTable.bind(this);
  }

  editContact(id){
    fetch(`/api/contact/${id}`,{
      method: 'GET',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      }
    })
        .then(res=> res.json())
        .then(data =>{
          this.props.editStates(data)})

  }
  deleteContact(id){
    if(confirm('Are you sure you want to delete the contact?')){
      fetch(`/api/contact/${id}`,{
        method:'DELETE',
        headers:{
          'Accept':'application/json',
          'Content-Type':'application/json'
        }
      })
      M.toast({'html':'Contact Deleted'})
      this.props.fetchContacts();
    }

  }
  drawTable(contacts){
    return(<table>
      <thead>
        <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Contact Number</th>
            <th>Age</th>
        </tr>
      </thead>
      <tbody>
            {
              contacts.map( (contact) => {
                  return(
                    <tr key = {contact._id}>
                        <td>{contact.name}</td>
                        <td>{contact.lastName}</td>
                        <td>{contact.email}</td>
                        <td>{contact.contactNumber}</td>
                        <td>{contact.age }</td>
                        <td>
                          <button onClick={()=> this.editContact(contact._id)} className="btn light-blue darken-4"
                            style={{margin: '4px'}} >
                            <i className="material-icons"> edit</i>
                          </button>
                          <button className="btn light-blue darken-4" onClick={()=>this.deleteContact(contact._id)}>
                            <i className="material-icons"> delete</i>
                          </button>
                        </td>
                    </tr>

                  )
              })
            }
      </tbody>
    </table>)
  }
    render(){

      const {contacts}= this.props;
      return(
        <div className="col s8">
              {this.drawTable(contacts)}
        </div>
      )
    }

}

export default ContactsList;
