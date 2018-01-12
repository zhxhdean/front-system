import React from 'react';
import { Redirect} from 'react-router-dom';
import login from '../service/login';

const PrivateRoute = (Component) => {
  class AuthenticatedComponent extends Component {
    constructor(props){
      super(props)
      this.state = {
        isLogined: false,
        isChecked: false
      }
    }
    componentDidMount() {
      console.log('Didmount')
      this.checkAuth();
    }
    checkAuth(){
      login
      .valid_token()
      .then(rsp => {
        if (rsp) {
          this.setState({isLogined: true, isChecked: true})
        } else {
          this.setState({isLogined: false, isChecked: true})
        }
      })
    }

    render() {
      if(!this.state.isChecked) {
        return null;
      }
      return this.state.isLogined
        ? (<Component {...this.props}/>)
        : (<Redirect
          to={{
          pathname: '/login',
          state: {
            from: this.props.location
          }
        }}/>)

    }
  }
  return AuthenticatedComponent;
}

export default PrivateRoute;
