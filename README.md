# react-shared-workspace

Share state across siblings!

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

## How it works?

The `Workspaces` component stores all the state so put it high up in the react tree. `createWorkspace` returns a `Workspace` component whose state is linked across all of it's instances. When all instances of `Workspace` unmount, the state for that workspace is cleaned up.
