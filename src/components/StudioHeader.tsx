import {useCallback, useState} from 'react';

const StudioHeader = (props: any) => {
  const [loading, setLoading] = useState<'start' | 'stop'>();

  const startPreview = useCallback(async () => {
    if (!!loading) {
      return;
    }
    setLoading('start');
    fetch('/api/preview')
      .then(() =>
        alert(
          'Modalità preview attivata,aggiorna la schermata del blog per vedere anche i posts non ancora pubblicati'
        )
      )
      .catch((e) => {
        console.error(e);
        alert('Errore attivazione modalità preview, riprovare.');
      })
      .finally(() => setLoading(undefined));
  }, [loading]);

  const stopPreview = useCallback(async () => {
    if (!!loading) {
      return;
    }
    setLoading('stop');
    fetch('/api/exit-preview')
      .then(() =>
        alert(
          'Modalità preview disattivata, aggiorna la schermata del blog per vedere solo i posts pubblicati'
        )
      )
      .catch((e) => {
        console.error(e);
        alert('Errore disattivazione modalità preview, riprovare.');
      })
      .finally(() => setLoading(undefined));
  }, [loading]);

  return (
    <>
      <div className="flex justify-between px-5 py-2.5">
        <button onClick={startPreview}>
          {loading === 'start' ? 'Wait...' : 'Start preview mode'}
        </button>
        <button onClick={stopPreview}>
          {loading === 'stop' ? 'Wait...' : 'Stop preview mode'}
        </button>
      </div>
      {props.renderDefault(props)}
    </>
  );
};

export default StudioHeader;
