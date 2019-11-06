import "babel-polyfill";

import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";

// import { helloSaga } from "./sagas";
import rootSaga from "./sagas";
import Counter from "./Counter";
import reducer from "./reducers";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  compose(
    applyMiddleware(sagaMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

sagaMiddleware.run(rootSaga);

const action = type => store.dispatch({ type });

function render() {
  ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrementAsync={() => action("INCREMENT_ASYNC")}
      onIncrement={() => action("INCREMENT")}
      onDecrement={() => action("DECREMENT")}
    />,
    document.getElementById("root")
  );
}

render();
store.subscribe(render);
