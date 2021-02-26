import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Plot from "react-plotly.js";

class Portfolio extends React.Component {
  render() {
    return (
      <div>
        <Row>
          <Col>
            <div className="scatter-div">
              <Plot
                data={[
                  {
                    x: [
                      1,
                      2,
                      3,
                      4,
                      5,
                      6,
                      7,
                      8,
                      9,
                      10,
                      11,
                      12,
                      13,
                      14,
                      15,
                      16,
                      17,
                      18,
                      19,
                      20,
                    ],
                    y: [
                      2,
                      3,
                      4,
                      6,
                      10,
                      11,
                      12,
                      15,
                      10,
                      9,
                      13,
                      14,
                      17,
                      21,
                      27,
                      28,
                      24,
                      29,
                      41,
                    ],
                    type: "scatter",
                    mode: "lines+markers",
                    marker: { color: "green", size: 2 },
                  },
                ]}
                layout={{
                  width: 736,
                  height: 450,
                  paper_bgcolor: "rgba(0,0,0,0)",
                  plot_bgcolor: "rgba(0,0,0,0)",
                  xaxis: {
                    showgrid: false,
                    visible: false,
                  },
                  yaxis: {
                    showgrid: false,
                    showline: true,
                  },
                }}
              />
            </div>
          </Col>
          <Col>
            <div>
              <Plot
                data={[
                  {
                    values: [414, 916, 755, 20, 100, 14, 17, 18, 12],
                    labels: [
                      "Technology",
                      "Minerals",
                      "Banking",
                      "d",
                      "e",
                      "f",
                      "g",
                      "h",
                      "i",
                      "j",
                      "k",
                    ],
                    "marker": {
                      "colors": ["rgb(95, 158, 160)"],
                    },
                    type: "pie",
                  },
                ]}
                layout={{
                  height: 400,
                  width: 500,
                  title: "Pie chart",
                  paper_bgcolor: "rgba(0,0,0,0)",
                }}
              />
            </div>
          </Col>
        </Row>

        <div>
          <Plot
            data={[
              {
                values: [414, 916, 755, 20, 100, 14, 17, 18, 12],
                labels: [
                  "Technology",
                  "Minerals",
                  "Banking",
                  "d",
                  "e",
                  "f",
                  "g",
                  "h",
                  "i",
                  "j",
                  "k",
                ],
                "marker": {
                  "colors": ["rgb(95, 158, 160)"],
                },
                type: "pie",
              },
            ]}
            layout={{
              height: 400,
              width: 500,
              title: "Pie chart",
              paper_bgcolor: "rgba(0,0,0,0)",
            }}
          />
        </div>
      </div>
    );
  }
}

export default Portfolio;
