import styled from 'styled-components'

export const SmallLabel = styled.div`
    padding: 0;
    font-size: 11px;
    text-align: left;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-weight: 400;
    line-height: 1;
    letter-spacing: 0.00938em;
    margin-bottom: .5rem;
    color: ${(props) => (props.darkMode ? "white" : "black")};
`

export const Label = styled.div`
    padding: 0;
    font-size: 14px;
    text-align: left;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-weight: 400;
    line-height: 1;
    letter-spacing: 0.00938em;
    margin-bottom: .5rem;
    color: ${(props) => (props.darkMode ? "white" : "black")};
`