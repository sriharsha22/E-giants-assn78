import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

‌
var DisplayContainer1 = React.createClass({
    updateValue:function(modifiedValue){
        this.setState({
            value:modifiedValue
        })
    },
    getInitialState:function(){
        return{
            value:'My Value'
        }
    },
    render:function(){
        return (
            <div className="DisplayContainer">
                <h3>{this.state.value}</h3>
                <InputBox1 value={this.state.value} updateValue={this.updateValue}/>
            </div>
        );
    }
});

var InputBox1 = React.createClass({
    update:function(event){
        var modifiedValue=event.target.value;
        this.props.updateValue(modifiedValue);
    },
    render:function(){
        return (<input type="text" ref="inputValue" value={this.props.value} onChange={this.update} />)
    }
});

ReactDOM.render(<DisplayContainer1 />,document.getElementById("container1"));

var EditDetails = React.createClass({
    getInitialState: function() {
        return (this.det = {name:'',
            age:'',
            salary:''
        });
    },

    handleNameChange(event) {
        console.log(this.det);
        this.det.name = event.target.value;
        this.setState(this.det = {name:event.target.value});
        console.log(this.props.details);

    },

    render: function() {
        console.log(this.det);
        console.log('render method');
        this.det = {name: this.props.details.name, age:this.props.details.age, years:this.props.details.salary};
        return (
            <div className="container">
                <h3>Edit Details {this.det.name} details</h3>
                <form className="align-center">
                    <div className="form-group">
                        <label className="col-md-4">Id</label>
                        <span>{this.props.details.id} </span>
                    </div>
                    <div className="form-group">
                        <label className="col-md-4">Name</label>
                        <input type="text" className="form-control-md" placeholder="Name" value={this.det.name} onChange={this.handleNameChange}/>
                    </div>

                    <div className="form-group">
                        <label className="col-md-4">Salary</label>
                        <input type="text" className="form-control-md" placeholder="salary" value={this.det.salary}/>
                    </div>
                    <input className="btn btn-Success btn-sm" type="submit"  value="Save" onClick={this.updateDetails}/>
                </form>
            </div>
        );
    }
});

var EditForm = React.createClass({
    render: function() {

    }
});

var D = React.createClass({
    getInitialState: function() {
        return {display: true };
    },
    handleDelete() {
        var self = this;
        $.ajax({
            url: "/details/delete/"+self.props.details.id,
            type: 'DELETE',
            success: function(result) {
                self.setState({display: false});
            },
            error: function(xhr, ajaxOptions, thrownError) {
                toastr.error(xhr.responseJSON.message);
            }
        });
    },
    handleEdit() {
        console.log(this.props.details);
        ReactDOM.render(<EditDetails details={this.props.details}/>, document.getElementById('edit') );
    },
    render: function() {
        if (this.state.display==false) return null;
        else return (
            <tr>
                <td>{this.props.details.id}</td>
                <td>{this.props.details.name}</td>
                <td>{this.props.details.age}</td>
                <td>{this.props.details.years}</td>
                <td><button className="btn btn-sm btn-primary btn-success" onClick={this.handleEdit}>Edit</button></td>
                <td><button className="btn btn-sm btn-primary btn-warning" onClick={this.handleDelete}>Delete</button></td>
            </tr>
        );
    }
});

var HarshaTable = React.createClass({
    render: function() {
        var rows= [];
        this.props.details.forEach(function(details) {
            rows.push(<Details details={details} />);
        });
        return (
            <div className="container">
                <h2>HarshaTable Details</h2>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Salary</th>

                    </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </table>
            </div>
        );
    }
});

var App = React.createClass({

    loadDetailsFromServer: function () {
        var self = this;
        $.ajax({
            url: "/details/",
            headers: { 'Access-Control-Allow-Origin': '*' },
            crossDomain: true,
        }).then(function (data) {
            console.log('rest data');
            console.log(data);
            console.log('total details');
            console.log(data.totalDetails);
            console.log('details');
            console.log(data.details);
            self.setState({details: data.details});
        });
    },

    getInitialState: function () {
        return {details: []};
    },

    componentDidMount: function () {
        this.loadDetailsFromServer();
    },

    render() {
        return ( <HarshaTable details={this.state.details}/> );
    }
});

ReactDOM.render(<App />, document.getElementById('root') );


