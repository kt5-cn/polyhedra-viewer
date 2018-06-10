// @flow
import React from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';

import { Options, ResizeButtons } from '../common';
import OpList from './OpList';

const styles = StyleSheet.create({
  opPanel: {
    height: '100%',
    padding: '0 10px',
    display: 'flex',
    flexDirection: 'column',
    pointerEvents: 'none',
  },

  resizeButtons: {
    marginBottom: 'auto',
    pointerEvents: 'initial',
  },

  opGrid: {
    width: '100%',
    marginTop: 'auto',
    pointerEvents: 'initial',
  },
});

// FIXME disable on transition
export default function OperationsPanel({ solid }: *) {
  return (
    <section className={css(styles.opPanel)}>
      <div className={css(styles.resizeButtons)}>
        <ResizeButtons />
        <Options solid={solid} />
      </div>
      <div className={css(styles.opGrid)}>
        <OpList />
      </div>
    </section>
  );
}