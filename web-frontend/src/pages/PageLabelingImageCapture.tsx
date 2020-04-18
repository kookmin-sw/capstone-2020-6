// import React from 'react';
// import ReactCrop from 'react-image-crop';
// import {Container} from "semantic-ui-react";
//
// interface TestState {
//     crop?: ReactCrop.Crop;
// }
//
// const initialState = {
//   crop: {
//     x: 100,
//     y: 200,
//   },
// };
//
// // Basic use case
// class SimpleTest extends React.Component<{}, TestState> {
//     state = initialState;
//
//     onChange = (crop: ReactCrop.Crop) => {
//       this.setState({crop});
//     }
//
//     render() {
//       return <ReactCrop src="https://post-phinf.pstatic.net/MjAxOTA5MTdfMTgw/MDAxNTY4NzEyNTc2Mzc0.nht5dtYwCY82c2ZJOgct4aGx_Kdtl0xdzTEjFn2NH-Yg.u5yRBzwCXrm_i05P7Qbf_DX7-0i87U20lEAhQSXnO5gg.JPEG/01.jpg?type=w1200" onChange={this.onChange} crop={this.state.crop} />;
//     }
// }
//
// // Set an aspect ratio to crop
// class AspectRatioTest extends React.Component<{}, TestState> {
//     state = initialState;
//
//     onChange = (crop: ReactCrop.Crop) => {
//       this.setState({crop});
//     }
//
//     onImageLoaded = (image: HTMLImageElement) => {
//       this.setState({
//         crop: ReactCrop.makeAspectCrop(
//             {
//               x: 0,
//               y: 0,
//               aspect: 16 / 9,
//               width: 50,
//             },
//             500,
//             300,
//         ),
//       });
//     }
//
//     render() {
//       console.log(this.onChange);
//       console.log(this.onImageLoaded);
//       console.log(this.state.crop);
//       return (
//         <ReactCrop
//           src="https://post-phinf.pstatic.net/MjAxOTA5MTdfMTgw/MDAxNTY4NzEyNTc2Mzc0.nht5dtYwCY82c2ZJOgct4aGx_Kdtl0xdzTEjFn2NH-Yg.u5yRBzwCXrm_i05P7Qbf_DX7-0i87U20lEAhQSXnO5gg.JPEG/01.jpg"
//           onChange={this.onChange}
//           onImageLoaded={this.onImageLoaded}
//           crop={this.state.crop}
//         />
//       );
//     }
// }
//
// // All available props
// class CompleteTest extends React.Component<{}, TestState> {
//     state = initialState;
//
//     onChange = (crop: ReactCrop.Crop) => {
//       this.setState({crop});
//     }
//
//     onImageLoaded = (image: HTMLImageElement) => {
//       this.setState({
//         crop: ReactCrop.makeAspectCrop(
//             {
//               x: 0,
//               y: 0,
//               aspect: 16 / 9,
//               width: 20,
//             },
//             100,
//             100,
//         ),
//       });
//     }
//
//     onImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
//       console.warn('Error loading image');
//     }
//
//     render() {
//       return (
//         <Container>
//           <ReactCrop
//             src="/images/body.jpg"
//             onChange={this.onChange}
//             onImageLoaded={this.onImageLoaded}
//             crop={this.state.crop}
//             minWidth={30}
//             minHeight={30}
//             maxWidth={90}
//             maxHeight={90}
//             keepSelection={true}
//             disabled={false}
//             style={{border: '1px solid black', position: 'relative'}}
//             onComplete={() => console.log('Crop complete')}
//             onDragStart={() => console.log('Drag start')}
//             onDragEnd={() => console.log('Drag end')}
//             crossorigin="anonymous"
//             onImageError={this.onImageError}
//             className="my-cropper"
//             locked={false}
//           />
//         </Container>
//       );
//     }
// }
//
// export default CompleteTest;

import React from 'react';
import ReactDOM from 'react-dom';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import ReactCrop, {makeAspectCrop} from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

interface Props extends RouteComponentProps<any> {

}

interface State {
    src: string;
    crop: any
}

class App extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      src: '',
      crop: {
        x: 10,
        y: 10,
        width: 80,
        height: 80,
      },
    };
  }

    // onSelectFile = (e: any) => {
    //   if (e.target.files && e.target.files.length > 0) {
    //     const reader = new FileReader();
    //     reader.addEventListener(
    //         'load',
    //         () =>
    //           this.setState({
    //             src: reader.result,
    //           }),
    //         false);
    //     reader.readAsDataURL(e.target.files[0]);
    //   }
    // }

    onImageLoaded = (image: any) => {
      console.log('onCropComplete', image);
      this.setState({src: '/images/body.jpg'});
    }

    onCropComplete = (crop: any) => {
      console.log('onCropComplete', crop);
    }

    onCropChange = (crop: any) => {
      this.setState({crop});
    }

    render() {
      return (
        <div className="App">
          <ReactCrop
            src={this.state.src}
            crop={this.state.crop}
            onImageLoaded={this.onImageLoaded}
            onComplete={this.onCropComplete}
            onChange={this.onCropChange}
          />
        </div>
      );
    }
}

export default withRouter(App);
