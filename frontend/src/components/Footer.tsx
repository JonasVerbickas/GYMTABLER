
// reactstrap components
import {
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";

export default function Footer() {

  return (
    <footer id="footer" className="footer">
      <Container>
        <Row>
          <Col md="3">
            <h1 className="title">•Gym Tabler</h1>
          </Col>
          <Col md="3">
          </Col>
          <Col md="3">
            <Nav>
            </Nav>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
