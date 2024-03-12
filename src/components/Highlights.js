import { Row, Col, Card } from 'react-bootstrap';

export default function Highlights(){
    return (
        <Row className="bg-secondary mt-3 mb-3">
            <Col  xs={12} md={4}>
                <Card className="cardHighlight p-3">
                    <Card.Body>
                        <Card.Title>
                            <h2>Shop Anytime, Anywhere</h2>
                        </Card.Title>
                        <Card.Text>
                            Explore a wide range of products from the comfort of your home. With our online shopping platform, you can browse and purchase items conveniently at any time, whether you're at home, at work, or on the go.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            <Col xs={12} md={4}>
                <Card className="cardHighlight p-3">
                    <Card.Body>
                        <Card.Title>
                            <h2>Enjoy Secure Transactions</h2>
                        </Card.Title>
                        <Card.Text>
                            Shop with confidence knowing that your transactions are safe and secure. Our platform employs the latest encryption technology to protect your personal and financial information, ensuring a worry-free shopping experience.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            <Col xs={12} md={4}>
                <Card className="cardHighlight p-3">
                    <Card.Body>
                        <Card.Title>
                            <h2>Discover Exciting Deals</h2>
                        </Card.Title>
                        <Card.Text>
                            Don't miss out on amazing deals and discounts! Explore our online store regularly to discover exclusive offers on your favorite products. Save money while enjoying the convenience of online shopping.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}