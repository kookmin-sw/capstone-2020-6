import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Container, Form, Button, Grid, Header, TextArea } from 'semantic-ui-react';
import "./PageLogin.css"
import JInput from '../components/JInput';
import { inject, observer } from 'mobx-react';
import LabelingRegisterStore from '../stores/LabelingRegisterStore';
import JSelect from '../components/JSelect';
import TsDropDown from '../components/TsDropDown';
import FileUpload from "../components/FileUpload";

import './PageLabelingRegister.css';

interface Props extends RouteComponentProps<any> {
    navigate?: any,
    labelingRegisterStore?: LabelingRegisterStore
}

interface State {
    value: string;
}

const years: any = []
const months: any = []
const days: any = []

const nowDate: Date = new Date()

for (let i: number = nowDate.getFullYear(); i < nowDate.getFullYear() + 2; i++) {
    years.push({
        text: i + "년",
        value: i
    })
}

for (let i: number = 1; i <= 12; i++) {
    months.push({
        text: i + "월",
        value: i
    })
}

for (let i: number = 1; i <= 31; i++) {
    days.push({
        text: i + "일",
        value: i
    })
}

@inject("labelingRegisterStore") @observer
class PageLabelingRegister extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            value: ""
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (e: any, { value }: State) => {
        console.log({ value });
        this.setState({ value });
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
                                value={this.props.labelingRegisterStore?.title}
                                onChange={this.props.labelingRegisterStore?.setTitle}
                                type="text"
                            />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={2}>
                        <Grid.Column>
                            <p className="subjectHeader">썸네일 이미지(jpg, png)</p>
                            <FileUpload type="img" onChange={this.props.labelingRegisterStore?.setImage}/>
                        </Grid.Column>
                        <Grid.Column>
                            <p className="subjectHeader">라벨링 유형</p>
                            <TsDropDown
                                placeholder={'라벨링 유형을 선택해주세요.'}
                                labelingType={this.props.labelingRegisterStore?.labelingOptions}
                                handleChange={this.props.labelingRegisterStore?.setLabelingOption}
                                value={this.props.labelingRegisterStore?.labelingOption}
                            />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <JInput
                                label="한줄 설명"
                                placeholder="한줄 설명을 적어주세요.(30자)"
                                onChange={this.props.labelingRegisterStore?.setOnelineDescription}
                                value={this.props.labelingRegisterStore?.onelineDescription}
                                type="text"
                            />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Form>
                                <p className="subjectHeader">상세 설명</p>
                                <TextArea
                                    placeholder='내용을 입력해주세요.'
                                    style={{ minHeight: 200 }}
                                    onChange={this.props.labelingRegisterStore?.setDetail}
                                    value={this.props.labelingRegisterStore?.detail}
                                />
                            </Form>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={2}>
                        <Grid.Column>
                            <Grid>
                                <Grid.Column>
                                    <br /><br />
                                    <JInput
                                        label="보상 설정"
                                        placeholder="보상 금액을 입력해주세요."
                                        onChange={this.props.labelingRegisterStore?.setReward}
                                        value={this.props.labelingRegisterStore?.reward}
                                        type="text"
                                    />
                                </Grid.Column>
                            </Grid>
                            <Grid>
                                <Grid.Column>
                                    <JInput
                                        label="총 횟수"
                                        placeholder="총 횟수를 적어주세요."
                                        onChange={this.props.labelingRegisterStore?.setCycle}
                                        value={this.props.labelingRegisterStore?.cycle}
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
                                            options={years}
                                            onChange={this.props.labelingRegisterStore?.setStartDateYear}
                                            value={this.props.labelingRegisterStore?.startDateYear}
                                        />
                                    </Grid.Column>
                                    <Grid.Column width={5}>
                                        <JSelect
                                            label="&nbsp;"
                                            placeholder="월"
                                            options={months}
                                            onChange={this.props.labelingRegisterStore?.setStartDateMonth}
                                            value={this.props.labelingRegisterStore?.startDateMonth}
                                        />
                                    </Grid.Column>
                                    <Grid.Column width={5}>
                                        <JSelect
                                            label="&nbsp;"
                                            placeholder="일"
                                            options={days}
                                            onChange={this.props.labelingRegisterStore?.setStartDateDay}
                                            value={this.props.labelingRegisterStore?.startDateDay}
                                        />
                                    </Grid.Column>
                                </Grid>
                                <Grid>
                                    <Grid.Column width={6}>
                                        <JSelect
                                            label="마감일"
                                            placeholder="년"
                                            options={years}
                                            onChange={this.props.labelingRegisterStore?.setEndDateYear}
                                            value={this.props.labelingRegisterStore?.endDateYear}
                                        />
                                    </Grid.Column>
                                    <Grid.Column width={5}>
                                        <JSelect
                                            label="&nbsp;"
                                            placeholder="월"
                                            options={months}
                                            onChange={this.props.labelingRegisterStore?.setEndDateMonth}
                                            value={this.props.labelingRegisterStore?.endDateMonth}
                                        />
                                    </Grid.Column>
                                    <Grid.Column width={5}>
                                        <JSelect
                                            label="&nbsp;"
                                            placeholder="일"
                                            options={days}
                                            onChange={this.props.labelingRegisterStore?.setEndDateDay}
                                            value={this.props.labelingRegisterStore?.endDateDay}
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
                                placeholder="라벨링 키워드를 해시 태그 형태로 입력해주세요. ( #콜라 #사이다 #맥주 #소주 ... )"
                                value={this.props.labelingRegisterStore?.keywords}
                                onChange={this.props.labelingRegisterStore?.setKeywords}
                                type="text"
                            />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={2}>
                        <Grid.Column>
                            <JSelect
                                label="데이터셋을 선택해주세요."
                                placeholder="데이터셋을 선택해주세요."
                                style={{ textAlign: "left" }}
                                options={this.props.labelingRegisterStore?.datasets}
                                onChange={this.props.labelingRegisterStore?.setDataset}
                                value={this.props.labelingRegisterStore?.dataset}
                            />
                        </Grid.Column>
                        <Grid.Column>
                            <JInput
                                label="데이터셋에서 추출할 임의의 데이터 개수"
                                placeholder="데이터셋에서 몇개의 데이터를 뽑아서 프로젝트를 진행할까요?"
                                onChange={this.props.labelingRegisterStore?.setCountDataset}
                                value={this.props.labelingRegisterStore?.countDataset}
                                type="text"
                            />
                        </Grid.Column>
                    </Grid.Row>
                    {
                        (this.props.labelingRegisterStore?.dataset !== "-1") ? (
                            <Grid.Row>
                                <Grid.Column>
                                    <span className="subjectHeader">데이터 셋 업로드(.zip)</span>
                                    <FileUpload type="zip" />
                                </Grid.Column>
                            </Grid.Row>
                        ) : <></>
                    }

                    <Grid.Row>
                        <Grid.Column style={{ textAlign: 'right' }}>
                            <Button
                                className="subjectBtn"
                                primary
                                size="medium"
                                onClick={this.props.labelingRegisterStore?.submit}
                            >
                                제출
                            </Button>
                        </Grid.Column>
                    </Grid.Row>

                </Grid>
            </Container>
        );
    }
};
export default withRouter(PageLabelingRegister);
