import React from 'react';
import './App.css';

function Header(props){
    return(
        <header className="header">
            <h1>movies App</h1>
            <h3>Deafult movie is: {props.defaultSnack}</h3>
        </header>
    );
}


function Footer(props){
    return(
        <footer className={props.cls}>
            <small>{props.text}</small>
        </footer>
    )
}


function Snack(props){
    return (
        <li>
            <h4>Name: {props.snack.name}</h4>
            <h4>Type: {props.snack.type}</h4>
        </li>
    )
}


function SnackList(props){
    return(
        <main className="main">
            <h2>movies List</h2>
            <h3>Number of movies: {props.moviesList.length}</h3>
            <ul>
                { props.moviesList.map( snack => <Snack snack={snack} />) }
            </ul>
        </main>
    )
}


class SnackForm extends React.Component{
    constructor(props){
        super(props);
        this.props = props;
        this.state = {
            name:""
        };

        this.handleChange = this.handleChange.bind(this); // Configuration
        this.handleSubmit = this.handleSubmit.bind(this); // Configuration
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <label> {this.props.title}
                    <input type="text" onChange={this.handleChange}></input>
                </label>

                <input type="submit" value="Add" />
            </form>
        )
    }

    handleChange(event){
        console.log("Change Happened!!!");
        console.log(event.target.value);
        this.setState({name: event.target.value});
    }

    handleSubmit(event){
        event.preventDefault();
        console.log(this.state.name);
        this.props.onSnackCreate(this.state);
    }
}




class App extends React.Component{

    constructor(){
        super();
        this.state = {
            movies: [
                {
                    id: 1,
                    name: "lord of the rings",
                    type: "Fantasy "
                },
                {
                    id: 2,
                    name: "cast away",
                    type: "Drama"
                },
                {
                    id: 3,
                    name: "Terminal",
                    type: "Drama"
                }
            ],
            dSnack: "Apples",
            counter: 0
        };
        this.handleCreateSnack = this.handleCreateSnack.bind(this);
    }


    handleCreateSnack(snack){
        let allmovies = this.state.movies;
        allmovies.push({id: 4, name: snack.name, type: "Any"});
        this.setState({movies: allmovies});
    }

    render(){
        return(
            <div className="App">
                <h2>{this.state.counter}</h2>
                <button onClick={() => this.setState({counter: this.state.counter+1}) }>Increment</button>

                <Header defaultSnack={this.state.dSnack}/>
                <SnackList moviesList={this.state.movies}/>
                <h1>Would you like to add a new movie? </h1>
                <SnackForm title="Add movie Form"  onSnackCreate= { (snack) => this.handleCreateSnack(snack) } />
                <Footer cls="footer" text="@copyright ASAC"/>
            </div>
        );
    }
}

export default App;
