import React, {createContext, useContext, useReducer} from 'react';
import './Calculator.css';

const initialState = {
	firstNumber: null,
	operator: null,
	secondNumber: null,
	buffer: [],
	result: 0
};

const inputs = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const basicOperators = ['+', '-', 'x', '÷'];

const CounterContext = createContext([]);

const resolver = array => {
	if (array[1] === '+') {
		return Number(array[0]) + Number(array[2]);
	}
	if (array[1] === '-') {
		return Number(array[0]) - Number(array[2]);
	}
	if (array[1] === 'x') {
		return Number(array[0]) * Number(array[2]);
	}
	if (array[1] === '÷') {
		return Number(array[0]) / Number(array[2]);
	}
};

const reducer = (state, action) => {
	const {firstNumber, operator, secondNumber} = state;
	switch (action.type) {
		case 'input': {
			if (!firstNumber && !operator) {
				return {
					...state,
					firstNumber: action.value,
					result: action.value
				};
			} else if (firstNumber && !operator) {
				return {
					...state,
					firstNumber: firstNumber + action.value,
					result: firstNumber + action.value
				};
			} else if (operator && !secondNumber) {
				return {
					...state,
					secondNumber: action.value,
					result: action.value
				};
			} else if (secondNumber && operator) {
				return {
					...state,
					secondNumber: secondNumber + action.value,
					result: secondNumber + action.value
				};
			} else {
				return {
					...state
				};
			}
		}
		case 'BASIC_OPERATOR': {
			if (firstNumber && !operator) {
				return {
					...state,
					operator: action.value,
					buffer: [firstNumber, action.value]
				};
			}
			if (firstNumber && operator && secondNumber) {
				return {
					...state,
					buffer: [],
					result: resolver([firstNumber, operator, secondNumber])
				};
			} else if (state.buffer.length === 1) {
				return {
					...state,
					buffer: state.buffer + action.value,
					result: resolver(state.buffer)
				};
			} else {
				return {
					...state
				};
			}
		}
		case 'del': {
			return {
				...state,
				firstNumber: null,
				secondNumber: null,
				operator: null,
				buffer: [],
				result: ''
			};
		}
		case 'x²': {
			return {
				...state,
				firstNumber: Math.pow(state.secondNumber || state.firstNumber, 2),
				operator: null,
				secondNumber: null,
				result: Math.pow(state.secondNumber || state.firstNumber, 2)
			};
		}
		case '√': {
			return {
				...state,
				firstNumber: Math.sqrt(state.secondNumber || state.firstNumber),
				operator: null,
				secondNumber: null,
				result: Math.sqrt(state.secondNumber || state.firstNumber)
			};
		}
		case '±': {
			if (firstNumber && !operator) {
				return {
					...state,
					firstNumber: state.result * -1,
					result: state.result * -1
				};
			} else if (operator && secondNumber) {
				return {
					...state,
					secondNumber: state.result * -1,
					result: state.result * -1
				};
			} else {
				return {...state};
			}
		}
		case '=': {
			if (firstNumber && operator && secondNumber) {
				let operation = resolver([firstNumber, operator, secondNumber]);
				if (operation) {
					return {
						...state,
						firstNumber: operation,
						operator: null,
						secondNumber: null,
						result: operation
					};
				} else {
					return {
						...state,
						result: 'error'
					};
				}
			} else {
				return {
					...state
				};
			}
		}
		default:
			return state;
	}
};

const CounterContextProvider = props => {
	const [state, dispatch] = useReducer(reducer, initialState);
	return <CounterContext.Provider value={{state, dispatch}}>{props.children}</CounterContext.Provider>;
};

const Display = () => {
	const {state} = useContext(CounterContext);
	return (
		<form action='submit'>
			<input type='text' className='result' value={state?.result} readOnly />
		</form>
	);
};

const CalcRow = ({arrayOfNumbers}) => {
	const {dispatch} = useContext(CounterContext);

	return (
		<tr>
			{arrayOfNumbers.map(el => {
				if (inputs.includes(el)) {
					return (
						<td key={`${el}`}>
							<button
								className='calc-button'
								onClick={() =>
									dispatch({
										type: 'input',
										value: el
									})
								}>
								{el}
							</button>
						</td>
					);
				} else if (basicOperators.includes(el)) {
					return (
						<td key={`${el}`}>
							<button
								className='calc-button'
								onClick={() =>
									dispatch({
										type: 'BASIC_OPERATOR',
										value: el
									})
								}>
								{el}
							</button>
						</td>
					);
				} else {
					return (
						<td key={`${el}`}>
							<button
								className='calc-button'
								onClick={() =>
									dispatch({
										type: `${el}`,
										value: el
									})
								}>
								{el}
							</button>
						</td>
					);
				}
			})}
		</tr>
	);
};

const Calculator = () => {
	//state
	// const [value, setValue] = React.useState('0');
	// const {state} = useContext(CounterContext);
	// console.log(state);
	// Const
	const operatorRow = ['del', 'x²', '√', '÷'];
	const bottomRowNumber = ['1', '2', '3', '+'];
	const middleRowNumer = ['4', '5', '6', 'x'];
	const topRowNumber = ['7', '8', '9', '-'];
	const bottomRow = ['±', '0', '.', '='];

	// const handleChange = number => {
	// 	setValue(prev => prev + number);
	// };

	return (
		<CounterContextProvider>
			<div className='overflowWrapper'>
				<Display />
				<table>
					<tbody>
						<CalcRow arrayOfNumbers={operatorRow} />
						<CalcRow arrayOfNumbers={topRowNumber} />
						<CalcRow arrayOfNumbers={middleRowNumer} />
						<CalcRow arrayOfNumbers={bottomRowNumber} />
						<CalcRow arrayOfNumbers={bottomRow} />
					</tbody>
				</table>
			</div>
		</CounterContextProvider>
	);
};

export default Calculator;

//#region
/*
const Increment = () => {
	const {dispatch} = useContext(CounterContext);
	return (
		<button
			onClick={() =>
				dispatch({
					type: 'ADD_TO_COUNTER',
					value: 1
				})
			}>
			Sumar 1
		</button>
	);
};

const Decrement = () => {
	const {dispatch} = useContext(CounterContext);
	return (
		<button
			onClick={() =>
				dispatch({
					type: 'ADD_TO_COUNTER',
					value: -1
				})
			}>
			Restar 1
		</button>
	);
};
*/
//#endregion
