import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import { Button } from "styled/styled";
import { ProgressBar } from "styled/styled";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import http from "api/commonHttp";
import html2canvas from "html2canvas";

export default function ReservationForm() {
  const generalNo = useSelector((state) => state.member.memberNo);
  const reservedDate = useSelector((state) => state.reservedDate);
  const { desertionNo } = useParams();
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [address, setAddress] = useState("");
  //객체를 그냥 name:"asdf",phone:"000" 형태로 할까?
  const inquiryTop = ["이름", "전화번호", "이메일", "주소", "가족 구성원"];
  const inquiryBottom = [
    "1. 반려동물을 입양하시는 이유가 무엇입니까?",
    "2. 입양을 고민하고 결정하는데 어느 정도의 기간이 걸렸고 무엇이 가장 크게 작용했습니까?",
    "3. 반려동물을 키울 수 있는 환경을 충분히 인지하고 준비하고 있습니까? 어떤 준비를 하고 있는지 말씀해주세요.",
    // "4. 만약의 경우 입양 동물을 키우다가 더이상 양육할 여건이 되지 못할 시, 제3자에게 양도하지 않고 본 단체로 돌려보내 주실 것에 동의하십니까?",
    "5. 저희 단체에서 귀하의 가정을 방문하는 것에 대해서는 어떻게 생각하시나요?",
    "6. 귀하와 가족의 부재시(여행,명절,휴가 등) 반려동물을 어떻게 관리하실 예정이신가요?",
    "7. 그 외에 입양 신청에 관해 덧붙이고자 하시는 말씀이 있으시면 적어주시기 바랍니다.",
  ];
  const [inputTop, setInputTop] = useState({});
  const [inputBottom, setInputBottom] = useState({});
  const handleTextValueChangeTop = (e) => {
    const { name, value } = e.target;
    setInputTop((input) => {
      return { ...input, [name]: value };
    });
    // console.log(inputTop);
  };
  const handleTextValueChangeBottom = (e) => {
    const { name, value } = e.target;
    setInputBottom((input) => {
      return { ...input, [name]: value };
    });
  };
  const nullCheck = () => {
    if (!checked) {
      alert("약관에 동의해 주세요.");
      return;
    }
    if (
      !(
        Object.keys(inputTop).length === inquiryTop.length &&
        Object.keys(inputBottom).length === inquiryBottom.length
      )
    ) {
      alert("모든 답을 작성해 주세요.");
      return;
    }
    for (const key in inputTop) {
      if (inputTop[key] === null || inputTop[key] === "") {
        alert("모든 답을 작성해 주세요.");
        return;
      }
    }
    for (const key in inputBottom) {
      if (inputBottom[key] === null || inputBottom[key] === "") {
        alert("모든 답을 작성해 주세요.");
        return;
      }
    }
    //정보 성공적으로 전송
    Swal.fire({
      position: "center",
      // icon: "success",
      title: "미팅을 예약하시겠어요?",
      showCancelButton: true,
      confirmButtonColor: "#3994F0",
      confirmButtonText: "확인",
      cancelButtonText: "취소",
    }).then((res) => {
      if (res.isConfirmed) {
        capture((file) => {
          const data = new FormData();
          data.append("adoptionForm", file);
          data.append(
            `meetReservation`,
            new Blob([
              JSON.stringify({
                desertionNo: desertionNo,
                generalNo: generalNo,
                reservedDate: reservedDate.date + "T" + reservedDate.time,
              }),
            ]),
            {
              type: "application/json",
            }
          );
          http
            .post(`meet/reservation`, data, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((res) => {
              if (res.code === 200) {
                Swal.fire({
                  position: "center",
                  // icon: "success",
                  imageUrl: "/icons/img_complete.svg",
                  title: "성공적으로 예약되었습니다.",
                  showConfirmButton: false,
                  timer: 1000,
                }).then((res) => {
                  window.location.href = "/mypage";
                });
              }
            })
            .catch(() => {
              Swal.fire({
                position: "center",
                icon: "error",
                // imageUrl: "/icons/img_complete.svg",
                title: "오류가 발생했습니다.",
                showConfirmButton: false,
                timer: 1000,
              });
            });
        });
      } else return;
    });
  };
  function capture(callback) {
    html2canvas(document.querySelector("#form")).then((canvas) => {
      var imgBase64 = canvas.toDataURL("image/jpg", 1.0);
      var base64ImageContent = imgBase64.replace(
        /^data:image\/(png|jpg);base64,/,
        ""
      );
      var blob = base64ToBlob(base64ImageContent, "image/png");
      const file = new File([blob], "captured-image.jpg", {
        type: "image/png",
      });
      return callback(file);
    });
  }
  function base64ToBlob(base64, mime) {
    mime = mime || "";
    var sliceSize = 1024;
    var byteChars = window.atob(base64);
    var byteArrays = [];

    for (
      var offset = 0, len = byteChars.length;
      offset < len;
      offset += sliceSize
    ) {
      var slice = byteChars.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, { type: mime });
    return blob;
  }
  return (
    <PageContainer>
      <ProgressBar>
        <div>
          <img src={`/icons/Component 25.svg`} />
        </div>
        <div
          style={{
            width: "312px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              color: "#7D848A",
            }}
          >
            미팅일자 선택
          </div>
          <div
            style={{
              color: "#35383B",
              fontWeight: "bold",
            }}
          >
            신청서 작성
          </div>
        </div>
      </ProgressBar>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            fontSize: "24px",
            color: "#000000",
            fontWeight: "bold",
          }}
        >
          입양 상담 신청서
        </div>
        <div
          style={{
            fontSize: "16px",
            color: "#6F6F6F",
            height: "30px",
          }}
        >
          아래 신청서를 작성하여 제출해 주세요.
        </div>
      </div>
      <FormContainer id="form">
        <FormTop>
          <div
            style={{
              marginTop: "30px",
              marginBottom: "24px",
              textAlign: "left",
              textSize: "16px",
              fontWeight: "bold",
            }}
          >
            입양자 정보
          </div>
          {inquiryTop.map((v, i) => (
            <InputContainer>
              <div
                style={{
                  width: "92px",
                  textAlign: "left",
                  textSize: "14px",
                  color: "#A7AEB4",
                }}
              >
                {v}
              </div>
              <InputTop
                id={`inputTop${i}`}
                name={`inputTop${i}`}
                value={`inputTop${i}`.value}
                onChange={handleTextValueChangeTop}
              ></InputTop>
            </InputContainer>
          ))}
          {/* <InputContainer>
            <div
              style={{
                width: "92px",
                textAlign: "left",
                textSize: "14px",
                color: "#A7AEB4",
              }}
            >
              주소
            </div>
            <InputTop
              style={{ width: "467px" }}
              id="address"
              name="address"
              value={address}
              onChange={setAddress}
            ></InputTop>
            <Button
              style={{
                marginLeft: "8px",
                fontSize: "16px",
                fontWeight: "bold",
              }}
              width="154px"
              height="50px"
              background_color="#3994F0"
              color="#ffffff"
              margin="0px"
            >
              검색
            </Button>
          </InputContainer> */}
        </FormTop>
        <FormBottom>
          <div
            style={{
              marginTop: "15px",
              marginBottom: "24px",
              textAlign: "left",
              textSize: "16px",
              fontWeight: "bold",
            }}
          >
            사전 질문
          </div>
          {inquiryBottom.map((v, i) => (
            <div>
              <div
                style={{
                  height: "30px",
                  textAlign: "left",
                  textSize: "14px",
                  color: "#A7AEB4",
                  marginBottom: "8px",
                  marginTop: "8px",
                }}
              >
                {v}
              </div>
              <InputBottom
                id={`inputBottom${i}`}
                name={`inputBottom${i}`}
                value={`inputBottom${i}`.value}
                onChange={handleTextValueChangeBottom}
              ></InputBottom>
            </div>
          ))}
        </FormBottom>
        <div
          style={{
            display: "flex",
            marginTop: "20px",
            marginBottom: "30px",
          }}
        >
          <input
            id="contract"
            checked={checked}
            onChange={() => setChecked(() => !checked)}
            type="checkbox"
          />
          <label for="contract">약관에 동의합니다.</label>
        </div>
      </FormContainer>
      <Button
        onClick={nullCheck}
        style={{
          fontSize: "16px",
          fontWeight: "bold",
          marginTop: "20px",
        }}
        width="280px"
        height="50px"
        $background_color="#3994F0"
        color="#ffffff"
      >
        계속
      </Button>
    </PageContainer>
  );
}
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;
const FormContainer = styled.div`
  width: 881px;
  height: 937px;
  height: 100%;
  border: 0.77px solid #e8ebee;
  border-radius: 8px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const FormTop = styled.div`
  display: flex;
  width: 721px;
  flex-direction: column;
`;
const InputTop = styled.input`
  color: #35383b;
  box-sizing: border-box;
  padding-left: 24px;

  width: 629px;
  height: 50px;
  font-size: 14px;
  background-color: #f7f8fa;
  border: 0.77px solid #e8ebee;
  border-radius: 12px;
  &:focus {
    outline: none;
    border: 1px solid #3994f0;
  }
`;
const FormBottom = styled.div``;
const InputBottom = styled.input`
  color: #35383b;
  box-sizing: border-box;
  padding-left: 24px;
  width: 721px;
  height: 50px;
  font-size: 14px;
  background-color: #f7f8fa;
  border: 0.77px solid #e8ebee;
  border-radius: 12px;
  &:focus {
    outline: none;
    border: 1px solid #3994f0;
  }
`;
const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
`;
