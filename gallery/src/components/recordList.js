import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Masonry from "react-responsive-masonry";

const Record = (props) => (
 
    <div>
      <img src={props.record.paint_img} alt="gal" className="img-grid"/>
      <h2>{props.record.paint_author}</h2>
      <p>
        {props.record.paint_price}<br />
        {props.record.paint_contact}
      </p>
      <p> 
      <Link to={"/edit/" + props.record._id}>Edit</Link> |
        <a href="/" onClick={() => {props.deleteRecord(props.record._id); }}> Delete </a>
      </p>
        <Button variant="primary">Go somewhere</Button>
    </div>
);

export default class RecordList extends Component {
  // This is the constructor that shall store our data retrieved from the database
  constructor(props) {
    super(props);
    this.deleteRecord = this.deleteRecord.bind(this);
    this.state = { records: [] };
  }

  // This method will get the data from the database.
  componentDidMount() {
    axios
      .get("http://localhost:5000/record/")
      .then((response) => {
        this.setState({ records: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // This method will delete a record based on the method
  deleteRecord(id) {
    axios.delete("http://localhost:5000/" + id).then((response) => {
      console.log(response.data);
    });

    this.setState({
      record: this.state.records.filter((el) => el._id !== id),
    });
  }

  // This method will map out the users on the table
  recordList() {
    return this.state.records.map((currentrecord) => {
      return (
        <Record
          record={currentrecord}
          deleteRecord={this.deleteRecord}
          key={currentrecord._id}
        />
      );
    });
  }

  // This following section will display the table with the records of individuals.
  render() {
    return (
      <div className="container">
        <h3 className="my-5">Record List</h3>
        <Masonry>
          {this.recordList()}
        </Masonry>
      </div>
    );
  }
}