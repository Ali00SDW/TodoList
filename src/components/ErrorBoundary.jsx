import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  // ❌⭕⛔‼️
  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            fontFamily: "ui-serif",
            color: "#f3f3f3c5",
            fontWeight: "bold",
            borderRadius: "5px",
          }}
        >
          <h1>" Something went wrong! "</h1>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
