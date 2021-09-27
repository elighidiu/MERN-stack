import React,  {Component}  from "react";
// This will require to npm install axios
import axios from "axios";
import { withRouter } from "react-router";

class Edit extends Component {
  // This is the constructor that stores the data.
  constructor(props) {
    super(props);

    this.onChangePaintImg = this.onChangePaintImg.bind(this);
    this.onChangePaintAuthor = this.onChangePaintAuthor.bind(this);
    this.onChangePaintPrice = this.onChangePaintPrice.bind(this);
    this.onChangePaintContact = this.onChangePaintContact.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      paint_img: "",
      paint_author: "",
      paint_price: "",
      paint_contact: "",
      records: [],
    };
  }
  // This will get the record based on the id from the database.
  componentDidMount() {
    axios
      .get("http://localhost:5000/record/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          paint_img: response.data.paint_img,
          paint_author: response.data.paint_author,
          paint_price: response.data.paint_price,
          paint_contact: response.data.paint_contact,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // These methods will update the state properties.
  onChangePaintImg(e) {
    this.setState({
      paint_img: e.target.value,
    });
  }

  onChangePaintAuthor(e) {
    this.setState({
      paint_author: e.target.value,
    });
  }

  onChangePaintPrice(e) {
    this.setState({
      paint_price: e.target.value,
    });
  }
  onChangePaintContact(e) {
    this.setState({
      paint_contact: e.target.value,
    });
  }

  // This function will handle the submission.
  onSubmit(e) {
    e.preventDefault();
    const newEditedperson = {
      paint_img: this.state.paint_img,
      paint_author: this.state.paint_author,
      paint_price: this.state.paint_price,
      paint_contact: this.state.paint_contact,
    };
    console.log(newEditedperson);

    // This will send a post request to update the data in the database.
    axios
      .post(
        "http://localhost:5000/update/" + this.props.match.params.id,
        newEditedperson
      )
      .then((res) => console.log(res.data));

    this.props.history.push("/");
  }

  // This following section will display the update-form that takes the input from the user to update the data.
  render() {
    return (
      <div className="container">
        <h3 align="center">Update Record</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Paint Img: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.paint_img}
              onChange={this.onChangePaintImg}
            />
          </div>
          <div className="form-group">
            <label>Position: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.paint_author}
              onChange={this.onChangePaintAuthor}
            />
          </div>
          <div className="form-group">
            <label>Position: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.paint_price}
              onChange={this.onChangePaintPrice}
            />
          </div>
          <div className="form-group">
            <label>Position: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.paint_contact}
              onChange={this.onChangePaintContact}
            />
          </div>
       
          <br />

          <div className="form-group">
            <input
              type="submit"
              value="Update Record"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}

// You can get access to the history object's properties and the closest <Route>'s match via the withRouter
// higher-order component. This makes it easier for us to edit our records.

export default withRouter(Edit);