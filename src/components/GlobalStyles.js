import {createGlobalStyle} from 'styled-components';
export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({theme}) => theme.body};
    color: ${({theme}) => theme.text};
    font-family: Tahoma, Helvetica, Arial, Roboto, sans-serif;
    transition: all 0.50s linear;
    font-size: 2rem;
  }
* {
	box-sizing: border-box;
}

.overflowWrapper {
	border-radius: 3px;
	overflow: hidden;
}

table {
	border-spacing: 0px;
	background-color: ${({theme}) => theme.body};
}

td {
	padding: 0px;
	border: 0px;
}

td > button {
	background-color: ${({theme}) => theme.body};
	color: ${({theme}) => theme.text};
	font-weight: 800;
	height: 50px;
	width: 50px;
	line-height: 50px;
	text-align: center;
	vertical-align: middle;
	padding: 0px;
	border: 0px;
	border-radius: 2px;
	user-select: none;
}

td > button:hover {
	background-color: ${({theme}) => theme.hoverBackground};
}

td > button:active {
	background-color: ${({theme}) => theme.activeBackground};
}

tr {
	width: 200px;
}

.result {
	width: 200px;
	border: none;
	background-color: ${({theme}) => theme.body};
	color: ${({theme}) => theme.text};
	font-size: 25px;
	text-align: right;
	padding: 10px;
	outline: none;
}

.result:focus {
	border: none;
}

.del-button {
	display: flex;
	justify-content: center;
	align-items: center;
  fill: ${({theme}) => theme.text};
}

`;
