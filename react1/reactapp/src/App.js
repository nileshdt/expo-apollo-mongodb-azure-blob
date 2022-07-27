import axios from 'axios';

import React,{Component} from 'react';

class App extends Component {

	state = {
		url: null,
	// Initially, no file is s,elected
	selectedFile: null
	};
	
	// On file select (from the pop up)
	onFileChange = event => {
	console.log('file chage')
	// Update the state
	this.setState({ selectedFile: event.target.files[0] });
	
	};
	
	// On file upload (click the upload button)
	onCallUrl =  () => {
		
console.log('test url')
this.setState({ url: "test url"});

			const xhr = new XMLHttpRequest();
			try {
			  console.log(1)
			// listen for `onload` event
			xhr.onload = () => {
				// process response
			  console.log(6)
this.setState({ url: "onload url"});
		  
				if (xhr.status === 200) {
this.setState({ url: JSON.parse(xhr.response)});

					// parse JSON data
					console.log(JSON.parse(xhr.response));
				} else {
					console.error('Error!');
				}
			};
			
			// create a `GET` request
			xhr.open('GET', 'http://localhost:7001/url');
			console.log(2)
			
			// send request
			xhr.send();
			console.log(3)
this.setState({ url: "called url"});
		  
			}
			catch( e){ 
			  console.log(4)
			  this.setState({ url: e});

			  console.log(e)}
		  
	}


		onFileUpload = () => {
	
	// Create an object of formData
	const formData = new FormData();
	
	// Update the formData object
	formData.append(
		"file",
		this.state.selectedFile,
		this.state.selectedFile.name
	);
	
	// Details of the uploaded file
	console.log(this.state.selectedFile);
	console.log(1);
	// Request made to the backend api
	// Send formData object
	//axios.post("http://localhost:7001/blobupload", this.state.selectedFile);
	console.log(formData)
	axios.post('http://localhost:7001/blobupload', formData, {
		headers: {
		  'Content-Type': 'multipart/form-data'
		}
	})
	};
	
	// File content to be displayed after
	// file upload is complete
	fileData = () => {
	
	if (this.state.selectedFile) {
		
		return (
		<div>
			<h2>File Details:</h2>
			
<p>File Name: {this.state.selectedFile.name}</p>

			
<p>File Type: {this.state.selectedFile.type}</p>
<p>File Type: {this.state.url}</p>

			
<p>
			Last Modified:{" "}
			{this.state.selectedFile.lastModifiedDate.toDateString()}
			</p>

		</div>
		);
	} else {
		return (
		<div>
			<br />
			<h4>Choose before Pressing the Upload button</h4>
		</div>
		);
	}
	};
	
	render() {
	
	return (
		<div>
			<h1>
			GeeksforGeeks
			</h1>
			<h3>
			File Upload using React!
			</h3>
			<div>
				<input type="file" onChange={this.onFileChange} />
				<button onClick={this.onFileUpload}>
				Upload!
				</button>
			</div>
		{this.fileData()}
		<button onClick={this.onCallUrl}>Test URL</button>

		</div>
	);
	}
}

export default App;
