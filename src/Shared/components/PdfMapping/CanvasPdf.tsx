import * as React from 'react';
import './CanvasPdf.scss';
import { CanvasProps } from './types';

const CanvasPdf = (props: CanvasProps) => {
  const [status, setStatus] = React.useState<string>('N/A');
  const [canvas, setCanvas] = React.useState<any>(null);
  const [page, setPage] = React.useState<null | number>(null);

  const _loadPage = (pdf: any) => {
    if (status === 'rendering' || page !== null) return;
    pdf.getPage(props.index).then((page: any) => {
      setStatus('rendering');
      _renderPage(page);
    });
  };

  const _update = (pdf: any) => {
    if (pdf) {
      _loadPage(pdf);
    } else {
      setStatus('loading');
    }
  };

  const setCanvasRef = (canvas: any) => {
    setCanvas(canvas);
  };

  const _renderPage = (page: any) => {
    const { scale } = props;
    let viewport = page.getViewport(scale);
    let { width, height } = viewport;
    const wrapperPdfEl = document.getElementById('pdf-view');
    const scaleRate = wrapperPdfEl ? (wrapperPdfEl.offsetWidth / width) : 1;
    const elementPdf = document.getElementById('pdf');
    if (elementPdf) {
      elementPdf.setAttribute('data-scale', scaleRate.toString());
    }
    viewport = page.getViewport({scale: scaleRate});
    width = viewport.width;
    height = viewport.height;
    if (canvas) {
      const context = canvas.getContext('2d');
      canvas.width = width;
      canvas.height = height;

      page.render({
        canvasContext: context,
        viewport
      });

      setStatus('rendered');
      setPage(page);
    }
  };

  React.useEffect(() => {
    _update(props.pdf);
  }, [canvas]);

  return (
    <canvas ref={setCanvasRef}></canvas>
  );
};

export default (CanvasPdf);
