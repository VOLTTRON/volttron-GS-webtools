import styled from 'styled-components';
import {Card as card} from '@material-ui/core';

export const Card = styled(card)`
    display: ${(props) => (props.display? props.display : null)};
`;