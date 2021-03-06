import React from 'react';
import { observer } from 'mobx-react';
import { Checkbox, FormControl, ControlLabel, Row, Col, Radio, FormGroup } from 'react-bootstrap';

export default observer(({store}) => (
  <Row>
    <h3>Find Books</h3>
    <Col sm={4} lg={3}>
      <ControlLabel>Filter by Grade Level</ControlLabel>
      <FormControl componentClass="select" placeholder="Select" onChange={store.handleGradeLevel} value={store.lvlFilter}>
        <option value="">Select</option>
        <option value="PreK-G1">PreK-1</option>
        <option value="G2-G3">2-3</option>
        <option value="G4-G5">4-5</option>
      </FormControl>

      <Checkbox checked={store.chapters} onChange={store.handleChapterFilter}>
        Chapter Only
      </Checkbox>

    </Col>
    <Col sm={4} lg={3}>
      <ControlLabel>Filter by GRL</ControlLabel>
      <FormControl componentClass="select" placeholder="Select" onChange={store.handleGrlFilter} value={store.grlFilter}>
        <option value="">Select</option>
        <option value="A,B,C">A-C</option>
        <option value="D,E,F,G,H,I">D-I</option>
        <option value="J,K,L,M">J-M</option>
        <option value="N,O,P">N-P</option>
        <option value="Q,R,S,T">Q-T</option>
        <option value="U,W,X,Y,Z">U-Z</option>
      </FormControl>

      <FormGroup>
        <Radio name="bilingual-filter" id="all" onClick={store.handleBilingualFilter}>All</Radio>
        <Radio name="bilingual-filter" id="bilingual" onClick={store.handleBilingualFilter}>Bilingual</Radio>
        <Radio name="bilingual-filter" id="english" onClick={store.handleBilingualFilter}>English Only</Radio>
      </FormGroup>
    </Col>
    <Col sm={4} lg={3}>
      <ControlLabel inline>Filter by DRA</ControlLabel>
      <FormControl componentClass="select" placeholder="Select" onChange={store.handleDraFilter} value={store.draFilter}>
        <option value="">Select</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3-4">3-4</option>
        <option value="6">6</option>
        <option value="8">8</option>
        <option value="10">10</option>
        <option value="12">12</option>
        <option value="14">14</option>
        <option value="16">16</option>
        <option value="18">18</option>
        <option value="20">20</option>
        <option value="24">24</option>
        <option value="28">28</option>
        <option value="30">30</option>
        <option value="34">34</option>
        <option value="38">38</option>
        <option value="40">40</option>
        <option value="50">50</option>
        <option value="60">60</option>
      </FormControl>
    </Col>
  </Row>
));
