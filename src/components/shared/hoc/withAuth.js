import React from "react";
import authService from "services/authService";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import userActions from "store/actions/userActions";

/* withAuth is a Higher Order Component 
- function, which returns component with mutated props, etc. 
- in this example we check if there is logged in user before rendering component 
*/

export default function withAuth(Component) {
  class WrappedComponent extends React.Component {
    componentDidMount() {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        this.redirectToLogin();
      } else {
        const { user } = JSON.parse(storedUser);
        const token = user.token;
        authService
          .auth({ token })
          .then(res => res.data)
          .then(res => {
            if (res.success) {
              this.setLocalUserToRedux();
            } else {
              this.redirectToLogin();
            }
          })
          .catch(err => {
            console.error(err);
          });
      }
    }

    setLocalUserToRedux = () => {
      const localUser = localStorage.getItem("user");
      if (localUser) {
        this.props.login(JSON.parse(localUser).user);
      }
    };

    redirectToLogin = () => {
      this.props.history.push("/login");
    };

    render() {
      return <Component {...this.props} />;
    }
  }

  const mapDispatchToProps = { login: userActions.login };
  /* należy obydwa argumenty zadeklarować, standardowo funkcja connect, która jest pobierana z biblioteki react-redux, 
przyjmuje dwa argumenty mapStateToProps (czyli przekazywanie do propsów rzeczy z reduxowego store), 
a druga to mapDispatchToProps (czyli przekazywanie do propsów funkcji, 
  które pozwalają zmienić stan reduxowego store), 
  (nie trzeba ich używać jednocześnie ale jeśli chcemy użyć tylko mapDispatchToProps to w miejsce pierwszego argumentu trzeba wstawić null, 
    w drugim wypadku nie trzeba niczego dodawać)
*/
  return connect(null, mapDispatchToProps)(withRouter(WrappedComponent));
}
