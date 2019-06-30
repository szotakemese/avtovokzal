import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import styled from "styled-components";

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
    height: 835px;
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

const Err = styled.section`
    color: red;
    font-size:14px;
`

class RegisterPageUA extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                firstName: '',
                lastName: '',
                fatherName: '',
                username: '',
                password: ''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        const { dispatch } = this.props;

        let error_log = "";
        error_log += new RegExp("^[a-zA-Z]+$","g").test(user.lastName) ? "" : " Прізвище може містити тільки букви англійської альфавіту! ";
        error_log += new RegExp("^[a-zA-Z]+$","g").test(user.firstName) ? "" : " Ім'я може містити тільки букви англійської альфавіту! ";
        error_log += new RegExp("^[a-zA-Z]+$","g").test(user.fatherName) ? "" : " По-батькові може містити тільки букви англійської альфавіту! ";

        if (error_log.length !== 0) {
            let errorMessage = "Error : "+error_log;
            this.refs.err.innerText = errorMessage

        } 
        else if (user.firstName && user.lastName && user.fatherName && user.username && user.password) {
            dispatch(userActions.register(user));
        }
    }

    render() {
        const { registering  } = this.props;
        const { user, submitted } = this.state;
        return (
            <ContainerBig>
                <Lang>
                <Link to="/register">
                        <button className="btn btn-outline-success">UA</button>
                    </Link>
                </Lang>
                <Wrapper>
                <h2>Р Е Є С Т Р А Ц І Я</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                <ContainerSmall>
                    <div className={'form-group' + (submitted && !user.lastName ? ' has-error' : '')}>
                        <label htmlFor="lastName">Прізвище</label>
                        <input type="text" className="form-control" name="lastName" value={user.lastName} onChange={this.handleChange} />
                        {submitted && !user.lastName &&
                            <div className="help-block">Прізвище потрібно</div>
                        }
                    </div>
                </ContainerSmall>
                <ContainerSmall>
                    <div className={'form-group' + (submitted && !user.firstName ? ' has-error' : '')}>
                        <label htmlFor="firstName">Ім'я</label>
                        <input type="text" className="form-control" name="firstName" value={user.firstName} onChange={this.handleChange} />
                        {submitted && !user.firstName &&
                            <div className="help-block">Ім'я потрібно</div>
                        }
                    </div>
                </ContainerSmall>
                <ContainerSmall>
                    <div className={'form-group' + (submitted && !user.fatherName ? ' has-error' : '')}>
                        <label htmlFor="lastName">По-батькові</label>
                        <input type="text" className="form-control" name="fatherName" value={user.fatherName} onChange={this.handleChange} />
                        {submitted && !user.fatherName &&
                            <div className="help-block">По-батькові потрібно</div>
                        }
                    </div>
                </ContainerSmall>
                <ContainerSmall>
                    <div className={'form-group' + (submitted && !user.username ? ' has-error' : '')}>
                        <label htmlFor="username">Логін</label>
                        <input type="text" className="form-control" name="username" value={user.username} onChange={this.handleChange} />
                        {submitted && !user.username &&
                            <div className="help-block">Логін потрібен</div>
                        }
                    </div>
                </ContainerSmall>
                <ContainerSmall>
                    <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
                        <label htmlFor="password">Пароль</label>
                        <input type="password" className="form-control" name="password" value={user.password} onChange={this.handleChange} />
                        {submitted && !user.password &&
                            <div className="help-block">Пароль потрібен</div>
                        }
                    </div>
                </ContainerSmall>
                <Err><div ref="err"></div></Err>
                    <div className="form-group">
                        <button className="btn btn-success">Реєстрація</button>
                        {registering && 
                            <img alt="#" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                        <Link to="/loginUA">
                        <button className="btn btn-outline-success">Назад</button>
                        </Link>
                    </div>
                </form>
                </Wrapper>
            </ContainerBig>
        );
    }
}

function mapStateToProps(state) {
    const { registering } = state.registration;
    return {
        registering
    };
}

const connectedRegisterPageUA = connect(mapStateToProps)(RegisterPageUA);
export { connectedRegisterPageUA as RegisterPageUA };