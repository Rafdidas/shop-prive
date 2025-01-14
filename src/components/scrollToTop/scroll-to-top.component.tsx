import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // 스크롤을 맨 위로 이동
  }, [location.pathname]); // 경로가 변경될 때마다 실행

  return null;
};

export default ScrollToTop;