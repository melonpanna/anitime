import React, { useEffect } from "react";
import NavBar from "./NavBar";
import { styled } from "styled-components";
import Logo from "./Logo";
import Notice from "../Notice/Notice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const member = useSelector((state) => state.member);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const shleterWhiteList = ["/mypage", "/donation/write"];
    if (
      member.memberKind === 1 &&
      !shleterWhiteList.some((element) => element === location.pathname)
    ) {
      navigate("/mypage");
    }
  }, [location]);
  return (
    <StyleHeader>
      <HeaderDiv>
        <Logo />
        <div style={{ flexGrow: 1 }}>
          {(!member.token || member.memberKind === 0) && <NavBar />}
        </div>
        <HeaderRight>
          <Link to={"/faq"}>
            <Img src="/icons/header/ic_help.svg" alt="help" />
          </Link>
          <Notice />
          <Link to={"/mypage"}>
            <Img src="/icons/header/ic_account.svg" alt="account" />
          </Link>
        </HeaderRight>
      </HeaderDiv>
    </StyleHeader>
  );
}

const StyleHeader = styled.header`
  background-color: white;
  position: fixed;
  top: 0px;
  width: 100vw;
  z-index: 1;
  border-bottom: 1px solid #d7d7d7;
  min-height: 80px;
  display: flex;
`;

const HeaderDiv = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  min-width: 800px;
  max-width: 1240px;
  margin: auto;
`;

const HeaderRight = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 160px;
`;

const Img = styled.img`
  cursor: pointer;
`;
