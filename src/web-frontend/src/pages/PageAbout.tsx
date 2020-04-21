import React from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {Container, Header, Grid} from "semantic-ui-react"

import "./PageAbout.css"


interface Props extends RouteComponentProps<any> {
    navigate?: any
}
const members = [ {
    img: 'https://github.com/kookmin-sw/capstone-2020-6/raw/web-frontend_pageAbout/img/%EC%B5%9C%EC%9D%80%EB%AF%B8.png',
    name: "최은미",
    role: "지도교수"
},
    {
        img: 'https://github.com/kookmin-sw/capstone-2020-6/raw/web-frontend_pageAbout/img/%EC%9D%B4%EC%A0%95%ED%95%98.png',
        name: '이정하',
        role: 'Front-end developer'
    },
    {
        img: 'https://github.com/kookmin-sw/capstone-2020-6/raw/web-frontend_pageAbout/img/%EB%B0%95%EC%83%81%EC%9D%BC.png',
        name: '박상일',
        role: 'AI developer'
    },
    {
        img: 'https://github.com/kookmin-sw/capstone-2020-6/raw/web-frontend_pageAbout/img/%EB%B0%95%EC%A7%80%ED%9D%AC.png',
        name: '박지희',
        role: 'Blockchain developer'
    },
    {
        img: 'https://github.com/kookmin-sw/capstone-2020-6/raw/web-frontend_pageAbout/img/%EC%9C%A4%EC%97%AC%ED%99%98.png',
        name: '윤여환',
        role: 'Front-end developer'
    },
    {
        img: 'https://github.com/kookmin-sw/capstone-2020-6/raw/web-frontend_pageAbout/img/%EC%9D%B4%EB%8B%A4%EC%9D%80.png',
        name: '이다은',
        role: 'Back-end developer'
    },

    {
        img: 'https://github.com/kookmin-sw/capstone-2020-6/raw/web-frontend_pageAbout/img/%EC%9E%A5%ED%83%9C%EC%A7%84.png',
        name: '장태진',
        role: 'Back-end developer'
    }]

const description = [
    'AI 시장이 확대되면서 AI 기술 개발에 사용할 수 있는 데이터셋의 필요성이 증가하고 있다. 그로 인해 데이터셋 생성의 ' +
    '가장 기본적인 단계인 데이터 레이블링 또한 중요해지고 있다. 데이터 레이블링이란 데이터에 대한 결과값을 붙여서 AI의 ' +
    '학습 단계에 사용할 수 있도록 하는 작업이다. 오늘날 데이터 레이블링 작업은 대부분 사람들에 의해 수작업으로 진행된다.' +
    '그래서 데이터셋을 생성하는 작업은 많은 비용을 필요로한다. 따라서 많은 기업과 연구 기관들은 AI 기술 개발에 사용할 ' +
    '데이터셋을 생성하는데 많은 비용을 지불하고 있으며 비용 문제로 인해 AI 기술 개발을 진행하는 것에 어려움을 겪기도 한다. ' +
    '그러므로 이와 같이 데이터셋을 생성하는데 많은 비용이 드는 문제를 해결하기 위해 비용을 크게 절감 시킬 수 있는' +
    '효율적으로 데이터셋을 생성할 수 있도록 해주는 데이터 마이닝 플랫폼이 필요하다.',
    'T-SAN 프로젝트는 크라우드소싱이 포함된 데이터 마이닝 플랫폼을 개발하는 것을 목표로 한다. 플랫폼 사용자는 ' +
    '의뢰자와 레이블링 참여자로 나뉜다. 의뢰자는 데이터셋과 레이블링 방법, 두 가지 정보를 제공해야 한다. 레이블링 참여자는' +
    '레이블링 작업을 할 때 보상으로 포인트를 받을 수 있다. 또한 레이블링 된 데이터를 검수하는 과정에서 머신러닝 알고리즘을' +
    '이용하여 검수 작업에 필요한 인건비를 줄이면서 신뢰도 있는 데이터셋을 수집할 수 있다. 결과적으로 T-SAN은 다수의 집단' +
    '지성을 이용한 라벨링 작업과 머신 러닝 알고리즘을 이용한 검수 과정을 통해 기존의 방법 대비 적은 비용으로 데이터셋을' +
    '생성해주는 플랫폼 역할을 수행할 수 있다.'
]
class App extends React.Component<Props> {
    constructor(props: any) {
        super(props);
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
                            {description.map((item:any)=>{
                                return(
                                    <p style={{fontSize: 16, textAlign: 'justify', lineHeight: '25px'}}>&nbsp;&nbsp;{item}</p>
                                )
                            })}
                        </Grid.Column>
                    </Grid>

                    <Header as='h2' className="about_h2">지도교수 및 팀원 소개</Header>
                    <Grid columns={7}>
                        {
                            members.map((item: any) => {
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
            </>
        )
    }
}

export default withRouter(App);
