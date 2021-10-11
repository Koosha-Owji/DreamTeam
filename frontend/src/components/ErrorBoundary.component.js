import React, {Component} from "react";
import Link from '@material-ui/core/Link';
import { withRouter } from 'react-router-dom'

class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { error: null, errorInfo: null };
    }
    
    componentDidCatch(error, errorInfo) {
      // Catch errors in any components below and re-render with error message
      this.setState({
        error: error,
        errorInfo: errorInfo
      })
      // You can also log error messages to an error reporting service here
    }
    

    render() {
      if (this.state.errorInfo) {
        // Error path
        return (
            <div style={{backgroundImage:"url(https://source.unsplash.com/9BJRGlqoIUk)"}}>
            <h2>Something went wrong.</h2>
            <details style={{ whiteSpace: 'pre-wrap' }}>
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo.componentStack}
            </details>
            <Link href="/home">Go Back</Link>
          </div>
        );
      }
      // Normally, just render children
      return this.props.children;
    }  
  }
export default withRouter(ErrorBoundary);