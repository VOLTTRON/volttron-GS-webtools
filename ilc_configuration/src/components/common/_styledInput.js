import styled from 'styled-components'


export const FloatInput = styled.input`
    border: none;
    border-bottom: solid 1px rgba(0, 0, 0, 0.5);
    color: ${(props) => (props.darkMode ? "white" : "black")};
    background-color: ${(props) => (props.darkMode ? "#424242" : "white")};

`

export const FloatInputGray = styled(FloatInput)`
    background-color: #f1f3f1;
`