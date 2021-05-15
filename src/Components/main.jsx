import React, { Component } from "react";
import axios from "axios";
import { Table, Row, Col } from "antd";
import { Pie } from "@ant-design/charts";

export default class main extends Component {
  state = {
    countries: [],
    worldData: [],
    chartDatas: [],
  };

  componentDidMount() {
    this.getCoronaDetails();
  }

  getCoronaDetails = () => {
    axios
      .get(`https://coronavirus-19-api.herokuapp.com/countries`)
      .then((res) => {
        console.log(res);

        this.setState({
          countries: res.data,
          worldData: [res.data && res.data[0]],
          chartDatas: res.data && [
            {
              type: "Cases",
              value: res.data[0].cases,
            },
            {
              type: "Deaths",
              value: res.data[0].deaths,
            },
            {
              type: "Recovered",
              value: res.data[0].recovered,
            },
          ],
        });
      });
  };

  render() {
    const { countries, worldData, chartDatas } = this.state;

    var config = {
      appendPadding: 10,
      data: chartDatas,
      angleField: "value",
      colorField: "type",
      radius: 0.8,
      label: {
        type: "inner",
        labelHeight: 28,
        content: "{name}\n{percentage}",
      },
      interactions: [{ type: "element-selected" }, { type: "element-active" }],
    };
    const column = [
      {
        title: "Country",
        dataIndex: "country",
        key: "country",
      },
      {
        title: "Cases",
        dataIndex: "cases",
        key: "cases",
      },
      {
        title: "Today Cases",
        dataIndex: "todayCases",
        key: "todayCases",
      },
      {
        title: "Deaths",
        dataIndex: "deaths",
        key: "deaths",
      },
      {
        title: "Today Deaths",
        dataIndex: "todayDeaths",
        key: "todayDeaths",
      },
      {
        title: "Recovered",
        dataIndex: "recovered",
        key: "recovered",
      },
    ];
    const columnTotal = [
      {
        title: "Cases",
        dataIndex: "cases",
        key: "cases",
      },
      {
        title: "Deaths",
        dataIndex: "deaths",
        key: "deaths",
      },
      {
        title: "Recovered",
        dataIndex: "recovered",
        key: "recovered",
      },
    ];

    return (
      <div style={{ padding: "10px" }}>
        <Row style={{ width: "100%" }}>
          <Col span={10}>
            <Table
              columns={columnTotal}
              dataSource={worldData}
              size="small"
              pagination={false}
            />
            <Pie {...config} />
          </Col>
          <Col span={1}></Col>

          <Col span={13}>
            <Table columns={column} dataSource={countries} size="small" />
          </Col>
        </Row>
      </div>
    );
  }
}
