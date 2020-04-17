import React from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {Image} from 'semantic-ui-react'
import {observer} from 'mobx-react';
import PropTypes from 'prop-types';

interface Props extends RouteComponentProps<any> {
    src: any;
    isSelected: any;
    onImageClick: any;
}

const img1 = "https://www.petmd.com/sites/default/files/small-kitten-walking-towards_127900829_0.jpg";
// const ImageStyle = (width: number, height: number) => {
//     return {
//         width,
//         height,
//         objectFit: "cover"
//     }
// }

@observer
class T_image extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        const {src, isSelected, onImageClick} = this.props;

        return (
            <div className={`responsive${isSelected ? " selected" : ""}`}
                 onClick={onImageClick}>
                <img src={src}
                     className={`thumbnail${isSelected ? " selected" : ""}`}
                     style={{width: 150, height: 150, objectFit: "cover"}}
                />
                <div className="checked">
                    {/*<img src={imgCheck} style={{ width: 75, height: 75, objectFit: "cover" }}/>*/}
                    <div className="icon"/>
                </div>
            </div>
        );
    }
}

Image.propTypes = {
    src: PropTypes.string,
    isSelected: PropTypes.bool
}

export default withRouter(T_image);

