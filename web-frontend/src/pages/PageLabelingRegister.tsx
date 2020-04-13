import React from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {Container, Form, Radio, Button, Grid, Header, TextArea} from 'semantic-ui-react';
import "./PageLogin.css"
import JInput from '../components/JInput';
import {inject, observer} from 'mobx-react';
import LoginStore from '../stores/loginStore';
import JSelect from '../components/JSelect';

import './PageLabelingRegister.css'

interface Props extends RouteComponentProps<any> {
    navigate?: any,
}

interface State {
    value: string;
}

const list: string[][] = [['[이미지] 캡처', 'radioGroup', 'imgCap'], ['[이미지] 선택', 'radioGroup', 'imgSel'],
    ['[텍스트] 선택', 'radioGroup', 'txtSel'], ['[텍스트] 단답형', 'radioGroup', 'txtWrite']];

// @inject("loginStore") @observer
class PageLabelingRegister extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {value: ''};
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({value: e.target.value});
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
                    <Grid.Column>
                        <p className="subjectHeader">라벨링 유형</p>
                        <Form>
                            {list.map((item:any)=>{
                                return(
                                    <Form.Field key={item}>
                                        <Radio
                                            className="subjectRadio"
                                            label={item[0]}
                                            name={item[1]}
                                            value={item[2]}
                                            // checked={this.state.value === 'this'}
                                            // onChange={this.handleChange}
                                        />
                                    </Form.Field>
                                );
                            })}
                        </Form>
                    </Grid.Column>
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
                            <JInput
                                label="보상 설정"
                                placeholder="보상 금액을 입력해주세요."
                                value={''}
                                type="text"
                            />
                        </Grid.Column>
                        <Grid.Column>
                            <p className="subjectHeader">기한 설정</p>
                            드롭다운으로 할련다...
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <p className="subjectHeader">데이터 셋 업로드(.zip)</p>
                            {/*TODO: 파일 업로드*/}
                            <Form>
                                <TextArea placeholder='파일을 드래그하거나 가져와주세요.' style={{minHeight: 200}}/>
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
