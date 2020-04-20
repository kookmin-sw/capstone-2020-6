import React from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {Map} from 'immutable';

import TImage from './t_image';
import './image_picker.css';

interface Props extends RouteComponentProps<any> {
    multiple: boolean;
    onPick: any;
    images: any[];
}

interface State {
    picked: any;
}

class ImagePicker extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            picked: Map()
        }
        this.handleImageClick = this.handleImageClick.bind(this);
        this.renderImage = this.renderImage.bind(this);
    }

    handleImageClick = (image: any) => {
        const {multiple, onPick} = this.props;
        const pickedImage = multiple ? this.state.picked : Map();
        const newerPickedImage =
            pickedImage.has(image.value) ? pickedImage.delete(image.value) : pickedImage.set(image.value, image.src)

        this.setState({picked: newerPickedImage});

        let pickedImageToArray: any[];
        pickedImageToArray = [];
        newerPickedImage.map((image: any, i: any) => pickedImageToArray.push({src: image, value: i}))

        onPick(multiple ? pickedImageToArray : pickedImageToArray[0])
    }

    renderImage = (image: any, i: any) => {
        return (
            <TImage
                src={image.src}
                isSelected={this.state.picked.has(image.value)}
                onImageClick={() => this.handleImageClick(image)}
                key={i}
            />
        )
    }

    render() {
        const {images} = this.props;
        return (
            <div className="image_picker">
                {images.map(this.renderImage)}
                <div className="clear"/>
            </div>
        );
    }
}

export default withRouter(ImagePicker);

