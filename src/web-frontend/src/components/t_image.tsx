import React from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';

interface Props extends RouteComponentProps<any> {
    src: string;
    isSelected: boolean;
    onImageClick: any;
}

class Image extends React.Component<Props> {
  render() {
    const {src, isSelected, onImageClick} = this.props;

    return (
      <div className={`responsive${isSelected ? " selected" : ""}`}
        onClick={onImageClick}>
        <img src={src}
          alt={'t_image'}
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

export default withRouter(Image);
