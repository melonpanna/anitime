import { createBrowserRouter } from "react-router-dom";
import MyPage from "pages/MyPage";
import SelectTime from "components/SelectTime/SelectTime";
import ReservationForm from "components/SelectTime/ReservationForm";
import DesertionGuide from "components/Desertion/DesertionGuide";
import ErrorPage from "pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/login",
    async lazy() {
      return {
        Component: (await import("pages/LoginPage")).default,
      };
    },
  },
  {
    path: "/join",
    async lazy() {
      return {
        Component: (await import("pages/JoinPage")).default,
      };
    },
  },
  {
    path: "/kakaoLogin",
    async lazy() {
      return {
        Component: (await import("pages/KakaoResPage")).default,
      };
    },
  },
  {
    path: "donation/success",
    async lazy() {
      return {
        Component: (await import("pages/DonationSuccessPage")).default,
      };
    },
  },
  {
    path: "donation/fail",
    async lazy() {
      return {
        Component: (await import("pages/DonationFailPage")).default,
      };
    },
  },
  {
    path: "",
    async lazy() {
      return {
        Component: (await import("App")).default,
      };
    },
    children: [
      {
        path: "",
        async lazy() {
          return {
            Component: (await import("pages/MainPage")).default,
          };
        },
      },
      {
        path: "desertion",
        async lazy() {
          return {
            Component: (await import("pages/DesertionPage")).default,
          };
        },
      },
      {
        path: "desertion/reservation",
        children: [
          { path: "selecttime", element: <SelectTime /> },
          { path: "form", element: <ReservationForm /> },
          { path: "", element: <DesertionGuide /> },
        ],
        async lazy() {
          return {
            Component: (
              await import("components/Desertion/DesertionReservation")
            ).default,
          };
        },
      },
      {
        path: "missing",
        children: [
          {
            path: "",
            async lazy() {
              return {
                Component: (await import("pages/MissingPage")).default,
              };
            },
          },
          {
            path: "regist",
            async lazy() {
              return {
                Component: (await import("pages/MissingRegist")).default,
              };
            },
          },
          {
            path: "update",
            async lazy() {
              return {
                Component: (await import("pages/MissingUpdate")).default,
              };
            },
          },
        ],
      },
      {
        path: "mypage",
        element: <MyPage />,
      },
      {
        path: "path", // 경로
        async lazy() {
          return {
            // 컴포넌트 import
            Component: (await import("pages/RouterTestPage")).default,
          };
        },
      },
      {
        path: "openvidutest",
        async lazy() {
          return {
            Component: (await import("pages/Openvidutest")).default,
          };
        },
      },
      {
        path: "donation",
        async lazy() {
          return {
            Component: (await import("pages/DonationPage")).default,
          };
        },
      },
    ],
    errorElement: <ErrorPage />,
  },
  {
    path: "openvidutest",
    async lazy() {
      return {
        Component: (await import("pages/Openvidutest")).default,
      };
    },
  },
]);

export default router;
