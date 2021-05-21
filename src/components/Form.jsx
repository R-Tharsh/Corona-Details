import React, { Component } from "react";
import ReactDOM from "react-dom";
import firebase from "../Firebase";
import { Link } from "react-router-dom";

class Form extends Component {
  constructor() {
    super();
    this.ref = firebase.firestore().collection("boards");
    this.state = {
      country: "",
      email: "",
      newCases: "",
      totalCases: "",
      totalDeath: "",
    };
  }
  onChange = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { country, email, newCases, totalCases, totalDeath } = this.state;

    this.ref
      .add({
        country,
        email,
        newCases,
        totalCases,
        totalDeath,
      })
      .then((docRef) => {
        this.setState({
          country: "",
          email: "",
          newCases: "",
          totalCases: "",
          totalDeath: "",
        });
        this.props.history.push("/");
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };

  render() {
    const { country, email, newCases, totalCases, totalDeath } = this.state;
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">Add Details</h3>
          </div>
          <div class="panel-body">
            <h4>
              <Link to="/" class="btn btn-danger">
                Country Details
              </Link>
            </h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="country">Country:</label>
                <input
                  type="text"
                  class="form-control"
                  name="country"
                  value={country}
                  onChange={this.onChange}
                  placeholder="Country"
                />
              </div>
              <div class="form-group">
                <label for="email">Email:</label>
                <input
                  type="text"
                  class="form-control"
                  name="email"
                  value={email}
                  onChange={this.onChange}
                  placeholder="Email"
                />
              </div>
              <div class="form-group">
                <label for="newCases">New Cases:</label>
                <input
                  type="text"
                  class="form-control"
                  name="newCases"
                  value={newCases}
                  onChange={this.onChange}
                  placeholder="New Cases"
                />
              </div>
              <div class="form-group">
                <label for="totalCases">Total Cases:</label>
                <input
                  type="text"
                  class="form-control"
                  name="totalCases"
                  value={totalCases}
                  onChange={this.onChange}
                  placeholder="Total Cases"
                />
              </div>
              <div class="form-group">
                <label for="totalDeath">Total Death:</label>
                <input
                  type="text"
                  class="form-control"
                  name="totalDeath"
                  value={totalDeath}
                  onChange={this.onChange}
                  placeholder="Total Death"
                />
              </div>
              <br />

              <div>
                <button type="submit" class="btn btn-success">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Form;
