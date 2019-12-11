import * as React from 'react';
import { withRouter } from 'react-router';
import { Props } from './types';
import Layout from 'UnderAdmin/components/Layout/Layout';
import PdfMapping from 'Shared/components/PdfMapping/PdfMapping';
import { Navbar } from 'react-bootstrap';
import './PdfMapping.scss';

const PdfMappingPage = (props: Props) => {
  const [showCreateTemplateBtn, setShowCreateTemplateBtn] = React.useState<
    boolean
  >(false);
  const [showForm, setShowForm] = React.useState<boolean>(false);

  const handleShowBtn = () => {
    setShowCreateTemplateBtn(!showCreateTemplateBtn);
  };

  const handleCreateTemplate = () => {
    setShowForm(true);
  };

  return (
    <Layout
      className='ua-home-page'
      documentTitle='PDF Mapping'
      pageTitle='PDF Mapping'
    >
      <Navbar bg='white' className='px-4 py-3 sticky-top'>
        <span className='text-md text-uppercase text-muted top-bar-title'>
          MAP A NEW PDF
        </span>

        <div
          id='step-upload-pdf'
          className={!showCreateTemplateBtn ? 'hide' : 'step-upload-pdf'}
        >
          <div className='step-item'>
            <div className='icon-step active'></div>
            <div className='step-name text-md text-uppercase'>
              STEP 1: MAPPING FIELDS ON TEMPLATE
            </div>
          </div>

          <div className='step-item'>
            <div className='icon-step'></div>
            <div className='step-name'>STEP 2: DESIGN UNIVERSIAL FORM</div>
          </div>
        </div>

        <div
          className={!showCreateTemplateBtn ? 'hide' : 'create-template-block'}
        >
          <button className='btn btn-primary' onClick={handleCreateTemplate}>
            Create
          </button>
        </div>
      </Navbar>

      <div className='px-4 py-2'>
        <PdfMapping
          onShowCreateTemplateBtn={handleShowBtn}
          onShowForm={showForm}
        />
      </div>
    </Layout>
  );
};

export default withRouter(PdfMappingPage);
