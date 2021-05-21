import React, { Component } from "react";
import firebase from "../Firebase";
import { Link } from "react-router-dom";

class EditDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: "",
      country: "",
      email: "",
      newCases: "",
      totalCases: "",
      totalDeath: "",
    };
  }

  componentDidMount() {
    const ref = firebase
      .firestore()
      .collection("boards")
      .doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const board = doc.data();
        this.setState({
          key: doc.id,
          country: board.country,
          email: board.email,
          newCases: board.newCases,
          totalCases: board.totalCases,
          totalDeath: board.totalDeath,
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  onChange = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState({ board: state });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { country, email, newCases, totalCases, totalDeath } = this.state;

    const updateRef = firebase
      .firestore()
      .collection("boards")
      .doc(this.state.key);
    updateRef
      .set({
        country,
        email,
        newCases,
        totalCases,
        totalDeath,
      })
      .then((docRef) => {
        this.setState({
          key: "",
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
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">Edit Details</h3>
          </div>
          <div class="panel-body">
            <h4>
              <Link to={`/`} class="btn btn-danger">
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
                  value={this.state.country}
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
                  value={this.state.email}
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
                  value={this.state.newCases}
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
                  value={this.state.totalCases}
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
                  value={this.state.totalDeath}
                  onChange={this.onChange}
                  placeholder="Total Death"
                />
              </div>
              <br />
              <button type="submit" class="btn btn-success">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default EditDetails;
