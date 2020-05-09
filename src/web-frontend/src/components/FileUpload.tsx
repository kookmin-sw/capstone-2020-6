import React from "react";
// import axios from 'axois';
import { Button, Dimmer, Loader, Input } from 'semantic-ui-react';

import { observer, inject } from "mobx-react";

import './FileUpload.css';

interface Props {
    type: string;
    onChange?: any;
}

interface State {
    selectedFile: any;
    loading: boolean;
    images: any;
    selectedImageDeletehash: string;
}

class FileUpload extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.onFileChange = this.onFileChange.bind(this);
        this.onFileUpload = this.onFileUpload.bind(this);
        this.state = {
            selectedFile: [],
            loading: false,
            images: [],
            selectedImageDeletehash: ""
        }
    }

    imageUpload = async (e: any) => {
        this.setState({ loading: true })
        let files = []
        for (const file of e.target.files)
            files.push(file)
        await this.imageUploadToImgur(files)
    }

    imageUploadToImgur = async (files: any, index = 0) => {
        const formData = new FormData()
        formData.append('type', 'file')
        formData.append('image', files[index])
        const response = await fetch('https://api.imgur.com/3/upload.json', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                Authorization: `Client-ID c9a16c2fa7af6c2`
            },
            body: formData
        })
        const data = await response.json()
        if (data.success) {
            const name = files[index].name
            this.props.onChange(data.link)
            alert("이미지 업로드 성공")
        } else {
            alert("이미지 업로드 실패")
        }
        if (index === files.length - 1) return this.setState({ loading: false })
        await this.imageUploadToImgur(files, index + 1)
    }

    onFileChange = (e: any) => {
        this.setState({ selectedFile: e.target.files[0] });
    };

    onFileUpload = (type: string) => {
        const formData = new FormData();
        let flag = 0;
        if (type === 'img' && this.state.selectedFile.type.slice(0, 5) === 'image') {
            flag = 1;
        }
        else if (type === 'zip' && this.state.selectedFile.type === 'application/zip') {
            flag = 1;
        }
        else {
            type === 'img' ? alert('이미지파일(jpg, png)형식이 아닙니다.') : alert('압축파일(zip)형식이 아닙니다.');
        }

        if (flag) {
            console.log(type);
            console.log(this.props.type);
            formData.append(
                "myFile",
                this.state.selectedFile,
                this.state.selectedFile.name
            );
            console.log(this.state.selectedFile);
        }

        // axois.post("api/uploadfile", formData);
    };

    fileData = () => {
        if (this.state.selectedFile !== null) {
            return (
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
                <Input type="file" onChange={this.imageUpload} loading={this.state.loading}/>
                {/* <span className="uploadBtn">
                </span> */}
                {/* <Button onClick={() => this.onFileUpload(this.props.type)}>파일 업로드</Button> */}
            </div>
        );
    }
}

export default FileUpload;