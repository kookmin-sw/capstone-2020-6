import React from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {Image} from 'semantic-ui-react'
import {observer} from 'mobx-react';

// image-picker
import ImagePicker from "react-image-picker";
// import "react-image-picker/dist/index.css";

interface Props extends RouteComponentProps<any>{

}

const img1 = "https://www.petmd.com/sites/default/files/small-kitten-walking-towards_127900829_0.jpg";

const imageList = [img1, img1, img1, img1];

@observer
class ImageLabelingSelector extends React.Component {
    constructor(props: Props) {
        super(props);
        this.state = {
            image: null
        };
        this.onPick = this.onPick.bind(this);
    }

    onPick(image: string) {
        this.setState({ image });
    }

    render() {
        return (
            <div>
                <ImagePicker
                    images={imageList.map((image, i) => ({ src: image, value: i }))}
                    onPick={this.onPick}
                    multiple
                />
                <button type="button" onClick={() => console.log(1)}>
                    OK
                </button>
            </div>
        );
    }
}

export default withRouter(ImageLabelingSelector);
