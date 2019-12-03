import React, { Component } from "react";
import moment from "moment";
import { connect } from "react-redux";

import * as actions from "../../store/actions/mainPageActions/index";
import axios from "../../http/axios";
import { Row, Col } from "reactstrap";
import Handlers from "./Handlers/Handlers";
import SetTokenHeader from "../../hoc/SetTokenHeader/SetTokenHeader";
import MainPageMethods from "./MainPageMethods/MainPageMethods";
import MainViewAndControl from "../../components/MainPageComponents/MainViewAndControl/MainViewAndControl";
import OutlayModalForm from "../../components/MainPageComponents/OutlayModalForm/OutlayModalForm";
import Spinner from "../../components/UI/Spinner/Spinner";

import { MainPageContext, AppContext } from "../../contexts/contexts";

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
      date: this.props.lastSelectedDate
        ? moment(this.props.lastSelectedDate)
        : moment(),
      modal: false,
      entryFromDate: null,
      intitialOutlayFormState: {
        flowtype: "income",
        itype: "",
        etype: "",
        amount: "",
        iCustom: "",
        eCustom: ""
      }
    };
    this.handlers = new Handlers(this);
    this.mainPageMethods = new MainPageMethods(this);
    this.getDateData = this.getDateData.bind(this);
    this.abortController = new AbortController();
  }

  componentDidMount() {
    this.context.lockRoute(true);
    if (this.props.token) {
      this.getDateData(this.state.date);
    }
  }

  getDateData(date) {
    this.props.getDateDataAction(date);
  }

  static contextType = AppContext;

  render() {
    const { entryFromDate, loading, error, grandTotal } = this.props;
    const { date, focused, modal, intitialOutlayFormState } = this.state;
    const mainPageContext = {
      modalHandler: this.handlers.modalHandler,
      dateChangeHandler: this.handlers.dateChangeHandler,
      focusChangeHandler: this.handlers.focusChangeHandler,
      deleteDateEntry: this.mainPageMethods.deleteDateEntry,
      match: { ...this.props.match },
      history: { ...this.props.history }
    };
    const serverError = error && error.data.statusCode === 500;
    let mainContent = <></>;
    if (entryFromDate && !serverError && grandTotal.length && !loading) {
      mainContent = (
        <>
          <MainPageContext.Provider value={mainPageContext}>
            <MainViewAndControl
              date={date}
              focused={focused}
              entryFromDate={entryFromDate}
              grandTotal={grandTotal}
            />
          </MainPageContext.Provider>
        </>
      );
    }
    if (loading) {
      mainContent = (
        <>
          <Spinner />
        </>
      );
    } else if (serverError && !entryFromDate && !grandTotal.length) {
      console.log("Error");
      mainContent = (
        <Row>
          <Col>
            <h4>
              <b>Sorry. Something went wrong. Please try again later.</b>
            </h4>
          </Col>
        </Row>
      );
    }
    let outlayModalForm = <></>;
    if (date) {
      outlayModalForm = (
        <>
          <OutlayModalForm
            modal={modal}
            modalHandler={this.handlers.modalHandler}
            handleSubmit={this.mainPageMethods.handleSubmit}
            date={date}
            initialValues={intitialOutlayFormState}
          />
        </>
      );
    }

    return (
      <div>
        {mainContent}
        {outlayModalForm}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    entryFromDate: state.mainPageReducer.selectedDateEntry,
    lastSelectedDate: state.mainPageReducer.lastSelectedDate,
    loading: state.mainPageReducer.loading,
    error: state.mainPageReducer.error,
    grandTotal: state.mainPageReducer.grandTotal,
    token: state.authenticationReducer.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getDateDataAction: date => {
      dispatch(actions.getAll(date));
    },
    postDateDataAction: (entries, modalHandlerCallback, resetFormCallback) => {
      dispatch(
        actions.postDateData(entries, modalHandlerCallback, resetFormCallback)
      );
    },
    deleteDateEntryAction: (id, date, closeModalCallback) => {
      dispatch(actions.deleteDateEntry(id, date, closeModalCallback));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SetTokenHeader(MainPage, axios));
