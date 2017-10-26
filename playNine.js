const Stars = (props) => {
	return(
		<div className="col-5">
			{_.range(props.numberOfStars).map((i) => 
				<i key={i} className="fa fa-star"></i>
			)}

		</div>
	);

}

const Button = (props) => {
	let button;
	switch(props.answerIsCorrect) {
	case true:
		button = <button className="btn btn-success"
    					onClick={props.acceptAnswer()}>
								<i className="fa fa-check"></i>
             </button>;
	break;
	case false:
		button = <button className="btn btn-danger">
						<i className="fa fa-times"></i>
							</button>;
	break;
	default:
			button = <button className="btn" 
					disabled={props.selectedNumbers.length === 0} 
					onClick={()=> props.checkAnswer() }>=</button>
	break;
	}
  
	return(
		<div className="col-2 text-center">
		{button}
    <br /><br />
    <button className="btn btn-warning btn-sm"
    				onClick={props.refresh}
            disabled={props.redraws === 0}>
    	{props.redraws} <i className="fa fa-refresh"></i>
    </button>
		</div>
	);
}

const Answer = (props) => {
	return(
		<div className="col-5">
			{props.selectedNumbers.map((number, i) =>
      	<span key={i}
        onClick={()=> props.removeNumber(number)}>
        {number}
        </span>
      )}
		</div>
	);

}

const Numbers = (props) => {
	const numberClassName = (number) => {
  	if(props.usedNumbers.indexOf(number) >= 0) {
    	return 'used';
    }
  	if(props.selectedNumbers.indexOf(number) >= 0) {
    	return 'selected';
    }
  }
	return(
		<div className="card text-center">
      <div className="nigs">
       {Numbers.list.map((number, i) => 
        <span key={i} className={numberClassName(number)}
        		onClick={()=> props.selectNumber(number)}>
            {number}
    		</span>
      )}
     </div>
		</div>
	);

}

Numbers.list = _.range(1,10);

class Game extends React.Component {
	static randomNumber = () => 1 + Math.floor(Math.random()*9);
	state = {
  	selectedNumbers: [],
    randomNumberOfStars: Game.randomNumber(),
    answerIsCorrect: null,
		usedNumbers: [],
    redraws: 5
  };
  
  removeNumber = (clickedNumber) => {
  	this.setState(prevState => ({
    	answerIsCorrect: null,
    	selectedNumbers: prevState.selectedNumbers.
      													filter(number => number !== clickedNumber)
    }));
  };
  
  selectNumber = (clickedNumber) => {
  	if (this.state.selectedNumbers.indexOf(clickedNumber)>= 0) { return; }
  	this.setState(prevState => ({
    	answerIsCorrect: null,
    	selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
    }));
  };
  
	checkAnswer = () => {
  	this.setState(prevState => ({
    	answerIsCorrect: prevState.randomNumberOfStars ===
      	prevState.selectedNumbers.reduce((acc, n) => acc + n, 0)
    }));
  }
  
  acceptAnswer = () => {
  	this.setState(prevState => ({
    	usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
      selectedNumbers: [],
      answerIsCorrect: null,
    	randomNumberOfStars: Game.randomNumber()
    }))
  }
  
  refresh = () => {
  	this.setState(prevState => ({
    	randomNumberOfStars: Game.randomNumber(),
      answerIsCorrect: null,
      selectedNumbers: [],
      redraws: prevState.redraws - 1
    }));
  }
  
	render() {
    const { 
    selectedNumbers,
    randomNumberOfStars,
    answerIsCorrect,
    usedNumbers,
    redraws
    } = this.state;
		return(
			<div className="container">
				<h3>Play Nine</h3>
				<hr />
				<div className ="row">
					<Stars 
          	numberOfStars={randomNumberOfStars} 
          />
					<Button 
          	selectedNumbers={selectedNumbers} 
         		checkAnswer={this.checkAnswer} 
          	answerIsCorrect={answerIsCorrect}
            acceptAnswer={this.acceptAnswer}
            refresh={this.refresh}
            redraws={redraws}
          />
					<Answer 
          	selectedNumbers={selectedNumbers} 
            removeNumber={this.removeNumber} 
          />
				</div>
				<br />
          <Numbers 
          	selectedNumbers={selectedNumbers} 
            selectNumber={this.selectNumber} 
            usedNumbers={usedNumbers}
          />
          <br />
			</div>
		);
	}

}

class App extends React.Component {
	render() {
		return(
			<div>
				<Game />
			</div>
		);
	}

}

ReactDOM.render(<App />, mountNode);