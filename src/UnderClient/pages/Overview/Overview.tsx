import * as React from 'react';
import { Chart } from 'react-google-charts';
import Layout from 'UnderClient/components/Layout/Layout';
import { Props } from './types';
import { TEXT_OVERVIEW } from 'Shared/constants/texts';
import './Overview.scss';
import { Card, Row, Col, Media } from 'react-bootstrap';
import { chartData, chartUIConfig } from './data';

const Overview = (props: Props) => {
  return (
    <Layout
      documentTitle={TEXT_OVERVIEW}
      pageTitle={TEXT_OVERVIEW}
      className='overview-module'
    >
      <div className='p-4'>
        <Card className='mb-3 card-chart'>
          <Card.Body className='overview-chart-wrapper'>
            <Row>
              <Col md={6}>
                <div className='d-flex justify-content-between'>
                  <h5 className='font-weight-semibold'>
                    Total Number of Fields Captured
                  </h5>
                  <p className='text-muted'>2019</p>
                </div>
              </Col>
            </Row>

            <Chart
              width={'100%'}
              height={'100%'}
              chartType='LineChart'
              loader={<div>Loading Chart</div>}
              data={chartData}
              options={chartUIConfig}
              rootProps={{ 'data-testid': '1' }}
            />
          </Card.Body>
        </Card>

        <Row>
          <Col xs={4}>
            <Card className='card-analysis'>
              <Card.Body>
                <Media>
                  <span>
                    <i className='status status-success status-x60'></i>
                  </span>

                  <Media.Body>
                    <Card.Title>
                      544
                      <small className='text-success'>
                        <i className='fas fa-caret-circle-up'></i>
                      </small>
                    </Card.Title>

                    <Card.Text className='text-uppercase'>
                      Total Approved
                      <span className='text-success'> (+346)</span>
                    </Card.Text>
                  </Media.Body>
                </Media>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={4}>
            <Card className='card-analysis'>
              <Card.Body>
                <Media>
                  <span>
                    <i className='status status-warning status-x60'></i>
                  </span>

                  <Media.Body>
                    <Card.Title>
                      201
                      <small className='text-success'>
                        <i className='fas fa-caret-circle-up'></i>
                      </small>
                    </Card.Title>

                    <Card.Text className='text-uppercase'>
                      Pending Applications
                      <span className='text-success'> (+286)</span>
                    </Card.Text>
                  </Media.Body>
                </Media>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={4}>
            <Card className='card-analysis'>
              <Card.Body>
                <Media>
                  <span>
                    <i className='status status-error status-x60'></i>
                  </span>

                  <Media.Body>
                    <Card.Title>
                      93
                      <small className='text-danger'>
                        <i className='fas fa-caret-circle-down'></i>
                      </small>
                    </Card.Title>

                    <Card.Text className='text-uppercase'>
                      Rejected Applications
                      <span className='text-danger'> (+346)</span>
                    </Card.Text>
                  </Media.Body>
                </Media>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </Layout>
  );
};

export default Overview;
