// @flow strict
// $FlowFixMe
import React, { useContext } from 'react';
import { makeStyles } from 'styles';

import { PolyhedronContext } from 'components/Viewer/context';

import { andaleMono } from 'styles/fonts';
import { hover } from 'styles/common';
import TransitionContext from '../context/TransitionContext';

const styles = makeStyles({
  buttons: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    columnGap: 10,
  },
  resetButton: {
    alignSelf: 'end',
    backgroundColor: 'white',
    border: '1px LightGray solid',
    height: 40,
    padding: 10,
    fontSize: 14,
    fontFamily: andaleMono,
    ...hover,
  },
});

export default function ResizeButtons() {
  const { polyhedron, setPolyhedron } = useContext(PolyhedronContext);
  const { isTransitioning } = useContext(TransitionContext);
  return (
    <div className={styles('buttons')}>
      <button
        disabled={isTransitioning}
        onClick={() => setPolyhedron(polyhedron.center())}
        className={styles('resetButton')}
      >
        Recenter
      </button>
      <button
        disabled={isTransitioning}
        onClick={() => setPolyhedron(polyhedron.normalizeToVolume(5))}
        className={styles('resetButton')}
      >
        Resize
      </button>
    </div>
  );
}
