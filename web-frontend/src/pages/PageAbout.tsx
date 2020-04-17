import React from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {Container, Header, Grid} from "semantic-ui-react"
import Footer from '../components/Footer';

import "./PageAbout.css"

// for Mobx
import {observer, inject} from 'mobx-react';
import AboutStore from "../stores/AboutStore";

interface Props extends RouteComponentProps<any> {
    navigate?: any
    aboutStore?: AboutStore;
}

@inject('aboutStore')
@observer
class App extends React.Component<Props> {
    constructor(props: any) {
        super(props);
        this.props.aboutStore!.setMember();
        this.props.aboutStore!.setDescription();
    }
    render() {
        console.log(this.props.navigate)

        return (
            <>
                <Container style={{marginTop: 30}}>

                    <img className="about-daemon" src="https://github.com/kookmin-sw/capstone-2020-6/blob/master/img/logo.png?raw=true"/>

                    <Grid columns={2}>
                        <Grid.Column>
                        <Header as='h2' className="about_h2">소개영상</Header>
                        <iframe
                            className="about-youtube"
                            src="https://www.youtube.com/embed/zOQfu3Gawzw"
                            frameBorder="0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                        </Grid.Column>
                        <Grid.Column>
                            <Header as='h2' className="about_h2">프로젝트 개요</Header>
                            {this.props.aboutStore!.description.map((item:any)=>{
                                return(
                                    <p style={{fontSize: 16}}>&nbsp;&nbsp;{item}</p>
                                )
                            })}
                        </Grid.Column>
                    </Grid>

                    <Header as='h2' className="about_h2">지도교수 및 팀원 소개</Header>
                    <Grid columns={7}>
                        {
                            this.props.aboutStore!.members.map((item: any) => {
                                return (
                                    <>
                                        <Grid.Column className="about_memberCard">
                                            <img
                                                src={item.img}
                                                className="about_memberImage"
                                            />
                                            <div className="about_memberName">{item.name}</div>
                                            <div className="about_memberRole">{item.role}</div>
                                        </Grid.Column>
                                    </>
                                );
                            })
                        }
                    </Grid>
                </Container>
                <Footer/>
            </>
        )
    }
}

export default withRouter(App);


