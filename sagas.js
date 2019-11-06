import { put, takeEvery, all } from "redux-saga/effects";

const delay = ms => new Promise(res => setTimeout(res, ms));
// Our worker Saga: 将执行异步的 increment 任务
export function* incrementAsync() {
  yield delay(1000);
  yield put({ type: "INCREMENT" });
}

export function* helloSaga() {
  console.log("Hello Sagas!");
}

// Our watcher Saga: 在每个 INCREMENT_ASYNC action spawn 一个新的 incrementAsync 任务
export function* watchIncrementAsync() {
  yield takeEvery("INCREMENT_ASYNC", incrementAsync);
}

export default function* rootSaga() {
  yield all([helloSaga(), watchIncrementAsync()]);
}
