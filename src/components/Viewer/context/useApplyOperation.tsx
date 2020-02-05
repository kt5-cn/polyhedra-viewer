import _ from 'lodash';

import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Operation, Options } from 'math/operations';
import { Polyhedron } from 'math/polyhedra';
import { escapeName } from 'math/polyhedra/names';
import PolyhedronCtx from './PolyhedronCtx';
import OperationCtx from './OperationCtx';
import TransitionCtx from './TransitionCtx';

type ResultCallback = (polyhedron: Polyhedron) => void;

export default function useApplyOperation() {
  const history = useHistory();
  const { setOperation, unsetOperation } = OperationCtx.useActions();
  const polyhedron = PolyhedronCtx.useState();
  const transition = TransitionCtx.useTransition();

  const applyOperation = useCallback(
    (
      operation: Operation,
      options: Options = {},
      callback?: ResultCallback,
    ) => {
      if (!operation) throw new Error('no operation defined');

      const { result, animationData } = operation.apply(polyhedron, options);

      if (!operation.hasOptions(result) || _.isEmpty(options)) {
        unsetOperation();
      } else {
        setOperation(operation, result);
      }

      transition(result, animationData);
      history.push(`/${escapeName(result.name)}/operations`);
      if (typeof callback === 'function') {
        callback(result);
      }
    },
    [polyhedron, history, transition, setOperation, unsetOperation],
  );

  return applyOperation;
}
