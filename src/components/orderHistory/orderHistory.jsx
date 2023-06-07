import { Table } from 'react-bootstrap';
import React from 'react';
import Moment from 'react-moment';
import classNames from 'classnames';

OrderHistory.defaultProps = {
  chartData: []
};

const ORDER_TYPE = [
  'BID',
  'ASK'
];

const ORDER_STATE = [
  'ENABLED',
  'CANCEL',
  'DONE',
]

function OrderHistory({ chartData }) {

  return <div>
    <h3>Orders history</h3>
    <Table bordered>
      <thead>
      <tr>
        <th>#</th>
        <th>Order type</th>
        <th>Open at</th>
        <th>Open price</th>
        <th>Done at</th>
        <th>Take profit price</th>
        <th>Cancel at</th>
        <th>Cancel order price</th>
      </tr>
      </thead>
      <tbody>
      {
        chartData.map((item, index) => {


          return (
            <tr className={
              classNames({ 'table-primary': ORDER_STATE[item.state] === 'DONE' })
            }>
              <td>{index + 1}</td>
              <td>{ORDER_TYPE[item.orderType]}</td>
              <td>
                <Moment format="HH:mm DD/MM/YYYY">{item.openedAt}</Moment>
              </td>
              <td>{item.openPrice.toFixed(3)}</td>
              <td>
                {
                  ORDER_STATE[item.state] === 'DONE' ?
                    <Moment format="HH:mm DD/MM/YYYY">{item.doneAt}</Moment> : 'NONE'
                }
              </td>
              <td>{item.takeProfitPrice.toFixed(3)}</td>
              <td>
                {
                  ORDER_STATE[item.state] === 'CANCEL' ?
                    <Moment format="HH:mm DD/MM/YYYY">{item.canceledAt}</Moment> : 'NONE'
                }
              </td>
              <td>{item.cancelOrderPrice.toFixed(3)}</td>
            </tr>
          )
        })
      }
      </tbody>
    </Table>
  </div>
}
;

export default OrderHistory;
