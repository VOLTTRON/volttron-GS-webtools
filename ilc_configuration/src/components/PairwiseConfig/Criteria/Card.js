import React, { useRef, useContext } from 'react'
import MasterDriverContext from '../../../context/masterDriverContext';
import ClusterContext from '../../../context/clusterContext'
import { useDrag, useDrop } from 'react-dnd'
import { IconButton } from '../../common/_styledButton'
import CloseIcon from '@material-ui/icons/Close'
import { createPairwiseConfiguration } from '../../../utils/createPairwiseConfig'
import {_CRITERIA, _PAIRWISE} from '../../../constants/strings'

const style = {
  border: '1px solid gray',
  borderRadius: '1rem',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: '#94a895',
  cursor: 'move',
  fontSize: '1rem'
}

const clone = (obj) => JSON.parse(JSON.stringify(obj));

const Card = ({ id, text, index, moveCard }) => {
  let {configuration, setConfiguration} = useContext(MasterDriverContext);
  let { clusterFocus } = useContext(ClusterContext);
  const ref = useRef(null)

  const deleteCriteria = (text) => {
    // find and delete the criteria
    let newConfiguration = clone(configuration)
    for(const index in newConfiguration["criteria"][clusterFocus]){
      if (newConfiguration["criteria"][clusterFocus][index]["text"] === text){
        newConfiguration["criteria"][clusterFocus].splice(index, 1);
        // delete criteria from pairwise config
        delete newConfiguration[`${clusterFocus}${_PAIRWISE}`]["curtail"][text]
        for(const [key, value] of Object.entries(newConfiguration[`${clusterFocus}${_PAIRWISE}`]["curtail"])){
          delete value[text];
        }
        if(newConfiguration[`${clusterFocus}${_PAIRWISE}`]["augment"]){
          delete newConfiguration[`${clusterFocus}${_PAIRWISE}`]["augment"][text]
          for(const [key, value] of Object.entries(newConfiguration[`${clusterFocus}${_PAIRWISE}`]["augment"])){
            delete value[text];
          }
        }
        // delete criteria from criteria config
        Object.keys(newConfiguration[`${clusterFocus}${_CRITERIA}`]).forEach(deviceName => {
          if(deviceName!=="mapper"){
            delete(newConfiguration[`${clusterFocus}${_CRITERIA}`][deviceName][deviceName]["curtail"][text])
            if(newConfiguration[`${clusterFocus}${_CRITERIA}`][deviceName][deviceName]["augment"]){
              delete(newConfiguration[`${clusterFocus}${_CRITERIA}`][deviceName][deviceName]["augment"][text])
            }
          }
        })
        setConfiguration(newConfiguration);
        return;
      }
    }
  }

  const [, drop] = useDrop({
    accept: "card",
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current.getBoundingClientRect()
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      // Determine mouse position
      const clientOffset = monitor.getClientOffset()
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);
      configuration = createPairwiseConfiguration(configuration, clusterFocus)
      setConfiguration(configuration)
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    },
  })
  const [{ isDragging }, drag] = useDrag({
    item: { type: "card", id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })
  const opacity = isDragging ? 0 : 1
  drag(drop(ref))
  return (
    <div ref={ref} style={{ ...style, opacity, position: "relative" }}>
      {text}
      <IconButton><CloseIcon onClick = {() => {return deleteCriteria(text)}}/></IconButton>
    </div>
  )
}
export default Card
