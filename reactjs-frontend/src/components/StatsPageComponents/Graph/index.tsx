import "./Graph.scss";

import { Chart as ChartType } from "chart.js";
import Chart from "chart.js/auto";
import { createRef, MutableRefObject, useEffect, useRef } from "react";
import { Alert, Col, Row } from "reactstrap";

import usePrevious from "../../../customHooks/usePrevious";
import { Card } from "../..";
import { GraphProps } from "./types";

export function Graph({ income, expense, flowtype, graphtype, incomeTitle, expenseTitle, touched }: GraphProps): JSX.Element {
    const graphRef = createRef<HTMLCanvasElement>();
    const chart: MutableRefObject<ChartType | null> = useRef(null);
    const prevFlowtype = usePrevious(flowtype);
    const prevGraphtype = usePrevious(graphtype);
    function randomColor() {
        const letters = "0123456789ABCDEF".split("");
        let color = "#";
        for (let i = 0; i < 6; i += 1) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    useEffect(() => {
        if (chart.current) {
            chart?.current.destroy();
        }
        if (income.length || expense.length) {
            drawChart();
        }
    }, []);
    useEffect(() => {
        if (prevFlowtype !== flowtype || prevGraphtype !== graphtype) {
            if (chart.current) {
                chart?.current.destroy();
            }
            drawChart();
        }
    }, [prevFlowtype, flowtype, prevGraphtype, graphtype]);
    function drawChart() {
        const graphLabel = flowtype === "income" ? "Income" : "Expense";
        const text = flowtype === "income" ? incomeTitle : expenseTitle;
        const labels: string[] = [];
        const data: number[] = [];
        if (flowtype === "income") {
            income.forEach((inc) => {
                /* eslint-disable-next-line no-underscore-dangle */
                labels.push(inc._id.type);
                data.push(inc.amount);
            });
        } else if (flowtype === "expense") {
            expense.forEach((exp) => {
                /* eslint-disable-next-line no-underscore-dangle */
                labels.push(exp._id.type);
                data.push(exp.amount);
            });
        }
        if (labels.length && data.length) {
            const graph = graphRef.current ? graphRef.current.getContext("2d") : null;
            if (graph) {
                chart.current = new Chart(graph, {
                    type: graphtype,
                    data: {
                        labels,
                        datasets: [
                            {
                                label: graphLabel,
                                data,
                                backgroundColor: data.map(() => {
                                    return randomColor();
                                })
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            title: {
                                display: true,
                                text
                            }
                        }
                    }
                });
            }
        }
    }
    return (
        <Row>
            <Col xs={{ size: 12, offset: 0 }} sm={{ size: 12, offset: 0 }} md={{ size: 12, offset: 0 }} lg={{ size: 7, offset: 3 }} xl={{ size: 6, offset: 3 }}>
                {income.length || expense.length ? (
                    <Card body>
                        <canvas id="graph" ref={graphRef} />
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
                            <Alert color="warning">No data. Select a different range!</Alert>
                        </Col>
                    </Row>
                ) : null}
            </Col>
        </Row>
    );
}
