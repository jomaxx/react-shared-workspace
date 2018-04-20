# react-shared-workspace

## Install

```bash
yarn add react react-shared-workspace
```

## Usage

```jsx
import React from "react";
import ReactDOM from "react-dom";
import { Workspaces, createWorkspace } from "react-shared-workspace";

// provide initial state to workspace
const Workspace = createWorkspace({
  count: 0
});

function Counter() {
  return <Workspace>{({ state }) => <span>{state.count}</span>}</Workspace>;
}

function IncrementButton() {
  return (
    <Workspace>
      {({ setState }) => (
        <button
          onClick={() => {
            setState(state => ({
              count: state.count + 1
            }));
          }}
        >
          Up
        </button>
      )}
    </Workspace>
  );
}

function DecrementButton() {
  return (
    <Workspace>
      {({ setState }) => (
        <button
          onClick={() => {
            setState(state => ({
              count: state.count - 1
            }));
          }}
        >
          Down
        </button>
      )}
    </Workspace>
  );
}

function App() {
  return (
    <Workspaces>
      <Counter />
      <IncrementButton />
      <DecrementButton />
    </Workspaces>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
```
