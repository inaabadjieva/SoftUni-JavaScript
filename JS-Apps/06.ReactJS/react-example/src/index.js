import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

let Counter = React.createClass({
	getInitialState: function() {
		return { count: Number(this.props.start) }
	},
	incrementCount: function() { this.changeCount(+1) },
	decrementCount: function() { this.changeCount(-1) },
	changeCount: function(delta) {
		// This will update the component UI
		this.setState({
			count: this.state.count + delta
		});
	},
	render: function() {
		return (<div>
			Count: { this.state.count }
			<button type = "button" onClick = { this.incrementCount } > + </button> 
			<button type = "button" onClick = { this.decrementCount } > - </button> 
			</div>
		)
	}
});
let counter = <Counter start = "5" / > ;
ReactDOM.render(counter, document.getElementById('root'))
