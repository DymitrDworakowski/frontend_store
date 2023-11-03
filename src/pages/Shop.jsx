import React from 'react';
import {Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TypeBar from "../components/TypeBar";

import BrandBar from '../components/BranBar';
import {observer} from "mobx-react-lite";




const Shop = observer(() => {

    return (
        <Container>
            <Row className="mt-2">
                <Col md={3}>
                    <TypeBar />
                    <BrandBar/>
                </Col>
                <Col md={9}>
                </Col>
            </Row>
        </Container>
    );
});

export default Shop;