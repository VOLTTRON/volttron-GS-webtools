import React, { useContext } from "react";
import { StyledDiv } from './_styledFilePreview';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import MasterDriverContext from "../../context/masterDriverContext";

const TreeFilePreview = props => {
    const {configuration} = useContext(MasterDriverContext);

    const nodeIds = [];


    // Utility function to assign unique modifiers based of uuidv4 specification
    const uuidv4 = () => {
        let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
        nodeIds.push(uuid);
        return uuid;
    }


    // Recursive functional component that parses the configuration objects and creates the tree structure
    const getTreeItemsFromData = treeItems => {
        return Object.keys(treeItems).map(treeItemData => {
            let children = undefined;
            if (treeItems[treeItemData] instanceof Object) {
                if (Object.keys(treeItems[treeItemData]).length === 0) {
                    children = <TreeItem key={treeItemData} nodeId={uuidv4()} label={JSON.stringify(treeItems[treeItemData])} />
                } else {
                    children = getTreeItemsFromData(treeItems[treeItemData]);
                }
            }
            return (
                <TreeItem key={treeItemData} nodeId={uuidv4()} label={treeItemData}>
                    {children
                        ? children
                        : <TreeItem
                            key={treeItems[treeItemData].toString().concat(uuidv4())}
                            nodeId={uuidv4()}
                            label={treeItems[treeItemData].toString()} />
                    }
                </TreeItem>
            );
        });
    };


    // Wrapper functional component for getTreeItemsFromData that loops through the individual configurations
    const ShowAllConfigs = ({ configurations }) => {
        return (
            Object.keys(configurations).map(config => {
                return (
                    <TreeItem key={config} nodeId={uuidv4()} label={config}>
                        {getTreeItemsFromData(configuration[config])}
                    </TreeItem>
                )
            })
        )
    }


    return (
        <StyledDiv>
            <TreeView defaultCollapseIcon={<ExpandMoreIcon />} defaultExpandIcon={<ChevronRightIcon />}>
                <ShowAllConfigs configurations={configuration} />
            </TreeView>
        </StyledDiv>
    );
};

export default TreeFilePreview;