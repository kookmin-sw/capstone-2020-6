import React from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {Container, Grid, Table} from 'semantic-ui-react';
import "./PagePoints.css"
import UserStore from '../stores/UserStore'
import { inject, observer } from 'mobx-react';

interface Props extends RouteComponentProps<any>{
  userStore?: UserStore
}

@inject("userStore") @observer
class PagePoints extends React.Component<Props> {
  render() {
    return (
      <Container>
        
        <br/>
        <h2>포인트 관리</h2>
        <div className="point-newPoint">
          <span onClick={this.props.userStore?.getPoint}>충전하기</span>
        </div>
        <div className="point-mypoint">
          현재 회원님이 보유하고 계신 포인트
          <div>{this.props.userStore?.point.toLocaleString()}P</div>
        </div>

        <h3>최근 포인트 수입/지출 내역</h3>
        <Table celled>
          <Table.Header>
            <Table.Row textAlign="center">
              <Table.HeaderCell width={1}>#</Table.HeaderCell>
              <Table.HeaderCell width={2}>포인트 변동</Table.HeaderCell>
              <Table.HeaderCell width={2}>포인트 누적</Table.HeaderCell>
              <Table.HeaderCell>내용</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell textAlign="center">1</Table.Cell>
              <Table.Cell textAlign="center">-100,000P</Table.Cell>
              <Table.Cell textAlign="center">100,000P</Table.Cell>
              <Table.Cell>의뢰 생성으로 인한 포인트 예치</Table.Cell>
            </Table.Row>
            {
              [2,3,4,5,6,7,8,9,10,11].map((item:any) => {
                return (
                  <Table.Row>
                    <Table.Cell textAlign="center">{item}</Table.Cell>
                    <Table.Cell textAlign="center">+10,000P</Table.Cell>
                    <Table.Cell textAlign="center">10,000P</Table.Cell>
                    <Table.Cell>포인트 충전</Table.Cell>
                  </Table.Row>
                )
              })
            }
          </Table.Body>
        </Table>
      </Container>
    );
  }
}

export default withRouter(PagePoints);
