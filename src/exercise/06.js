// Context Module Functions
// http://localhost:3000/alone/exercise/06.js

import * as React from 'react'
import CheckBox from '../checkbox'

// 🐶 Note : Le module commun  './06/context-counter' exporte 'context-counter-changed.js' et 'context-counter-general.js'
import {
  CounterProvider,
  CounterChangedProvider,
  useCounterChanged,
  useCounter,
  decrement,
  increment,
  reset
} from './06/context-counter'

function Counter() {
  const [state, dispatch] = useCounter()
  const [stateCounterChange, dispatchCounterChanged] = useCounterChanged()
  const resetAll =() => {
    reset(dispatch)
    reset(dispatchCounterChanged)
  }
  return (
    <div>
      <div>Compteur : {state.count}</div>
      <div>Compteur changed : {stateCounterChange.count}</div>
      <button onClick={() => decrement(dispatch)}>-</button>
      <button onClick={() => increment(dispatchCounterChanged)}>+</button>
      <button onClick={resetAll}>reset All</button>
    </div>
  )
}

function TwoCheckbox() {
  const [, dispatch] = useCounter()
  const [, dispatchCounterChanged] = useCounterChanged()
  return (
    <div>
      <CheckBox onChange={() => increment(dispatch)} />
      <CheckBox onChange={() => decrement(dispatchCounterChanged)} />
    </div>
  )
}

function App() {
  return (
    <CounterProvider>
      <CounterChangedProvider>
      <Counter />
      <TwoCheckbox />
      </CounterChangedProvider>
    </CounterProvider>
  )
}

export default App
