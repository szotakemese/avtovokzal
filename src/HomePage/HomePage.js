import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import styled from "styled-components";

const ForText = styled.section`
    font-weight: bold;
    font-size: 20px;
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
const ContainerTable = styled.section`
    width: 600px;
    position: relative;
    left: 450px;
    padding: 10px;
` 

const Wrapper = styled.section`
    padding-left:20px;
    padding-right:20px;
    padding-top: 30px;
    color: #0e2b21;
    font-family:sans-serif;
    z-index:10;
`;

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            destination: '',
            schedule:{
                uzh: {
                    startPlace: ['Tchop', 'Mukachevo', 'Vynogradiv', 'Mukachevo', 'Chernivtsi'],
                    timeStart:['12:30', '15:15', '18:35', '18:35', '20:00'],
                    timeFinal:['13:15', '16:20', '20:50', '19:40', '02:35'],
                    cost:[35, 52, 89, 52, 213.2],
                    dist : [30, 50, 110, 50, 450]

                },
                muk: {
                    startPlace: ['Uzhgorod', 'Svalyava', 'Berehove'],
                    timeStart:['9:30', '16:00', '16:35'],
                    timeFinal:['10:45', '16:55', '17:40'],
                    cost:[52, 44.5, 35.5],
                    dist : [50, 20, 35]
                },
                khust: {
                    startPlace: ['Vynogradiv', 'Uzhgorod'],
                    timeStart:['11:20', '19:15'],
                    timeFinal:['13:15', '22:20'],
                    cost:[62, 113.4],
                    dist : [25, 105]
                },
                vin: {
                    startPlace: ['Uzhgorod', 'Tiachiv', 'Berehove'],
                    timeStart:['9:30', '11:30', '16:00'],
                    timeFinal:['11:55', "13:20", '17:45'],
                    cost:[89, 63.15, 52.5],
                    dist : [95, 60, 35]
                }
            },
            submitted: false
        };
    }


    componentDidMount() {
        this.props.dispatch(userActions.getAll());
    }

    handleChange=()=>{
        this.setState({
            destination: this.refs.loc.value,
            submitted: true
        });
    }

    handleSelect=()=>{
        if(this.refs.loc.value === 'uzh'){
            this.setState({
                destination: 'uzh'
            });
            document.getElementById("tableHere").innerHTML = " ";
            document.getElementById("tableHere").innerHTML += "<table class='table table-bordered'><tr><td><b> Departure place </b></td><td><b> Departure time </b></td><td><b> Arrival time </b></td><td><b> Cost </b></td></tr>"+this.state.schedule.uzh.startPlace.map((el, i )=>("<tr><td>"+el+"</td><td>"+this.state.schedule.uzh.timeStart[i]+"</td><td>"+this.state.schedule.uzh.timeFinal[i]+"</td><td>"+this.state.schedule.uzh.cost[i]+"</td></tr>"))+"</table>"
            document.getElementById("dest").innerText = 'TO UZHGOROD'

        }
        else if(this.refs.loc.value === 'muk'){
            this.setState({
                destination: 'muk'
            });
            document.getElementById("tableHere").innerHTML = " ";
            document.getElementById("tableHere").innerHTML += "<table class='table table-bordered'><tr><td><b> Departure place </b></td><td><b> Departure time </b></td><td><b> Arrival time </b></td><td><b> Cost </b></td></tr>"+this.state.schedule.muk.startPlace.map((el, i )=>("<tr><td>"+el+"</td><td>"+this.state.schedule.muk.timeStart[i]+"</td><td>"+this.state.schedule.muk.timeFinal[i]+"</td><td>"+this.state.schedule.muk.cost[i]+" </td></tr>"))+"</table>"
            document.getElementById("dest").innerText = 'TO MUKACHEVO'
        }
        else if(this.refs.loc.value === 'khust'){
            this.setState({
                destination: 'khust'
            });
            document.getElementById("tableHere").innerHTML = " ";
            document.getElementById("tableHere").innerHTML += "<table class='table table-bordered'><tr><td><b> Departure place </b></td><td><b> Departure time </b></td><td><b> Arrival time </b></td><td><b> Cost </b></td></tr>"+this.state.schedule.khust.startPlace.map((el, i )=>("<tr><td>"+el+"</td><td>"+this.state.schedule.khust.timeStart[i]+"</td><td>"+this.state.schedule.khust.timeFinal[i]+"</td><td>"+this.state.schedule.khust.cost[i]+"</td></tr>"))+"</table>"
            document.getElementById("dest").innerText = 'TO KHUST'
        }
        else if(this.refs.loc.value === 'vin'){
            this.setState({
                destination: 'vin'
            });
            document.getElementById("tableHere").innerHTML = " ";
            document.getElementById("tableHere").innerHTML += "<table class='table table-bordered'><tr><td><b> Departure place </b></td><td><b> Departure time </b></td><td><b> Arrival time </b></td><td><b> Cost </b></td></tr>"+this.state.schedule.vin.startPlace.map((el, i )=>("<tr><td>"+el+"</td><td>"+this.state.schedule.vin.timeStart[i]+"</td><td>"+this.state.schedule.vin.timeFinal[i]+"</td><td>"+this.state.schedule.vin.cost[i]+"</td></tr>"))+"</table>"
            document.getElementById("dest").innerText = 'TO  VINOGRADIV'
        }
    }

    handleFilter=()=>{
        if (this.refs.filter.value === 'shortest'){
            if(this.state.destination === 'uzh'){
                let minItem = Math.min(...this.state.schedule.uzh.dist);
                let minIndex = this.state.schedule.uzh.dist.indexOf(minItem);
                document.getElementById('shortest').innerHTML = '';
                document.getElementById('shortest').innerHTML += 'The shortest rout is : '+this.state.schedule.uzh.startPlace[minIndex]+' - Uzhgorod ('+ this.state.schedule.uzh.timeStart[minIndex] +')';
            }
            else if(this.state.destination === 'muk'){
                let minItem = Math.min(...this.state.schedule.muk.dist);
                let minIndex = this.state.schedule.muk.dist.indexOf(minItem);
                document.getElementById('shortest').innerHTML = '';
                document.getElementById('shortest').innerHTML += 'The shortest rout is : '+this.state.schedule.muk.startPlace[minIndex]+' - Mukachevo ('+ this.state.schedule.muk.timeStart[minIndex] +')';
            }
            else if(this.state.destination === 'khust'){
                let minItem = Math.min(...this.state.schedule.khust.dist);
                let minIndex = this.state.schedule.khust.dist.indexOf(minItem);
                document.getElementById('shortest').innerHTML = '';
                document.getElementById('shortest').innerHTML += 'The shortest rout is : '+this.state.schedule.khust.startPlace[minIndex]+' - Khust ('+ this.state.schedule.khust.timeStart[minIndex] +')';
            }
            else if(this.state.destination === 'vin'){
                let minItem = Math.min(...this.state.schedule.vin.dist);
                let minIndex = this.state.schedule.vin.dist.indexOf(minItem);
                document.getElementById('shortest').innerHTML = '';
                document.getElementById('shortest').innerHTML += 'The shortest rout is : '+this.state.schedule.vin.startPlace[minIndex]+' - Vynogradiv ('+ this.state.schedule.vin.timeStart[minIndex] +')';
            }
        }

        else if (this.refs.filter.value === 'cheapest'){
            if(this.state.destination === 'uzh'){
                let minItem = Math.min(...this.state.schedule.uzh.cost);
                let minIndex = this.state.schedule.uzh.cost.indexOf(minItem);
                document.getElementById('shortest').innerHTML = '';
                document.getElementById('shortest').innerHTML += 'The cheapest rout is : '+this.state.schedule.uzh.startPlace[minIndex]+' - Uzhgorod ('+ this.state.schedule.uzh.cost[minIndex] +'  UAH)';
            }
            else if(this.state.destination === 'muk'){
                let minItem = Math.min(...this.state.schedule.muk.cost);
                let minIndex = this.state.schedule.muk.cost.indexOf(minItem);
                document.getElementById('shortest').innerHTML = '';
                document.getElementById('shortest').innerHTML += 'The cheapest rout is : '+this.state.schedule.muk.startPlace[minIndex]+' - Mukachevo ('+ this.state.schedule.muk.cost[minIndex] +' UAH)';
            }
            else if(this.state.destination === 'khust'){
                let minItem = Math.min(...this.state.schedule.khust.cost);
                let minIndex = this.state.schedule.khust.cost.indexOf(minItem);
                document.getElementById('shortest').innerHTML = '';
                document.getElementById('shortest').innerHTML += 'The cheapest rout is : '+this.state.schedule.khust.startPlace[minIndex]+' - Khust ('+ this.state.schedule.khust.cost[minIndex] +' UAH)';
            }
            else if(this.state.destination === 'vin'){
                let minItem = Math.min(...this.state.schedule.vin.cost);
                let minIndex = this.state.schedule.vin.cost.indexOf(minItem);
                document.getElementById('shortest').innerHTML = '';
                document.getElementById('shortest').innerHTML += 'The cheapest rout is : '+this.state.schedule.vin.startPlace[minIndex]+' - Vynogradiv ('+ this.state.schedule.vin.cost[minIndex] +' UAH)';
            }

        }
        
        
    }

    render() {
        const { user } = this.props;
        return (
            <ContainerBig>
                
                <Wrapper>
                    <div class="alert alert-light" role="alert">
                        <h3>Welcome {user.firstName}!</h3>
                        <Link to="/login">
                            <button className="btn btn-outline-success">Logout</button>
                        </Link>
                    </div>  
                    <ContainerSmall>
                    <div class="form-group">
                            <label htmlFor="select" for="destination"> Select the destination: </label>
                            <select required="required" class="form-control" id="destination" name="destination" ref="loc" onChange={this.handleChange} onClick={this.handleSelect}>
                                <option value='uzh'>Uzhgorod</option>
                                <option value="muk">Mukachevo</option>
                                <option value="khust">Khust</option>
                                <option value="vin">Vinogradiv</option>
                            </select>
                    </div>   
                    <div class="form-group">
                    <label htmlFor="select" for="filter"> Select the filter: </label>
                            <select required="required" class="form-control" id="filter" name="filter" ref="filter" onChange={this.handleChange} >
                                <option value='shortest'>Shortest rout</option>
                                <option value='cheapest'>Cheapest rout</option>
                            </select> 
                            <div>
                            <button className="btn btn-success" onClick={this.handleFilter}>Search route</button>
                            </div>
                    </div> 
                    
                    <ForText>
                        <div id='dest'></div>
                    </ForText>
                    </ContainerSmall>     
                </Wrapper>
                <ContainerTable>          
                    <div id='tableHere'></div>
                </ContainerTable>   
                <ForText>
                        <div id='shortest'></div>
                </ForText>            
            </ContainerBig>
        );
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };