import { Component } from "react";
import * as Updates from "expo-updates";
import ErrorPlaceholder from "./error-placeholder";

class ErrorBoundary extends Component<
  {
    children: JSX.Element | JSX.Element[];
    fallback?: JSX.Element | JSX.Element[];
  },
  { hasError: boolean; error: any }
> {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: {} };
  }

  static getDerivedStateFromError(error) {
    console.log({ error });
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.log({ error, errorInfo });
    if (!__DEV__) {
      //TODO send crash report
    }
    this.setState({ hasError: true, error });
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <ErrorPlaceholder
            title="Something went wrong"
            description="Sorry about that, you can report a bug by taking a screenshot or
                try to refresh the app"
            buttonTitle="Refresh"
            onPress={async () => {
              try {
                await Updates.reloadAsync();
              } catch (error) { }
            }}
          />
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
