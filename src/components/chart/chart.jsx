import React, { useEffect, useRef } from 'react';
import { dispose, init } from 'klinecharts';
import './styles.css';
import moment from 'moment';

const ORDER_TYPE = [
  'BID',
  'ASK'
];

Chart.defaultProps = {
  prices: [],
  orders: []
};

function Chart({ prices, orders, name }) {
  const chart = useRef()

  useEffect(() => {
    chart.current = init(name);
    chart.current?.createIndicator('MA', false, { id: 'candle_pane' });
    chart.current?.createIndicator('EMA', false, { id: 'candle_pane' });
    orders.forEach((item, index) => {
      chart.current?.createOverlay({
        name: 'simpleAnnotation',
        extendData: `O: ${ORDER_TYPE[item.orderType]} order ${index + 1}`,
        points: [{ timestamp: item.openedAt, value: item.openPrice }],
        styles: {
          line: {
            style: 'dashed',
            dashedValue: [1, 1],
            color: '#00ff2a',
            size: 3
          }
        }
      });

      if (moment(item.doneAt).year() !== 1) {
        chart.current?.createOverlay({
          name: 'simpleAnnotation',
          extendData: `D: ${ORDER_TYPE[item.orderType]} order ${index + 1}`,
          points: [{ timestamp: item.doneAt, value: item.takeProfitPrice }],
          styles: {
            line: {
              style: 'dashed',
              dashedValue: [3, 3],
              color: '#0033ff',
              size: 2
            }
          },
        });
      }

      if (moment(item.canceledAt).year() !== 1) {
        chart.current?.createOverlay({
          name: 'simpleAnnotation',
          extendData: `C: ${ORDER_TYPE[item.orderType]} order ${index + 1}`,
          points: [{ timestamp: item.canceledAt, value: item.cancelOrderPrice }],
          styles: {
            line: {
              style: 'dashed',
              dashedValue: [3, 3],
              color: '#f00',
              size: 3
            }
          },
        });
      }
    });

    chart.current?.applyNewData(prices);

    return () => {
      dispose(name)
    }
  }, [prices])


  return (<div
    className="k-line-chart-container">
    <div id={name} className="k-line-chart"/>
    <div className="k-line-chart-menu-container">
      {/*<button*/}
      {/*    onClick={() => {*/}
      {/*        const dataList = chart.current?.getDataList() ?? []*/}
      {/*        const data = dataList[dataList.length - 20]*/}
      {/*        console.log([{ timestamp: data.timestamp, value: data.open }])*/}
      {/*        chart.current?.createOverlay({*/}
      {/*            name: 'simpleAnnotation',*/}
      {/*            extendData: 'Open ASK order',*/}
      {/*            points: [{ timestamp: data.timestamp, value: data.open }],*/}
      {/*            styles: {*/}
      {/*                line: {*/}
      {/*                    style: 'dashed',*/}
      {/*                    dashedValue: [3, 3],*/}
      {/*                    color: '#f00',*/}
      {/*                    size: 3*/}
      {/*                },*/}

      {/*            },*/}
      {/*        })*/}
      {/*    }}>*/}
      {/*    A*/}
      {/*</button>*/}
      {/*<button*/}
      {/*    onClick={() => {*/}
      {/*        const dataList = chart.current?.getDataList() ?? []*/}
      {/*        const data = dataList[dataList.length - 40]*/}
      {/*        chart.current?.createOverlay({*/}
      {/*            name: 'simpleAnnotation',*/}
      {/*            extendData: '1223',*/}
      {/*            points: [{ timestamp: data.timestamp, value: data.open }],*/}
      {/*            styles: {*/}
      {/*                line: {*/}
      {/*                    style: 'solid',*/}
      {/*                    dashedValue: [2, 2],*/}
      {/*                    color: '#635D40',*/}
      {/*                    size: 2*/}
      {/*                }*/}
      {/*            },*/}
      {/*        })*/}
      {/*    }}>*/}
      {/*    B*/}
      {/*</button>*/}
    </div>
  </div>);
}

export default Chart;
