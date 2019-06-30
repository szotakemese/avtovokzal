import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import styled from "styled-components";

const Admin = styled.section`
    position: absolute;
    top:10px;
    right:10px;
    height:30px:
    width:60px;
`
const Lang = styled.section`
    position: absolute;
    top:10px;
    left:10px;
    height:30px:
    width:60px;
`

const ContainerBig = styled.section`
    position: absolute;
    background: #7fd8b8;
    height:754px;
    width: 1536px;
    text-align: center;
    top: -50px;
    left: -388px;
`
const ContainerSmall = styled.section`
    color: #0e2b21;
    width: 300px;
    position: relative;
    left: 600px;
    padding: 10px;
` 

const Wrapper = styled.section`
    padding-left:20px;
    padding-right:20px;
    padding-top: 100px;
    color: #0e2b21;
    font-family:sans-serif;
    z-index:10;
`;

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.dispatch(userActions.logout());

        this.state = {
            username: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ 
            submitted: true
        });
        const { username, password} = this.state;
        const { dispatch } = this.props;
        if (username && password) {
            dispatch(userActions.login(username, password));
        }
    }

    render() {
        const { loggingIn } = this.props;
        const { username, password, submitted } = this.state;
        return (
            <ContainerBig>
                <Admin>
                    <Link to="/admin">
                        <button className="btn btn-outline-success">Admin</button>
                    </Link>
                </Admin>
                <Lang>
                <Link to="/loginUA">
                        <button className="btn btn-outline-success">UA</button>
                    </Link>
                </Lang>
                <Wrapper>
                <h2>L O G I N</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <ContainerSmall>
                    <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} />
                        {submitted && !username &&
                            <div className="help-block">Username is required</div>
                        }
                    </div>
                    </ContainerSmall>
                    <ContainerSmall>
                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                        {submitted && !password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                    </ContainerSmall>
                    
                    
                    <div className="form-group">
                        <button className="btn btn-success">Login</button><br/>
                        {loggingIn &&
                            <img alt="#" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                        <p>Not registered yet?</p>
                        <Link to="/register">
                        <button className="btn btn-outline-success">Register</button>
                        </Link>
                    </div>
                </form>
                </Wrapper>
            </ContainerBig>
        );
    }
}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage }; 