import * as React from 'react';
import './PdfMapping.scss';
import * as PdfJs from 'pdfjs-dist';
import CanvasPdf from 'Shared/components/PdfMapping/CanvasPdf';
import { useInjection } from 'Shared/providers/DependencyInjectionProvider';
import { Util } from 'Shared/helpers/Utils';
import { Props } from './types';
import { Accordion, Card, Tabs, Tab } from 'react-bootstrap';

let tempFile = '';
const PdfMapping = (props: Props) => {
  const scriptId = new Date().getTime().toString();
  const [hideForm, setHideForm] = React.useState<boolean>(false);
  const [hideTemplateForm, setHideTemplateForm] = React.useState<boolean>(false);
  const [scale] = React.useState<number>(1);
  const [pdf, setPdf] = React.useState<any>(null);
  const inputFileEl = React.useRef<HTMLInputElement>(null);
  const pdfViewEl = React.useRef<HTMLInputElement>(null);
  const util = useInjection<Util>('util');
  const { onShowCreateTemplateBtn = () => {}, onShowForm } = props;
  const [key, setKey] = React.useState('element');

  React.useEffect(() => {
    util.loadScript('/plugins/pdf/pdf-mapping.js', scriptId);
    const dragBoxEl = document.getElementById('dropzone');
    if (dragBoxEl) {
      (dragBoxEl as HTMLDivElement).addEventListener('drop', onDropBox, false);
      (dragBoxEl as HTMLDivElement).addEventListener(
        'dragenter',
        onDragBox,
        false
      );
      (dragBoxEl as HTMLDivElement).addEventListener(
        'dragleave',
        onDragLeaveBox,
        false
      );
      (dragBoxEl as HTMLDivElement).addEventListener(
        'dragover',
        onDragOverBox,
        false
      );
    }
    async function loadPdf() {
      if (onShowForm) {
        const fileEl = document.getElementById('upload');
        if (fileEl) {
          const file = (fileEl as HTMLInputElement).files;
          const data64: any = await toBase64((tempFile) ? tempFile : file ? file[0] : null);
          const pdfData = data64
            .toString()
            .replace('data:application/pdf;base64,', '');
          pdfView(pdfData);
          const pdfNameEl = document.getElementById('center-name-container');
          const pdfNameInputEl = document.getElementById('template-name');
          if (pdfNameEl && pdfNameInputEl) {
            (pdfNameEl as HTMLElement).innerHTML = (pdfNameInputEl as HTMLInputElement).value;
          }
        }
      }
    }

    loadPdf(); // Call Render PDF Function

    return () => {
      util.removeScript(scriptId);
      util.removeScript(scriptId);

      (dragBoxEl as HTMLDivElement).removeEventListener('drop', onDropBox);
      (dragBoxEl as HTMLDivElement).removeEventListener('dragenter', onDragBox);
      (dragBoxEl as HTMLDivElement).removeEventListener(
        'dragleave',
        onDragLeaveBox
      );
      (dragBoxEl as HTMLDivElement).removeEventListener(
        'dragover',
        onDragOverBox
      );
    };
  }, [onShowForm]);

  const onClickInputFile = () => {
    if (inputFileEl && inputFileEl.current) {
      if (!hideTemplateForm) {
        inputFileEl.current.click();
      }
    }
  };

  const toBase64 = (file: any) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });

  const pdfView = (data: any) => {
    const pdfData = atob(data);
    PdfJs.GlobalWorkerOptions.workerSrc = '/plugins/pdf/pdf.worker.js';
    const loadingTask = PdfJs.getDocument({ data: pdfData });

    console.log('loading', loadingTask);
    loadingTask.promise.then(function(pdf) {
      setPdf(pdf);
      setHideForm(true);
    });
  };

  const handleUploadDone = (file: any) => {
    tempFile = file;
    onShowCreateTemplateBtn();
    setHideTemplateForm(true);
    const inputTemplatenameEl = document.getElementById('template-name');
    const dropzoneEl = document.getElementById('dropzone-text');
    const fileName = file.name;
    const fileSize = (file.size / 1000 / 1024).toFixed(2);
    if (inputTemplatenameEl && dropzoneEl) {
      (inputTemplatenameEl as HTMLInputElement).value =
        'Template_' + file.name.replace('.pdf', '');
      (dropzoneEl as HTMLElement).innerHTML =
        'You have uploaded file <i class="far fa-file-pdf text-md"></i> <b>' +
        fileName +
        '</b> <i>(' +
        fileSize +
        'MB)</i>';
    }
  };

  const validatePdfFile = (file: any) => {
    const maxPage = 2;
    const maxSize = 25; // MB
    let error = '';
    if (file.type !== 'application/pdf') {
      error = 'Invalid Format File. Please choose pdf file';
      return error;
    }

    if (file && file.__proto__.constructor.length > maxPage) {
      error = 'Maximum page is ' + maxPage + ' pages.';
      return error;
    }

    if (file.size > maxSize * 1024 * 1000) {
      error = 'Maximum size is ' + maxSize + ' MB.';
      return error;
    }

    return;
  };

  const handleChange = async (value: any) => {
    const file = value.target.files[0];
    const error = validatePdfFile(file);
    if (error) {
      const errorEl = document.getElementById('drop-upload-error');
      if (errorEl) {
        (errorEl as HTMLElement).innerHTML =
          '<span class="error">' + error + '</span>';
      }
      return;
    }
    handleUploadDone(file);
  };

  const handleClickRemoveFile = async (value: any) => {
    window.location.reload();
  };

  const handleSaveForm = () => {
    // Do Action When Save Form Here
    console.log('You Clicked Save Form!');
  };

  const onDragBox = (event: any) => {
    event.preventDefault();
    const dragBoxEl = document.getElementById('dropzone');
    if (dragBoxEl) {
      (dragBoxEl as HTMLDivElement).classList.add('dragover');
    }
  };

  const onDragLeaveBox = (event: any) => {
    event.preventDefault();
    const dragBoxEl = document.getElementById('dropzone');
    if (dragBoxEl) {
      (dragBoxEl as HTMLDivElement).classList.remove('dragover');
    }
  };

  const onDragOverBox = (event: any) => {
    event.preventDefault();
    const dragBoxEl = document.getElementById('dropzone');
    if (dragBoxEl) {
      if ((dragBoxEl as HTMLDivElement).classList.contains('dragover')) {
        (dragBoxEl as HTMLDivElement).classList.add('dragover');
      }
    }
  };

  const onDropBox = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    const dragBoxEl = document.getElementById('dropzone');
    const inputFileEl = document.getElementById('upload');
    if (dragBoxEl && inputFileEl && !hideTemplateForm) {
      (dragBoxEl as HTMLDivElement).classList.remove('dragover');
      if (event.dataTransfer.files.length > 0) {
        // let realFile = (inputFileEl as HTMLInputElement).files;
        const files = event.dataTransfer.files;
        const error = validatePdfFile(files[0]);
        const errorEl = document.getElementById('drop-upload-error');
        if (error) {
          if (errorEl) {
            (errorEl as HTMLElement).innerHTML =
              '<span class="error">' + error + '</span>';
          }
          return;
        } else {
          if (errorEl) {
            (errorEl as HTMLElement).innerHTML = '';
          }
        }
        handleUploadDone(files[0]);
      }
    }
  };

  const indents = [];
  const leftElments = [];
  if (pdf) {
    for (let i = 1; i <= pdf.numPages; i++) {
      indents.push(<CanvasPdf key={i} pdf={pdf} scale={scale} index={i} />);
      leftElments.push(
        <Card className='hide' key={i}>
          <Accordion.Toggle as={Card.Header} eventKey={i.toString()} >
            Page {i}
          </Accordion.Toggle>
          <Accordion.Collapse eventKey={i.toString()}>
            <Card.Body></Card.Body>
          </Accordion.Collapse>
        </Card>
      );
    }
  }

  return (
    <div id='pdf-mapping'>
      <div className='row'>
        <div className='col-12'>
          <div
            className={
              hideForm || onShowForm ? 'hide' : 'drop-upload-wrapper px-4 py-3'
            }>
            <h6>CREATE A NEW TEMPLATE</h6>
            <span>
              We only accept file with PDF format, which is at most 25MB and 100
              pages.
            </span>
            <div
              id='dropzone'
              className='drop-upload-container'
              onClick={onClickInputFile}>
              <span id='dropzone-text'>
                Drop PDF template here, or click to choose a file
              </span>
            </div>
            <div id='drop-upload-error' className='drop-upload-error'></div>
            <div className='col-12 text-center'>
              <button
                className={!hideTemplateForm ? 'hide' : 'btn btn-danger'}
                onClick={handleClickRemoveFile}>
                Remove Choosed File
              </button>
            </div>
          </div>

          <div
            className={
              !hideTemplateForm || onShowForm
                ? 'hide'
                : 'drop-upload-wrapper px-4 py-3'
            }>
            <h6>TEMPLATE NAME</h6>
            <span>
              Template name is unique in system. We highly recomend you custom
              the template name so that it's meaningful and memorable.
            </span>
            <input
              type='text'
              id='template-name'
              name='templateName'
              className='form-control template-name-input'
            />
            <div className='drop-upload-error'></div>
          </div>
        </div>
      </div>

      <div className={!onShowForm ? 'hide' : 'row'}>
        <div className='top-pdf-tool'>
          <div className='left-buttons-container'>
            <div className='display-type-container'>
              <div
                className='display-type-option draw-button'
                data-tool-type='select'
                title='Pointer'>
                <i className='fas fa-mouse-pointer'></i>
              </div>

              <div
                className='display-type-option draw-button'
                data-tool-type='text'
                title='Text Input'
              >
                <i className='far fa-font'></i>
              </div>

              <div
                className='display-type-option draw-button'
                data-tool-type='number'
                title='Number Input'
              >
                <i className='fas fa-sort-numeric-up'></i>
              </div>

              <div
                className='display-type-option draw-button'
                data-tool-type='currency'
                title='Currency Input'
              >
                <i className='fas fa-dollar-sign'></i>
              </div>

              <div
                className='display-type-option draw-button'
                data-tool-type='checkbox'
                data-shape-type='square'
                title='Check Input'
              >
                <i className='fal fa-check'></i>
              </div>

              <div
                className='display-type-option draw-button'
                data-tool-type='date'
                title='Date Input'
              >
                <i className='fal fa-calendar-alt'></i>
              </div>

              <div
                className='display-type-option draw-button'
                data-tool-type='image'
                title='Image Input'
              >
                <i className='fas fa-image'></i>
              </div>

              <div
                className='display-type-option draw-button'
                data-tool-type='signature'
                title='Signature Input'
              >
                <i className='fal fa-signature'></i>
              </div>
            </div>
          </div>
          <div
            id='center-name-container'
            className='center-name-container'></div>
          <div className='right-buttons-container'>
            <div
              id='save-form'
              onClick={handleSaveForm}
              className={!hideForm ? 'hide' : 'button'}>
              <i className='far fa-save'></i>
              <span>Saved</span>
            </div>
          </div>
        </div>
      </div>

      <div className={!onShowForm ? 'hide' : 'row'}>
        <div className='side-bar-left col-2'>
          <Tabs id='element-and-dictionary' activeKey={ key } onSelect={ (k: any) => setKey(k) } >
            <Tab eventKey='element' title='Elements'>
              <Accordion id='list-page-element' defaultActiveKey='0'>
                {leftElments}
              </Accordion>
            </Tab>
            <Tab eventKey='dictionary' title='Dictionary'>
              <Card.Body>
                <i><b>List dictionary</b> is empty!</i>
              </Card.Body>
            </Tab>
          </Tabs>
        </div>
        <div className='pdf-contain col-8'>
          <form encType='multipart/form-data' className='hide'>
            <input
              type='file'
              name='file'
              id='upload'
              onChange={handleChange}
              ref={inputFileEl}
              multiple
            />
          </form>
          <div id='pdf-view' className='pdf-view' ref={pdfViewEl}>
            <div id='pdf'>{indents}</div>
          </div>
        </div>

        <div className='side-bar-right col-2'>
          <div className='group-single-input-option default-field'>
            <div className='group-title'>Field Name</div>
            <input type='text' name='fieldName' className='form-control' />
          </div>

          <div className='group-single-input-option default-field'>
            <div className='group-title'>Field Label</div>
            <input type='text' name='fieldLabel' className='form-control' />
          </div>

          {/* TEXT OPTION */}
          <div className='group-single-input-option'>
            <div className='group-title'>Default Value</div>
            <input type='text' name='defaultValue' className='form-control' />
          </div>

          <div className='group-single-input-option'>
            <div className='group-title'>Min Length</div>
            <input type='number' name='minLength' className='form-control' />
          </div>

          <div className='group-single-input-option'>
            <div className='group-title'>Max Length</div>
            <input type='number' name='maxLength' className='form-control' />
          </div>
          {/* END TEXT OPTION */}

          {/* NUMBER OPTION */}
          <div className='group-single-input-option'>
            <div className='group-title'>Min Value</div>
            <input type='number' name='minValue' className='form-control' />
          </div>

          <div className='group-single-input-option'>
            <div className='group-title'>Max Value</div>
            <input type='number' name='maxValue' className='form-control' />
          </div>

          <div className='group-single-input-option'>
            <div className='group-title'>Decimal Separator</div>
            <select name='decimalSeparator' className='form-control' disabled>
              <option value=''></option>
              <option value=','>,</option>
              <option value='.'>.</option>
            </select>
          </div>
          {/* END NUMBER OPTION */}

          {/* CURRENCY OPTION */}
          <div className='group-single-input-option'>
            <div className='group-title'>Decimal Places</div>
            <input type='number' name='decimalPlace' className='form-control' disabled />
          </div>

          <div className='group-single-input-option'>
            <div className='group-title'>Currency Units</div>
            <input type='text' name='currencyUnit' className='form-control' />
          </div>

          <div className='group-single-input-option'>
            <div className='group-title'>Display Currency Units</div>
            <select name='displayCurrency' className='form-control' disabled >
              <option value=''></option>
              <option value='before'>Before</option>
              <option value='after'>After</option>
              <option value='none'>None</option>
            </select>
          </div>
          {/* END CURRENCY OPTION */}

          {/* DATETIME OPTION */}
          <div className='group-single-input-option'>
            <div className='group-title'>Date Format</div>
            <input type='text' name='dateFormat' className='form-control' />
          </div>
          {/* END DATETIME OPTION */}

          {/* CHECKBOX OPTION */}
          <div className='group-single-checkbox-option'>
            <input type='checkbox' name='default' className='form-control' />
            <div className='group-title'>Default Check</div>
          </div>
          {/* END CHECKBOX OPTION */}

          {/* PHOTO OPTION */}
          <div className='group-single-input-option'>
            <div className='group-title'>Image Scale</div>
            <select name='imageScale' className='form-control' disabled >
              <option value=''></option>
              <option value='fit'>Fit</option>
              <option value='center'>Center</option>
              <option value='full'>Full</option>
            </select>
          </div>
          {/* END PHOTO OPTION */}

          {/* SIGNATURE OPTION */}
          <div className='group-single-input-option'>
            <div className='group-title'>Scale Gravity</div>
            <div className='group-gravity'>
              <div className='custom-gravity-item'>
                <input className='gravity-item' type='radio' name='scaleGravity' value='top-left'/>
                <div className='check-mark'></div>
              </div>
              <div className='custom-gravity-item'>
                <input className='gravity-item' type='radio' name='scaleGravity' value='top' />
                <div className='check-mark'></div>
              </div>
              <div className='custom-gravity-item'>
                <input className='gravity-item' type='radio' name='scaleGravity' value='top-right' />
                <div className='check-mark'></div>
              </div>
              <br />
              <div className='custom-gravity-item'>
                <input className='gravity-item' type='radio' name='scaleGravity' value='left' />
                <div className='check-mark'></div>
              </div>
              <div className='custom-gravity-item'>
                <input className='gravity-item' type='radio' name='scaleGravity' value='center' />
                <div className='check-mark'></div>
              </div>
              <div className='custom-gravity-item'>
                <input className='gravity-item' type='radio' name='scaleGravity' value='right' />
                <div className='check-mark'></div>
              </div>
              <br />
              <div className='custom-gravity-item'>
                <input className='gravity-item' type='radio' name='scaleGravity' value='bottom-left' />
                <div className='check-mark'></div>
              </div>
              <div className='custom-gravity-item'>
                <input className='gravity-item' type='radio' name='scaleGravity' value='bottom' />
                <div className='check-mark'></div>
              </div>
              <div className='custom-gravity-item'>
                <input className='gravity-item' type='radio' name='scaleGravity' value='bottom-right' />
                <div className='check-mark'></div>
              </div>
            </div>
          </div>
          {/* END SIGNATURE OPTION */}

          <div className='group-single-checkbox-option'>
            <input type='checkbox' name='require' className='form-control' />
            <div className='group-title'>Required</div>
          </div>

          <div className='group-single-checkbox-option'>
            <input type='checkbox' name='multiline' className='form-control' />
            <div className='group-title'>Multiline</div>
          </div>

          <hr/>

          {/* SAME OPTION */}
          <div className='group-title'>POSITION</div>

          <div className='group-input-option'>
            <div className='label-input-option'>
              X
            </div>
            <div className='input-option'>
              <input type='number' name='x' className='form-control' />
            </div>
          </div>

          <div className='group-input-option'>
            <div className='label-input-option'>
              Y
            </div>
            <div className='input-option'>
              <input type='number' name='y' className='form-control' />
            </div>
          </div>

          <br/>
          <div className='group-title'>SIZE</div>

          <div className='group-input-option'>
            <div className='label-input-option'>
              Width
            </div>
            <div className='input-option'>
              <input type='number' name='width' className='form-control' />
            </div>
          </div>

          <div className='group-input-option'>
            <div className='label-input-option'>
              Height
            </div>
            <div className='input-option'>
              <input type='number' name='height' className='form-control' />
            </div>
          </div>

          <br/>
          <div className='group-title'>RENDER ORDER</div>
          <input type='number' name='renderOrder' className='form-control' />

          <hr />
          <button className='btn btn-danger remove-field-btn'>
          <i className='fas fa-trash-alt'></i> Remove This Field
          </button>
          {/* END SAME OPTION */}
        </div>
      </div>
    </div>
  );
};

export default PdfMapping;
