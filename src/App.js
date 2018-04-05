import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';

const modalRoot = document.getElementById('modal-root');

const Card = props => {
  const handleClick = () => {
    props.onSubmit(document.getElementById("cardContent").value);
  };

  return (
    <div>
      <div class="card">
        <textarea className="card-content" id="cardContent"></textarea>
      </div>
      <Interface onComplete={handleClick} />
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
      <div className="WhiteBoard-sector" id="didWell">What we did well
        {props.topics[0].map((card, index) => (
          <div key={index} className="post-it-note">{card.content}</div>
        ))}
      </div>
      <div className="WhiteBoard-sector" id="canDoBetter">What can we do better
      {props.topics[1].map((card, index) => (
          <div key={index} className="post-it-note">{card.content}</div>
        ))}</div>
      <div className="WhiteBoard-sector" id="puzzledUs">What puzzled us
      {props.topics[2].map((card, index) => (
          <div key={index} className="post-it-note">{card.content}</div>
        ))}</div>
      <div className="WhiteBoard-sector" id="tryNext">What can we try next
      {props.topics[3].map((card, index) => (
          <div key={index} className="post-it-note">{card.content}</div>
        ))}</div>
    </div>
  );
}

class Modal extends React.Component {
  constructor(props) {
    super(props);
    // Create a div that we'll render the modal into. Because each
    // Modal component has its own element, we can render multiple
    // modal components into the modal container.
    this.el = document.createElement('div');
  }

  componentDidMount() {
    // Append the element into the DOM on mount. We'll render
    // into the modal container element (see the HTML tab).
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    // Remove the element from the DOM when we unmount
    modalRoot.removeChild(this.el);
  }

  render() {
    // Use a portal to render the children into the element
    return ReactDOM.createPortal(
      // Any valid React child: JSX, strings, arrays, etc.
      this.props.children,
      // A DOM element
      this.el,
    );
  }
}


const Button = (props) => {
  return (
    <button
      className={props.className ? props.className + ' btn' : 'btn'}
      onClick={props.onClick}
    >{props.label}</button>
  );
}

const PinPostItBtn = (props) => {
  return (
    <button id={props.id} onClick={props.onPin} className="pinBtn">
      <svg viewBox="0 0 32 32" width="32px" height="32px">
        <path d="M32,8c0-4.416-3.586-8-8-8c-2.984,0-5.562,1.658-6.938,4.086c0-0.002,0.004-0.004,0.004-0.006   c-0.367-0.035-0.723-0.111-1.098-0.111c-6.629,0-12,5.371-12,12c0,2.527,0.789,4.867,2.121,6.797L0,32l9.289-6.062   c1.91,1.281,4.207,2.031,6.68,2.031c6.629,0,12-5.371,12-12c0-0.346-0.07-0.67-0.102-1.008C30.32,13.594,32,11.006,32,8z M15.969,23.969c-4.414,0-8-3.586-8-8c0-4.412,3.586-8,8-8c0.012,0,0.023,0.004,0.031,0.004c0-0.008,0.004-0.014,0.004-0.02 C16.004,7.969,16,7.984,16,8c0,0.695,0.117,1.355,0.281,1.998l-3.172,3.174c-1.562,1.562-1.562,4.094,0,5.656s4.094,1.562,5.656,0 l3.141-3.141c0.66,0.18,1.344,0.305,2.059,0.309C23.949,20.398,20.371,23.969,15.969,23.969z M24,12c-2.203,0-4-1.795-4-4 s1.797-4,4-4s4,1.795,4,4S26.203,12,24,12z" />
      </svg>
    </button>
  );
}

class App extends Component {
  state = {
    showPostIt: false,
    showPin: false,
    postItContent: null,
    retrospectiveTopics: Array(4).fill(null).map(() => []),
  }

  handleSubmitPostit = card => {
    this.setState((prevState) => ({
      showPostIt: true,
      showPin: true,
      postItContent: prevState.postItContent,
      retrospectiveTopics: prevState.retrospectiveTopics,
    }));
  }

  handlePinPostit = section => {
    this.setState(prevState => {
      const topicsUpdated = prevState.retrospectiveTopics;
      topicsUpdated[section].push({
        content: prevState.postItContent,
      });

      return {
        showPostIt: false,
        showPin: false,
        postItContent: null,
        retrospectiveTopics: topicsUpdated,
      };
    });
  }

  handleCreateCard = () => {
    this.setState(prevState => ({
      showPostIt: true,
      showPin: false,
      postItContent: null,
      retrospectiveTopics: prevState.retrospectiveTopics,
    }));
  }

  handleNewPostitContent = (evt) => {
    const postItContent = evt.target.textContent;

    this.setState((prevState) => ({
      showPostIt: true,
      showPin: false,
      postItContent: postItContent,
      retrospectiveTopics: prevState.retrospectiveTopics,
    }));
  }



  render() {
    const newPostIt = this.state.showPostIt ? (
      <Modal>
        {!this.state.showPin ? (
          <div className="modal">
            <div className="post-it-note" contentEditable="true" onBlur={this.handleNewPostitContent}></div>

            <button onClick={this.handleSubmitPostit}>
              <svg viewBox="0 0 32 25.754" width="32px" height="25.754px">
                <polygon points="11.941,25.754 0,13.812 5.695,8.117 11.941,14.363 26.305,0 32,5.695 11.941,25.754" />
              </svg>
            </button>
          </div>
        ) : (
            <div className="modal">
              <PinPostItBtn id="pinToDidWell" onPin={() => this.handlePinPostit(0)} />
              <PinPostItBtn id="pinToCanDoBetter" onPin={() => this.handlePinPostit(1)} />
              <PinPostItBtn id="pinToPuzzledUs" onPin={() => this.handlePinPostit(2)} />
              <PinPostItBtn id="pinToTryNext" onPin={() => this.handlePinPostit(3)} />
            </div>
          )}
      </Modal>
    ) : null;
    return (
      <div className="App">
        <WhiteBoard topics={this.state.retrospectiveTopics} />
        {/*         <div className="App-body">
          <Card onSubmit={this.handleSubmit} />
        </div> */}
        <div className="WhiteBoard-interface">
          <button label="+" onClick={this.handleCreateCard} className="btn" >
            <span className="icon --svg-baseline">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" /></svg>
            </span>
          </button>
        </div>
        {newPostIt}
      </div>
    );
  }
}

export default App;
