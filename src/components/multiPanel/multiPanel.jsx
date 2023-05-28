import { Col, Row } from 'react-bootstrap';
import Panel from '../panel/panel';

const MultiPanel = () => {
  return <div>
    <Row>
      <Col sm={6}>
        <Panel isShowOrder={false} name="k-line"/>
      </Col>
      <Col sm={6}>
        <Panel isShowOrder={false} name="k-line-left"/>
      </Col>
    </Row>
  </div>
};

export default MultiPanel;
