import React from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {Container, Form, Radio, Button, Grid, Header, TextArea} from 'semantic-ui-react';
import "./PageLogin.css"
import JInput from '../components/JInput';
import {inject, observer} from 'mobx-react';
import LoginStore from '../stores/loginStore';
import JSelect from '../components/JSelect';
import TsDropDown from '../components/TsDropDown';
import TsTag from '../components/TsTag';

import './PageLabelingRegister.css'

interface Props extends RouteComponentProps<any> {
    navigate?: any,
}

interface State {
    value: string;
}

const labelingOptions = [
    {key: 'imgCap', value: 'imgCap', text: '[이미지] 캡처형'},
    {key: 'imgSel', value: 'imgSel', text: '[이미지] 선택형'},
    {key: 'txtSel', value: 'txtSel', text: '[텍스트] 선택형'},
    {key: 'txtWrite', value: 'txtWrite', text: '[텍스트] 단답형'}
]

// @inject("loginStore") @observer
class PageLabelingRegister extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            value: ''
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (e: any, {value}: State) => {
        console.log({value});
        this.setState({value});
    };

    render() {
        // console.log(this.props.navigate)
        return (
            <Container className="subjectContainer">
                <Header as='h2'>라벨링 주제 등록</Header>
                <Grid>
                    <Grid.Row>
                        <Grid.Column>
                            <JInput
                                label="주제"
                                placeholder="주제명을 적어주세요.(20자)"
                                value={''}
                                type="text"
                            />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={4}>
                            <p className="subjectHeader">라벨링 유형</p>
                            <TsDropDown
                                placeholder={'라벨링 유형을 선택해주세요.'}
                                labelingType={labelingOptions}
                                handleChange={this.handleChange}
                                value={this.state.value}
                            />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <JInput
                                label="한줄 설명"
                                placeholder="한줄 설명을 적어주세요.(30자)"
                                value={''}
                                type="text"
                            />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Form>
                                <p className="subjectHeader">상세 설명</p>
                                <TextArea placeholder='내용을 입력해주세요.' style={{minHeight: 200}}/>
                            </Form>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={2}>
                        <Grid.Column>
                            <Grid>
                                <Grid.Column>
                                    <br/><br/>
                                    <JInput
                                        label="보상 설정"
                                        placeholder="보상 금액을 입력해주세요."
                                        value={''}
                                        type="text"
                                    />
                                </Grid.Column>
                            </Grid>
                            <Grid>
                                <Grid.Column>
                                    <JInput
                                        label="총 횟수"
                                        placeholder="총 횟수를 적어주세요."
                                        value={''}
                                        type="text"
                                    />
                                </Grid.Column>
                            </Grid>
                        </Grid.Column>
                        <Grid.Column>
                            <p className="subjectHeader">기한 설정</p>
                            <Grid.Row columns={2}>
                                <Grid>
                                    <Grid.Column width={6}>
                                        <JSelect
                                            label="시작일"
                                            placeholder="년"
                                        />
                                    </Grid.Column>
                                    <Grid.Column width={5}>
                                        <JSelect
                                            label="&nbsp;"
                                            placeholder="월"
                                        />
                                    </Grid.Column>
                                    <Grid.Column width={5}>
                                        <JSelect
                                            label="&nbsp;"
                                            placeholder="일"
                                        />
                                    </Grid.Column>
                                </Grid>
                                <Grid>
                                    <Grid.Column width={6}>
                                        <JSelect
                                            label="마감일"
                                            placeholder="년"
                                        />
                                    </Grid.Column>
                                    <Grid.Column width={5}>
                                        <JSelect
                                            label="&nbsp;"
                                            placeholder="월"
                                        />
                                    </Grid.Column>
                                    <Grid.Column width={5}>
                                        <JSelect
                                            label="&nbsp;"
                                            placeholder="일"
                                        />
                                    </Grid.Column>
                                </Grid>
                            </Grid.Row>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <JInput
                                label="키워드"
                                placeholder="라벨링 키워드를 입력해주세요."
                                value={''}
                                type="text"
                            />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <p className="subjectHeader">데이터 셋 업로드(.zip)</p>
                            {/*TODO: 파일 업로드*/}
                            <Form>
                                <TextArea placeholder='파일을 가져와주세요.' style={{minHeight: 200}}/>
                            </Form>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column style={{textAlign: 'right'}}>
                            <Button className="subjectBtn" primary size="medium">제출</Button>
                        </Grid.Column>
                    </Grid.Row>

                </Grid>
            </Container>
        );
    }
};
export default withRouter(PageLabelingRegister);
