import * as React from 'react';
import Layout from 'UnderClient/components/Layout/Layout';
import { Props } from './types';
import { Card, Button, Row, Col } from 'react-bootstrap';
import useModal from 'Shared/hooks/UseModal/useModal';
import './GuideUI.scss';

const GuideUI = (props: Props) => {
  const { show: showA, Modal: ModalA, hide: hideA } = useModal();
  const { show: showB, Modal: ModalB } = useModal();
  const { show: showC, Modal: ModalC, hide: hideC } = useModal();

  const handleSave = () => {
    alert('Save change');
    hideC();
  };

  const handleClose = () => {
    hideC();
    alert('Close');
  };

  return (
    <Layout className='guideui' documentTitle='Private Guide for Frontend'>
      <div className='p-4'>
        <Card className='mb-3'>
          <Card.Body className='overview-chart-wrapper'>
            <Row>
              <Col xs={4}>
                <p>
                  Modal A: hideHeader, hideFooter, allow to custom ui modal by
                  class
                </p>
                <Button onClick={showA}>Launch Modal A</Button>
                <ModalA
                  className='custom-modal custom-modal-body'
                  hideHeader
                  hideFooter
                >
                  <div>
                    <p>Modal A: hideHeader, hideFooter</p>
                    <Button onClick={hideA}>Hide</Button>
                  </div>
                </ModalA>
              </Col>
              <Col xs={4}>
                <p>Modal B: original modal</p>
                <Button onClick={showB}>Launch Modal B</Button>
                <ModalB modalTitle='Modal B'>
                  <p>Modal B: original modal</p>
                </ModalB>
              </Col>
              <Col xs={4}>
                <p>
                  Modal C: hideHeader, centered, handle event onSave and handle
                  event onClose
                </p>
                <Button onClick={showC}>Launch Modal C</Button>
                <ModalC
                  hideHeader
                  isCentered
                  onSave={handleSave}
                  onClose={handleClose}
                >
                  <p>
                    Modal C: hideHeader, centered, handle event onSave and
                    handle event onClose
                  </p>
                </ModalC>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>
    </Layout>
  );
};

export default GuideUI;
