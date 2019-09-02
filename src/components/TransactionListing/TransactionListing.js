import React from "react";
import "./TransactionListing.css";
import propTypes from "prop-types";
import moment from "moment";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Icon,
  makeStyles
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  expansionPanelSummaryDiv: {
    display: "flex",
    justifyContent: "space-around",
    fontSize: "0.8em"
  },
  expansionPanelDetailsDiv: {
    display: "flex",
    flexFlow: "column",
    justifyContent: "center",
    color: "#666"
  }
}));
const TransactionListing = props => {
  const classes = useStyles();
  const toOrFromAccDetails = props.tran.to
    ? `To - ${props.tran.to.name} (${props.tran.to.id})`
    : `From - ${props.tran.from.name} (${props.tran.from.id})`;

  return (
    <div className="single__transaction__listing">
      <ExpansionPanel>
        <ExpansionPanelSummary
          className={classes.expansionPanelSummaryDiv}
          expandIcon={<Icon>expand_more</Icon>}
        >
          <p
            className={
              props.tran.transactionType === "CREDIT"
                ? "credit__transaction"
                : "debit__transaction"
            }
          >
            {props.tran.transactionType}
          </p>
          <p>
            <b>${props.tran.amount}</b>
          </p>
          <p>
            <b>{moment(props.tran.date).format("Do MMM YYYY")}</b>
          </p>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.expansionPanelDetailsDiv}>
          <small style={{ marginBottom: "2%", marginTop: "2%" }}>
            {toOrFromAccDetails}
          </small>
          <small>Message - {props.tran.message}</small>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};

TransactionListing.propTypes = {
  tran: propTypes.shape({
    to: propTypes.shape({
      id: propTypes.string.isRequired,
      name: propTypes.string.isRequired
    }),
    from: propTypes.shape({
      id: propTypes.string.isRequired,
      name: propTypes.string.isRequired
    }),
    transactionType: propTypes.oneOf(["CREDIT", "DEBIT"]),
    amount: propTypes.oneOfType([propTypes.string, propTypes.number])
      .isRequired,
    date: propTypes.oneOfType([propTypes.string, propTypes.number]).isRequired,
    message: propTypes.string.isRequired
  })
};

TransactionListing.defaultProps = {
  tran: {
    from: {
      id: "asdsd23422342",
      name: "Credit Card"
    },
    transactionType: "CREDIT",
    amount: 6000,
    date: 1034534523,
    message: "sample"
  }
};
export default TransactionListing;
