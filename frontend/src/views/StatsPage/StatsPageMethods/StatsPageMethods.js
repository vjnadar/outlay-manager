import moment from "moment";

class StatsPageMethods {
  constructor(main) {
    this.main = main;
    this.getStats = this.getStats.bind(this);
    this.setSingleFlowtype = this.setSingleFlowtype.bind(this);
  }

  getStats(e) {
    const { startDate, endDate } = this.main.state;
    const { getStatsAction, setLastDateEntryAction } = this.main.props;
    e.preventDefault();
    const body = {
      startDate,
      endDate
    };
    const alteredStartDate = moment(startDate).format("DD-MM-YYYY");
    const alteredEndDate = moment(endDate).format("DD-MM-YYYY");
    const incomeDateLabel = `Income (${alteredStartDate}  -  ${alteredEndDate})`;
    const expenseDateLabel = `Expense (${alteredStartDate}  -  ${alteredEndDate})`;
    const dateEntries = {
      incomeDateLabel,
      expenseDateLabel,
      startDate,
      endDate
    };
    setLastDateEntryAction(dateEntries);
    this.main.setState({ touched: true });
    getStatsAction(body, this.setSingleFlowtype);
  }

  setSingleFlowtype(income, expense) {
    if (!income.length && expense.length) {
      this.main.setState({ flowtype: "expense" });
    } else if (income.length && !expense.length) {
      this.main.setState({ flowtype: "income" });
    }
  }
}

export default StatsPageMethods;
