import React, { Component } from "react";
import moment from "moment";
import { connect } from "react-redux";

import * as actions from "../../store/actions/statsPageActions/index";
import axios from "../../http/axios";
import Graph from "../../components/StatsPageComponents/Graph/Graph";
import Handlers from "./Handlers/Handlers";
import SetTokenHeader from "../../hoc/SetTokenHeader/SetTokenHeader";
import StatsPageMethods from "./StatsPageMethods/StatsPageMethods";
import Spinner from "../../components/UI/Spinner/Spinner";
import StatsForm from "../../components/StatsPageComponents/StatsForm/StatsForm";

class StatsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: this.props.lastStartDate
        ? moment(this.props.lastStartDate)
        : null,
      endDate: this.props.lastEndDate ? moment(this.props.lastEndDate) : null,
      focusedInput: null,
      income: null,
      expense: null,
      flowtype: "income",
      graphtype: "pie",
      touched: false,
    };
    this.handlers = new Handlers(this);
    this.statsPageMethods = new StatsPageMethods(this);
    // this.formHandler = this.formHandler.bind(this);
  }

  render() {
    const {
      startDate,
      endDate,
      focusedInput,
      flowtype,
      touched,
      graphtype,
    } = this.state;
    const { income, expense, loading } = this.props;
    let contents = <></>;
    if (loading) {
      contents = (
        <>
          <Spinner />
        </>
      );
    } else {
      contents = (
        <>
          <Graph
            income={income}
            expense={expense}
            flowtype={flowtype}
            graphtype={graphtype}
            incomeTitle={this.props.incomeLabel}
            expenseTitle={this.props.expenseLabel}
            touched={touched}
          />

          <StatsForm
            getStats={this.statsPageMethods.getStats}
            income={income}
            expense={expense}
            flowtype={flowtype}
            focusedInput={focusedInput}
            startDate={startDate}
            endDate={endDate}
            formHandler={this.handlers.formHandler}
            dateChangeHandler={this.handlers.dateChangeHandler}
            focusChangeHandler={this.handlers.focusChangeHandler}
          />
        </>
      );
    }
    return <>{contents}</>;
  }
}

const mapStateToProps = (state) => {
  return {
    income: state.statsPageReducer.income,
    expense: state.statsPageReducer.expense,
    loading: state.statsPageReducer.loading,
    error: state.statsPageReducer.error,
    incomeLabel: state.statsPageReducer.incomeLabel,
    expenseLabel: state.statsPageReducer.expenseLabel,
    lastStartDate: state.statsPageReducer.lastStartDate,
    lastEndDate: state.statsPageReducer.lastEndDate,
    token: state.authenticationReducer.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getStatsAction: (body, setSingleFlowtype) => {
      dispatch(actions.getStats(body, setSingleFlowtype));
    },
    setLastDateEntryAction: (dateEntries) => {
      dispatch(actions.setLastDateEntry(dateEntries));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SetTokenHeader(StatsPage, axios));
