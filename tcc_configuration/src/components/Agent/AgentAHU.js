import React, { useContext} from 'react';
import { FormControl } from '../common/_styledFormControl';
import { TextField } from '@material-ui/core';
import { cloneObj } from '../common/utility';

import { default as MasterDriverContext } from "../../context/masterDriverContext"


export default function AgentAHU(props) {
    const {configuration, setConfiguration} = useContext(MasterDriverContext);

    const handleChange = (e, parameter) => {
        let config = cloneObj(configuration)
        config[parameter] = e.target.value
        setConfiguration(config)
    }

    return (
        <>
            <FormControl>
                <TextField
                    id={"supplierMarketNameText"}
                    key={"supplierMarketNameText"}
                    label="Supplier Market Name"
                    defaultValue={configuration["supplier_market_name"]}
                    type="string"
                    onChange={e => handleChange(e, "supplier_market_name")}
                />
            </FormControl>
            <FormControl>
                <TextField
                    id={"consumerMarketNameText"}
                    key={"consumerMarketNameText"}
                    label="Consumer Market Name"
                    defaultValue={configuration["consumer_market_name"]}
                    type="string"
                    onChange={e => handleChange(e, "consumer_market_name")}
                />
            </FormControl>
        </>
    );
}
