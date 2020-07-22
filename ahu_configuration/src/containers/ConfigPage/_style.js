import styled from 'styled-components';

export const StyledDivWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-flow: row;
  height: calc(100vh - 80px);
`;

export const StyledDivContentWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  min-height: 100%;
  flex-direction: column;
`;

export const StyledDivLeft = styled.div`
  display: flex;
  width: 25%;
  height: 100%;
  min-height: 100%;
  order: 0;
  flex-flow: column;
  padding-bottom: 16.2px;
  background-color: #2d2d2d;
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  overflow: auto;
`;

export const StyledDivTop = styled.div`
  display: flex;
  width: 100%;
  height: 10%;
  order: 1;
  flex-flow: row;
  float: right;
  z-index: 0;
  box-shadow: 0 2px 13px -5px rgba(0, 0, 0, 1);
`;

export const StyledDivMain = styled.div`
  display: flex;
  width: 100%;
  height: 90%;
  order: 2;
  flex-flow: row;
  float: right;
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;