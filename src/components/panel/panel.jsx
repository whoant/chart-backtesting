import { Col, Row } from 'react-bootstrap';
import Chart from '../chart/chart';
import OrderHistory from '../orderHistory/orderHistory';
import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { getAll, getDetail } from '../../api/api';
import dayjs from 'dayjs';
import Statistic from '../statistic/statistic';

const Panel = ({ isShowOrder, name }) => {
  const [labels, setLabels] = useState([]);
  const [versions, setVersions] = useState([]);
  const [currentId, setCurrentId] = useState('');
  const [portfolio, setPortfolio] = useState({});

  const fetchData = async() => {
    const { data } = await getAll();
    setLabels(data.keys)
  }

  useEffect(() => {
    const fetchDataInterval = setInterval(() => {
      fetchData();
    }, 500)
    return () => {
      clearInterval(fetchDataInterval);
    }
  }, []);

  const handleOnChange = (id) => {
    const currentLabel = labels.find(label => label.id === id);
    if (currentLabel === undefined) return;
    setCurrentId(id);
    setVersions(Array.from(Array(Number(currentLabel.currentVersion)), (_, i) => i + 1));
  };

  const handleOnVersionChange = async(version) => {
    const { data: { portfolio } } = await getDetail(currentId, version);
    setPortfolio(portfolio);
  };

  return <div>
    <Row className="mt-3">
      <Col>
        <Form.Select aria-label="Default select example" onChange={(e) => handleOnChange(e.target.value)}>
          <option>Select in label here</option>
          {
            labels && labels.map(item => <option key={item.id}
                                                 value={item.id}>{item.baseCoin}/{item.quoteCoin} {item.strategyName} {dayjs(item.startDate).format('DD/MM/YY hh:mm')} {dayjs(item.endDate).format('DD/MM/YY hh:mm')}</option>)
          }
        </Form.Select>
      </Col>
    </Row>
    <Row className="mt-3">
      <Col>
        <Form.Select aria-label="Default select example"
                     onChange={(e) => handleOnVersionChange(e.target.value)}>
          <option>Version</option>
          {
            versions && versions.map(v => <option value={v} key={v}>{v}</option>)
          }
        </Form.Select>
      </Col>
    </Row>
    <Row>
      <Col>
        <Chart prices={portfolio.prices} orders={portfolio.orders} name={name}/>
      </Col>
    </Row>
    <Row>
      {
        isShowOrder && (
          <Col sm={9}>
            <OrderHistory chartData={portfolio.orders}/>
          </Col>)
      }
      {
        isShowOrder && (<Col sm={3}>
          <Statistic backTestingData={portfolio}/>
        </Col>)
      }
      {
        !isShowOrder && (
          <Col>
            <Statistic backTestingData={portfolio}/>
          </Col>
        )
      }

    </Row>
  </div>
};

export default Panel;
