import { ListGroup } from 'react-bootstrap';
import React from 'react';
import Moment from 'react-moment';

const Statistic = ({ backTestingData }) => {
  const {
    pair,
    strategy,
    createdAt,
    initialBaseAmount,
    currentBaseAmount,
    initialQuoteAmount,
    currentQuoteAmount,
    baseCoin,
    quoteCoin,
    profit,
    profitMargin,
    profit_factor,
    cagr
  } = backTestingData;

  return <div>
    <h3>Statistic</h3>
    <ListGroup>
      <ListGroup.Item>Symbol: {pair}</ListGroup.Item>
      <ListGroup.Item>Strategy: {strategy}</ListGroup.Item>
      <ListGroup.Item>Created at: <Moment format="hh:mm DD/MM/YYYY">{createdAt}</Moment></ListGroup.Item>
      <ListGroup.Item>Initial base amount: {initialBaseAmount?.toFixed(3)} {baseCoin}</ListGroup.Item>
      <ListGroup.Item>Current base amount: {currentBaseAmount?.toFixed(3)} {baseCoin}</ListGroup.Item>
      <ListGroup.Item>Initial quote amount: {initialQuoteAmount?.toFixed(3)} {quoteCoin}</ListGroup.Item>
      <ListGroup.Item>Current quote amount: {currentQuoteAmount?.toFixed(3)} {quoteCoin}</ListGroup.Item>
      <ListGroup.Item>Profit: {profit?.toFixed(3)} {quoteCoin}</ListGroup.Item>
      <ListGroup.Item>Profit margin: {profitMargin?.toFixed(3)} %</ListGroup.Item>
      {/*<ListGroup.Item>Profit factor: {profit_factor} %</ListGroup.Item>*/}
      <ListGroup.Item>CAGR: {cagr?.toFixed(3)} %</ListGroup.Item>
    </ListGroup>
  </div>
};

export default Statistic;
