import React from "react";
import Context from "./Context";

let nextIndex = 0;

export default function createWorkspace(defaultState) {
  const initialState = Object.assign({}, defaultState);
  const key = nextIndex++;

  class Workspace extends React.PureComponent {
    static getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps.state === prevState.state) return null;
      return { state: nextProps.state };
    }

    state = {
      state: initialState,
      setState: updater => {
        this.props.setState(({ workspaces }) => {
          const workspace = { ...workspaces[key] };

          if (!workspace.size) {
            return null;
          }

          const nextState =
            typeof updater === "function" ? updater(workspace.state) : updater;

          if (nextState === null) {
            return null;
          }

          workspace.state = Object.assign({}, workspace.state, nextState);

          return {
            workspaces: {
              ...workspaces,
              [key]: workspace
            }
          };
        });
      }
    };

    componentDidMount() {
      this.props.setState(({ workspaces }) => {
        const workspace = workspaces[key]
          ? { ...workspaces[key] }
          : { state: this.state.state, size: 0 };

        workspace.size += 1;

        return {
          workspaces: {
            ...workspaces,
            [key]: workspace
          }
        };
      });
    }

    componentWillUnmount() {
      this.props.setState(({ workspaces }) => {
        const workspace = { ...workspaces[key] };

        workspace.size -= 1;

        if (!workspace.size) {
          return {
            workspaces: {
              ...workspaces,
              [key]: undefined
            }
          };
        }

        return {
          workspaces: {
            ...workspaces,
            [key]: workspace
          }
        };
      });
    }

    render() {
      return this.props.children(this.state);
    }
  }

  function WorkspaceWrapper(props) {
    return (
      <Context.Consumer>
        {context => (
          <Workspace
            {...props}
            state={
              context.workspaces[key]
                ? context.workspaces[key].state
                : initialState
            }
            setState={context.setState}
          />
        )}
      </Context.Consumer>
    );
  }

  return WorkspaceWrapper;
}
