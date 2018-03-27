import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const Card = props => {
  const handleClick = () => {
    props.onSubmit(document.getElementById("cardContent").value);
  };

  return (
    <div>
      <div class="card">
        <textarea className="card-content" id="cardContent"></textarea>
      </div>
      <Interface onComplete={handleClick}/>
    </div>
  );
}

const Interface = (props) => {
  return (
    <div className="App-card-interface">
      <button onClick={props.onComplete}>Completed</button>
    </div>
  );
}

const WhiteBoard = (props) => {
  return (
    <div className="WhiteBoard">
      <div className="WhiteBoard-sector" id="didWell">What we did well</div>
      <div className="WhiteBoard-sector" id="canDoBetter">What can we do better</div>
      <div className="WhiteBoard-sector" id="puzzledUs">What puzzled us</div>
      <div className="WhiteBoard-sector" id="tryNext">What can we try next</div>
    </div>
  );
}

const Button = (props) => {
  return (
    <button 
      className={props.className ? props.className + ' btn' : 'btn'}
      onClick={props.onClick}
    >{props.label}</button>
  );
}

class App extends Component {
  handleSubmit = card => {
    alert(card);
  }

  handleCreateCard = () => {
    alert('new card');
  }

  render() {
    return (
      <div className="App">
        <WhiteBoard />
{/*         <div className="App-body">
          <Card onSubmit={this.handleSubmit} />
        </div> */}
        <div className="WhiteBoard-interface">
          <Button label="+" onClick={this.handleCreateCard}/>
        </div>
      </div>
    );
  }
}

export default App;
