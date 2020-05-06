import React from "react";
// import axios from 'axois';
import {Button} from 'semantic-ui-react';

import {observer, inject} from "mobx-react";

import './FileUpload.css';

interface Props{

}

interface State{
    selectedFile: any;
}

class FileUpload extends React.Component<Props, State>{

    constructor(props:Props) {
        super(props);
    }

    onFileChange = (e:any) => {
        this.setState({selectedFile: e.target.files[0]});
    };

    onFileUpload = () => {
        const formData = new FormData();

        formData.append(
            "myFile",
            this.state.selectedFile,
            this.state.selectedFile.name
        );

        console.log(this.state.selectedFile);

        // axois.post("api/uploadfile", formData);
    };

    fileData = () => {
        if(this.state.selectedFile !== null){
            return(
                <div>
                    <h2>File Details: </h2>
                    <p>File Name: {this.state.selectedFile.name}</p>
                    <p>File Type: {this.state.selectedFile.type}</p>
                    <p>
                        Last Modified: {" "}
                        {this.state.selectedFile.lastModified.toDateString()}
                    </p>
                </div>
            )
        }
        else{
            return(
                <div>
                    <br/>
                    <h4>Choose before Pressing the Upload button</h4>
                </div>
            );
        }
    };

    render() {
        return(
          <div>
              <span className="uploadBtn">
              <input type="file" onChange={this.onFileChange}/>
              </span>
              <Button onClick={this.onFileUpload}>파일 업로드</Button>
         </div>
        );
    }
}

export default FileUpload;