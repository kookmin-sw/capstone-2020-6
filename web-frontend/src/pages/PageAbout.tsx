import React from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {Container, Header, Grid} from "semantic-ui-react"
import Footer from '../components/Footer';

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
                    <Header as='h1'>소개</Header>
                    <img width="720"
                         src="https://github.com/kookmin-sw/capstone-2020-6/blob/master/img/logo.png?raw=true"/>

                    <Header as='h2'>프로젝트 개요</Header>
                    {this.props.aboutStore!.description.map((item:any)=>{
                        return(
                            <p style={{fontSize: 16}}>&nbsp;&nbsp;{item}</p>
                        )
                    })}
                    <Header as='h2'>소개영상</Header>
                    <iframe width="856" height="482" src="https://www.youtube.com/embed/zOQfu3Gawzw" frameBorder="0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen/>
                    <Header as='h2'>지도교수님 소개</Header>
                    <img
                        src={'https://github.com/kookmin-sw/capstone-2020-6/raw/web-frontend_pageAbout/img/%EC%B5%9C%EC%9D%80%EB%AF%B8.png'}
                        width='100' height='100' alt="image"/>
                    <Header as={'h3'} style={{marginTop: 10}}>최은미 교수님</Header>
                    <p>6조 지도교수님</p>

                    <Header as='h2'>멤버 소개</Header>
                    <Grid>
                        <Grid.Row columns={3}>
                            {this.props.aboutStore!.members.map((item: any) => {
                                return (
                                    <>
                                        <Grid.Column style={{marginBottom: 20}} key={item}>
                                            <img src={item.img} width='100' height='100' alt="image"/>
                                            <Header as={'h3'} style={{marginTop: 10}}>{item.name}</Header>
                                            <p>{item.role}</p>
                                        </Grid.Column>
                                    </>
                                );
                            })}
                        </Grid.Row>
                    </Grid>
                </Container>
                <Footer/>
            </>
        )
    }
}

export default withRouter(App);


