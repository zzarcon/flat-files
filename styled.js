import styled from 'styled-components';

export const AppWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 20px;
`;

export const JsonViewerWrapper = styled.div`
  height: 100vh;
  overflow: auto;
  flex: 1;
  margin-left: 30px;
  border-radius: 3px;
`;

export const DropzoneWrapper = styled.div`
  width: 600px;
  height: 350px;
  border: 10px dotted #5C4B51;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  transition: all .3s;
  text-shadow: 1px 1px 2px black;
  cursor: pointer;

  ${({isDragging}) => {
    if (isDragging) {
      return `
        border-color: #F06060;
        color: #F3B562;
      `;
    }
  }}
`;