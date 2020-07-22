import React, { useState, useCallback, useContext, useEffect } from 'react'
import ClusterContext from '../../../context/clusterContext'
import MasterDriverContext from '../../../context/masterDriverContext'
import Card from './Card'
import update from 'immutability-helper'

const Container = () => {

  const { clusterFocus } = useContext(ClusterContext);
  const { configuration, setConfiguration } = useContext(MasterDriverContext);
  const [cards, setCards] = useState(configuration["criteria"][clusterFocus])
  const [stateFocus, setStateFocus] = useState(clusterFocus)

  function arraysEqual(a1,a2) {
    return JSON.stringify(a1)==JSON.stringify(a2);
}

  useEffect(() => {
    let equalArrays = arraysEqual(cards, configuration["criteria"][clusterFocus])
    if (cards.length !== configuration["criteria"][clusterFocus].length){
      setCards(Array.from(configuration["criteria"][clusterFocus]))
    } else if (!equalArrays){
      configuration["criteria"][clusterFocus] = Array.from(cards);
      setConfiguration(configuration)
    } else if (clusterFocus !== stateFocus){
      setStateFocus(clusterFocus)
    }
  })
    const moveCard = useCallback(
      (dragIndex, hoverIndex) => {
        const dragCard = cards[dragIndex]
        setCards(
          update(cards, {
            $splice: [
              [dragIndex, 1],
              [hoverIndex, 0, dragCard],
            ],
          }),
        )
        setStateFocus(clusterFocus)
      },
      [cards],
    )
    const renderCard = (card, index) => {
      return (
          <Card
            key={card.id}
            index={index}
            id={card.id}
            text={card.text}
            moveCard={moveCard}
          />
      )
    }
    return (
      <>
        {cards.map((card, i) => renderCard(card, i))}
      </>
    )
  }
export default Container
