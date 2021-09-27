import React, { Component } from "react";
import axios from 'axios';

export default class Create extends Component {
    constructor(props){
        super(props);
        this.onChangePaintImg= this.onChangePaintImg.bind(this);
        this.onChangePaintAuthor= this.onChangePaintAuthor.bind(this);
        this.onChangePaintPrice= this.onChangePaintPrice.bind(this);
        this.onChangePaintContact= this.onChangePaintContact.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            paint_img: "",
            paint_author: "",
            paint_price: "",
            paint_contact: "",
        };
    }

    // Update the state properties

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

    // handle the submit
    onSubmit(e) {
        e.preventDefault();
        
        const newpaint = {
            paint_img: this.state.paint_img,
            paint_author: this.state.paint_author,
            paint_price: this.state.paint_price,
            paint_contact: this.state.paint_contact,
        };

        axios
            .post("http://localhost:5000/record/add", newpaint)
            .then((res) => console.log(res.data));
        
        // empty the state after posting data to db
        this.setState({
            paint_img: "",
            paint_author: "",
            paint_price: "",
            paint_contact: "",
        });
    }

    //Display the form that takes the input from the user

    render() {
        return (
          <div className="container">
          <div style={{ marginTop: 20 }}>
            <h3 className="my-5">Submit a new painting into the gallery</h3>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label>Link to the painting:</label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.paint_img}
                  onChange={this.onChangePaintImg}
                />
              </div>
              <div className="form-group">
                <label>Painter:</label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.paint_author}
                  onChange={this.onChangePaintAuthor}
                />
              </div>
              <div className="form-group">
                <label>Price:</label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.paint_price}
                  onChange={this.onChangePaintPrice}
                />
              </div>
             
              <div className="form-group">
                <label>Contact Details:</label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.paint_contact}
                  onChange={this.onChangePaintContact}
                />
              </div>
              <div className="form-group my-5">
                <input
                  type="submit"
                  value="Add painting"
                  className="btn btn-primary"
                />
              </div>
            </form>
          </div>
          </div>
        );
      }
    }