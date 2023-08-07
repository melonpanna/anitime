import http from "api/commonHttp";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { keyframes, styled } from "styled-components";
import {
  WriteContainer,
  WriteTitle,
  Row,
  InputLabel,
  Input,
  Poster,
  Red,
} from "styled/styled";

export default function MissingRegistPage() {
  const general = useSelector((state) => state.member);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [kind, setKind] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [specialMark, setSpecialMark] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [location, setLocation] = useState("");
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [image, setImage] = useState(null);
  const [imageurl, setImageurl] = useState(null);

  // select box 클릭시 border 생기는 처리
  const [kindBoxClicked, setKindBoxClicked] = useState(false);
  const [yearBoxClicked, setYearBoxClicked] = useState(false);
  const [monthBoxClicked, setMonthBoxClicked] = useState(false);
  const [dayBoxClicked, setDayBoxClicked] = useState(false);
  // select box 이외의 영역 클릭시 닫히는 처리
  const kindBoxClose = useRef();
  //   const yearBoxClose = useRef();
  //   const monthBoxClose = useRef();
  //   const dayBoxClose = useRef();
  const selectBoxCloseHandler = ({ target }) => {
    if (!kindBoxClose.current.contains(target)) setKindBoxClicked(false);
    // if (!yearBoxClose.current.contains(target)) setYearBoxClicked(false);
    // if (!monthBoxClose.current.contains(target)) setMonthBoxClicked(false);
    // if (!dayBoxClose.current.contains(target)) setDayBoxClicked(false);
  };
  useEffect(() => {
    window.addEventListener("click", selectBoxCloseHandler);
    return () => {
      window.removeEventListener("click", selectBoxCloseHandler);
    };
  });

  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();

    if (name === "") {
      alert("이름은 필수 입력 항목입니다.");
      return;
    }
    if (category === "" || kind === "") {
      alert("품종은 필수 입력 항목입니다.");
      return;
    }
    if (gender === "") {
      alert("성별은 필수 입력 항목입니다.");
      return;
    }
    if (year === "" || month === "" || day === "") {
      alert("실종일은 필수 입력 항목입니다.");
      return;
    }
    if (location === "") {
      alert("실종위치는 필수 입력 항목입니다.");
      return;
    }

    const profile = {
      generalNo: general.memberNo,
      profileName: name,
      profileKind: category,
      detailKind: kind,
      sexCode: gender,
      profileAge: age,
      specialMark: specialMark,
      year: year,
      month: month,
      day: day,
      profileLocation: location,
      lat: lat,
      lon: lon,
      weight: weight,
    };
    const profileJSON = JSON.stringify(profile);
    const formData = new FormData();
    formData.append("profile", profileJSON);
    formData.append("image", image);

    http
      .post(`profile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("success");
        navigate("/missing");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "96px",
        marginBottom: "40px",
      }}
    >
      <WriteContainer>
        <h2 style={{ textAlign: "left", margin: 0 }}>실종동물등록</h2>
        <div
          style={{
            fontSize: "14px",
            textAlign: "right",
            marginBottom: "60px",
            color: "var(--darkgrey, #7d848a)",
          }}
        >
          <Red>*</Red>
          <span className="darkgrey">는 필수 입력 항목입니다</span>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={{ margin: 0, display: "flex", gap: "56px" }}>
            <div style={{ flex: 4, alignItems: "center", maxWidth: "100%" }}>
              <WriteTitle>실종동물 정보</WriteTitle>
              <Row>
                <InputLabel htmlFor="title">
                  이름<Red>*</Red>
                </InputLabel>
                <Input
                  type="text"
                  value={name}
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                  placeholder="이름"
                />
              </Row>
              <Row>
                <InputLabel htmlFor="category">
                  품종<Red>*</Red>
                </InputLabel>
                <SelectBox
                  onClick={() => setKindBoxClicked(!kindBoxClicked)}
                  style={
                    kindBoxClicked
                      ? { border: "1px solid var(--primary, #3994f0)" }
                      : { border: "0.77px solid var(--lightgrey, #e8ebee)" }
                  }
                  ref={kindBoxClose}
                >
                  <Selected>
                    <SelectedValue
                      style={
                        category === ""
                          ? { color: "var(--grey-2, #A7AEB4)" }
                          : { color: "color: var(--blackgrey, #35383B)" }
                      }
                    >
                      {category === "" ? "축종" : category}
                    </SelectedValue>
                    <div style={{ marginRight: 16 }}>
                      <img src="/icons/ic_arrow_select.svg" />
                    </div>
                  </Selected>
                  {kindBoxClicked && (
                    <OptionBox>
                      <OptionElement onClick={() => setCategory("개")}>
                        개
                      </OptionElement>
                      <OptionElement onClick={() => setCategory("고양이")}>
                        고양이
                      </OptionElement>
                    </OptionBox>
                  )}
                </SelectBox>
                <Input
                  type="text"
                  value={kind}
                  onChange={(e) => setKind(e.target.value)}
                  placeholder="품종"
                />
              </Row>
              <Row>
                <InputLabel>
                  성별<Red>*</Red>
                </InputLabel>
                <RadioBox>
                  <input
                    type="radio"
                    id="F"
                    name="gender"
                    value="F"
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <label htmlFor="F">암컷</label>
                  <input
                    type="radio"
                    id="M"
                    name="gender"
                    value="M"
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <label htmlFor="M">수컷</label>
                </RadioBox>
              </Row>
              <Row>
                <InputLabel htmlFor="age">
                  출생연도<Red>*</Red>
                </InputLabel>
                <Input
                  type="number"
                  value={age}
                  id="age"
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="출생연도"
                />
              </Row>
              <Row>
                <InputLabel htmlFor="weight">몸무게</InputLabel>
                <Input
                  type="number"
                  value={weight}
                  id="weight"
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="몸무게(kg)"
                />
              </Row>
              <Row>
                <InputLabel htmlFor="specialMark">성격 및 기타</InputLabel>
                <Input
                  type="text"
                  value={specialMark}
                  id="specialMark"
                  onChange={(e) => setSpecialMark(e.target.value)}
                  placeholder="성격 및 기타"
                />
              </Row>
              {/* <Row>
                <InputLabel htmlFor="year">
                  실종일<Red>*</Red>
                </InputLabel>
                <SelectBox
                  onClick={() => setYearBoxClicked(!yearBoxClicked)}
                  style={
                    yearBoxClicked
                      ? { border: "1px solid var(--primary, #3994f0)" }
                      : { border: "0.77px solid var(--lightgrey, #e8ebee)" }
                  }
                  ref={yearBoxClose}
                >
                  <Selected>
                    <SelectedValue
                      style={
                        year === ""
                          ? { color: "var(--grey-2, #A7AEB4)" }
                          : { color: "color: var(--blackgrey, #35383B)" }
                      }
                    >
                      {year === "" ? "연도" : year}
                    </SelectedValue>
                    <div style={{ marginRight: 16 }}>
                      <img src="/icons/ic_arrow_select.svg" />
                    </div>
                  </Selected>
                  {yearBoxClicked && (
                    <OptionBox>
                      <OptionElement onClick={() => setCategory("개")}>
                        개
                      </OptionElement>
                      <OptionElement onClick={() => setCategory("고양이")}>
                        고양이
                      </OptionElement>
                    </OptionBox>
                  )}
                </SelectBox>
              </Row> */}
            </div>
          </div>
        </form>
      </WriteContainer>
    </div>
  );
}

const SelectBox = styled.div`
  flex: 1;
  background-color: var(--lightestgrey, #f7f8fa);
  border-radius: 12px;
  height: 50px;
  box-sizing: border-box;
  display: flex;
  position: relative;
  max-width: 50%;
  flex-shrink: 0;
`;

const Selected = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  justify-content: space-between;
  align-items: center;
`;

const SelectedValue = styled.div`
  color: var(--grey-2, #a7aeb4);
  font-size: 14px;
  font-weight: 400;
  flex: 1;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-left: 24px;
`;
const OptionBox = styled.ul`
  list-style-type: none;
  margin: 0px;

  background-color: var(--lightestgrey, #f7f8fa);
  border: 0.77px solid var(--lightgrey, #e8ebee);
  border-radius: 12px;
  box-sizing: border-box;
  // padding: 0px 8px 0px 8px;
  padding: 0;
  position: absolute;
  cursor: pointer;
  top: 58px;
  left: 0px;
  flex-direction: column;
  width: 100%;
  align-items: center;
  max-height: 300px;
  overflow-y: auto;
  z-index: 555;
  animation: ${keyframes`
    from {
            clip-path: polygon(0 0, 100% 0, 100% 0%, 0 0%);
            opacity: 0.5;
          }
          to {
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
            opacity: 1;
          }
  `} 0.5s forwards;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const OptionElement = styled.li`
  display: flex;
  width: 100%;
  align-items: center;
  height: 45px;
  padding: 0px 24px 0px 24px;
  box-sizing: border-box;
  overflow-y: auto;

  &:hover {
    background-color: #e8ebee;
  }
`;

const RadioBox = styled.div`
  width: 86%;
  margin: 0px 6% 0px 0px;
  line-height: 50px;

  input[type="radio"] {
    display: none;
  }

  label {
    position: relative;
    padding-left: 28px;
    margin-right: 40px;
    cursor: pointer;
    color: var(--darkgrey, #7d848a);
    font-size: 14px;
  }

  label:before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    border: 1px solid #e8ebee;
    border-radius: 50%;
    background-color: transparent;
    color: var(--darkgrey, #7d848a);
    font-size: 14px;
  }

  input[type="radio"]:checked + label:after {
    content: "";
    position: absolute;
    left: 11px;
    top: 50%;
    transform: translate(-50%, -50%) scale(0);
    width: 14px;
    height: 14px;
    background-color: #3994f0;
    border-radius: 50%;
    animation: ${keyframes`
    to {
      transform: translate(-50%, -50%) scale(1);
    }
  `} 0.3s forwards;
  }

  input[type="radio"]:checked + label {
    color: var(--darkestgrey, #535a61);
  }
`;