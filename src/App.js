import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import firebase from "./Firebase";
import { Bar } from "@ant-design/charts";

class App extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection("boards");
    this.unsubscribe = null;
    this.state = {
      boards: [],
      totalNewCases: 0,
      totalCases: 0,
      totaldeath: 0,
      casesData: [],
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const boards = [];
    let totalNewCasesInt = 0;
    let totalCasesInt = 0;
    let totaldeathInt = 0;
    querySnapshot.forEach((doc) => {
      const { country, email, newCases, totalCases, totalDeath } = doc.data();
      boards.push({
        key: doc.id,
        doc, // DocumentSnapshot
        country,
        email,
        newCases,
        totalCases,
        totalDeath,
      });
    });

    boards.map((post) => {
      if (
        post.newCases !== undefined ||
        post.totalCases !== undefined ||
        post.totalDeath !== undefined
      ) {
        totalNewCasesInt = parseInt(totalNewCasesInt) + parseInt(post.newCases);
        totalCasesInt = parseInt(totalCasesInt) + parseInt(post.totalCases);
        totaldeathInt = parseInt(totaldeathInt) + parseInt(post.totalDeath);
      }
    });

    const data = [
      {
        total: " Total New Cases",
        value: totalNewCasesInt,
        type: "cases",
      },
      {
        total: "Total Cases",
        value: totalCasesInt,
        type: "cases",
      },
      {
        total: "Total Deaths",
        value: totaldeathInt,
        type: "cases",
      },
    ];
    this.setState({
      boards,
      casesData: data,
    });
  };

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    const { casesData } = this.state;
    var config = {
      data: casesData,
      isStack: true,
      xField: "value",
      yField: "total",
      seriesField: "type",
      label: {
        position: "middle",
        layout: [
          { type: "interval-adjust-position" },
          { type: "interval-hide-overlap" },
          { type: "adjust-color" },
        ],
      },
    };
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h2 class="panel-title">Corona Details</h2>
          </div>
          <br />
          <div class="panel-body">
            <h4 style={{ textDecoration: "none" }}>
              <Link to="/Form">Add Details</Link>
            </h4>
            <table class="table table-stripe">
              <thead>
                <tr>
                  <th>Country</th>
                  <th>Email</th>
                  <th>New Cases</th>
                  <th>Total Cases</th>
                  <th>Total Death</th>
                </tr>
              </thead>
              <tbody>
                {this.state.boards.map((board) => (
                  <tr>
                    <td>
                      <Link to={`/dashboard/${board.key}`}>{board.email}</Link>
                    </td>
                    <td>{board.country}</td>
                    <td>{board.newCases}</td>
                    <td>{board.totalCases}</td>
                    <td>{board.totalDeath}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Bar {...config} />;
        </div>
      </div>
    );
  }
}

export default App;
