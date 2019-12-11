import * as React from 'react';
import { Props } from './types';
import { Card, Button, Form } from 'react-bootstrap';

const FormInvitation = (props: Props) => {
  const [keyword, setKeyword] = React.useState<string>('');

  const _onChange = (value: string) => {
    setKeyword(value);
  };

  const _onReset = () => {
    setKeyword('');
  };

  const _onSubmit = () => {
    const arrList = _convertStringToArray(keyword);

    props.onSubmit(arrList);
    _onReset();
  };

  const _convertStringToArray = (context: string) => {
    let arrList = context
      .trim()
      .replace(/\s/g, '')
      .split(',');

    // Remove item null
    arrList = arrList.filter((arrItem: string) => arrItem.length);

    return arrList;
  };

  return (
    <div className='form-invitation-module'>
      <Card className='card-invite mb-3'>
        <Card.Body>
          <Card.Title>INVITE BY EMAIL</Card.Title>

          <Card.Subtitle className='text-muted'>
            Separate multiple emails with commas.
          </Card.Subtitle>

          <Form onSubmit={(event: any) => event.preventDefault()}>
            <div className='d-flex justify-content-between mt-3'>
              <Form.Group className='mb-0'>
                <Form.Control
                  type='text'
                  placeholder='Enter email'
                  value={keyword}
                  autoFocus
                  onChange={(event: any) => _onChange(event.target.value)}
                />
              </Form.Group>

              <div>
                <Button
                  variant='primary'
                  type='button'
                  onClick={_onSubmit}
                  disabled={keyword.length < 1 ? true : false}
                >
                  Send Invite
                </Button>
              </div>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default FormInvitation;
