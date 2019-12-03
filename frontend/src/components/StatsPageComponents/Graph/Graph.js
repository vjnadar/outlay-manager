import React, { PureComponent } from "react";
import Chart from "chart.js";
import { Alert, Row, Col } from "reactstrap";

import Card from "../../UI/Card/Card";

class Graph extends PureComponent {
  graphRef = React.createRef();
  chart;

  componentDidMount() {
    this.drawChart();
  }

  componentDidUpdate() {
    if (this.chart !== undefined) {
      this.chart.destroy();
    }
    this.drawChart();
  }

  randomColor = () => {
    var letters = "0123456789ABCDEF".split("");
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  drawChart = () => {
    const {
      income,
      expense,
      flowtype,
      graphtype,
      incomeTitle,
      expenseTitle
    } = this.props;
    const graphLabel = flowtype === "income" ? "Income" : "Expense";
    const text = flowtype === "income" ? incomeTitle : expenseTitle;
    let labels = [];
    let data = [];
    if (flowtype === "income") {
      income.forEach(inc => {
        labels.push(inc._id.type);
        data.push(inc.amount);
      });
    } else if (flowtype === "expense") {
      expense.forEach(exp => {
        labels.push(exp._id.type);
        data.push(exp.amount);
      });
    }
    if (labels.length && data.length) {
      const graph = this.graphRef.current.getContext("2d");
      this.chart = new Chart(graph, {
        type: graphtype,
        data: {
          //Bring in data
          labels: labels,
          datasets: [
            {
              label: graphLabel,
              data,
              backgroundColor: data.map((val, index) => {
                return this.randomColor();
              })
            }
          ]
        },
        options: {
          title: {
            display: true,
            text
          }
        }
      });
    }
  };

  render() {
    const { income, expense, touched } = this.props;
    return (
      <>
        <Row>
          <Col
            xs={{ size: 12, offset: 0 }}
            sm={{ size: 12, offset: 0 }}
            md={{ size: 12, offset: 0 }}
            lg={{ size: 7, offset: 3 }}
            xl={{ size: 6, offset: 3 }}
          >
            {income.length || expense.length ? (
              <Card body={true}>
                <canvas id="graph" ref={this.graphRef} />
              </Card>
            ) : !(income.length && expense.length) && touched ? (
              <Row>
                <Col
                  xs={{ size: 7, offset: 0 }}
                  sm={{ size: 7, offset: 1 }}
                  md={{ size: 6, offset: 0 }}
                  lg={{ size: 6, offset: 0 }}
                  xl={{ size: 6, offset: 0 }}
                >
                  <Alert color="warning">
                    No data. Select a different range!
                  </Alert>
                </Col>
              </Row>
            ) : (
              <></>
            )}
          </Col>
        </Row>
      </>
    );
  }
}
export default Graph;
