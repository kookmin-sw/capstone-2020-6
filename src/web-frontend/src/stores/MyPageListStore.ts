import {
    observable,
    action
} from "mobx";

export default class MyPageListStore {
    @observable list: any = [];

    constructor() {
        this.list = [];
    }

    @action getAvailableMyPageList() {
        this.list = [
            {
                userType: "client",
                title: "개인 정보",
                description: "T-SAN 로그인시 사용하는 비밀번호를 변경할 수 있습니다. " +
                    "주기적인 비밀번호 변경을 통해 개인 정보를 안전하게 보호하세요.",
                btnType: "비밀번호 변경",
                route: "/mypage/pw",
            },
            {
                userType: "client",
                title: "프로젝트 관리",
                description: "T-SAN 에서 의로한 프로젝트를 한눈에 관리하세요. 완료된 프로젝트의 결과를 확인할 수 있습니다.",
                btnType: "프로젝트 관리",
                route: "/mypage/projects",
            },
            {
                userType: "client",
                title: "포인트 관리",
                description: "T-SAN 에서 사용한 포인트 내역을 확인할 수 있습니다.",
                btnType: "포인트 관리",
                route: "/mypage/points",
            },
        ];
    }
}
