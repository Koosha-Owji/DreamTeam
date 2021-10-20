import React from "react";
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';

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
            <div style={{backgroundImage:"url(https://source.unsplash.com/9BJRGlqoIUk)", height:"100%",
             backgroundPosition:"center", backgroundRepeat:"no-repeat", backgroundSize:"cover" }}>
            <h2>Something went wrong.</h2>
            <details style={{ whiteSpace: 'pre-wrap' }}>
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo.componentStack}
            </details>
            <div style={{padding:"100px"}}>
            <Button variant="text" style={{padding:"10px", fontSize:"large"}} href="/home">Click me to return home</Button>
            </div>
          </div>
        );
      }
      // Normally, just render children
      return this.props.children;
    }  
  }
export default withRouter(ErrorBoundary);