function TrelloApp(currState={}, action) {
  switch(action.type) {
    case 'ADD_CARD':
      const list = currState.currentBoard.lists.find(list => list.id === action.payload.listId);
      const index = currState.currentBoard.lists.indexOf(list);
      const newList = Object.assign({}, list, {
        cards: [...list.cards, { id: '' + Math.random()*89793113, text: action.payload.text }]
      });
      return Object.assign({}, currState, {
        currentBoard: Object.assign({}, currState.currentBoard, {
          lists: [
            ...currState.currentBoard.lists.slice(0, index),
            newList,
            ...currState.currentBoard.lists.slice(index+1)
          ]
        })
      });

    case 'EDIT_BOARD':
      return Object.assign({}, currState, {
        currentBoard: Object.assign({}, currState.currentBoard, {
          name: action.payload.newName
        })
    })
     
    case 'CREATE_LIST':
      const newLists = [...currState.currentBoard.lists, {id: '' + Math.random()*89793113, name: action.payload.name, cards: [] } ];
      return Object.assign({}, currState, {
        currentBoard: Object.assign({}, currState.currentBoard, {
          lists: newLists
        })
      })

    case 'EDIT_LIST':
      const lists = currState.currentBoard.lists.find((val) => val.id == action.payload.listId);
      const indexX = currState.currentBoard.lists.indexOf(lists);
      const newListss = [...currState.currentBoard.lists.slice(0, indexX),
                        Object.assign({}, currState.currentBoard.lists[indexX], {
                          name: action.payload.name
                        }),
                        ...currState.currentBoard.lists.slice(indexX + 1)
                        ]

      return Object.assign({}, currState, {
        currentBoard: Object.assign({}, currState.currentBoard, {
          lists: newListss
        })
      })


    case 'MOVE_LIST':
      const moveLists = currState.currentBoard.lists.map((list, index) => {
        if(index == action.payload.fromPosition) {
          return currState.currentBoard.lists[action.payload.toPosition]
        } else if (index == action.payload.toPosition)  {
          return currState.currentBoard.lists[action.payload.fromPosition]
        } else {
          return list
        }
      })
      return Object.assign({}, currState, {
        currentBoard: Object.assign({}, currState.currentBoard, {
          lists: moveLists
        })
      })

    case 'EDIT_CARD':
     const getList = currState.currentBoard.lists.find(ele => ele.id == action.payload.listId);
     const getListIndex = currState.currentBoard.lists.indexOf(getList);
     const getCard = getList.cards.find(ele => ele.id == action.payload.cardId);
     const getCardIndex = getList.cards.indexOf(getCard);

     const newCardList = [
       ...getList.cards.slice(0, getCardIndex),
       Object.assign({}, getList.cards[getCardIndex], {
         text: action.payload.newText
       }),
       ...getList.cards.slice(getCardIndex + 1)
     ];

     const newEditedList = [
       ...currState.currentBoard.lists.slice(0, getListIndex),
       Object.assign({}, currState.currentBoard.lists[getListIndex], {
        cards: newCardList
       }),
       ...currState.currentBoard.lists.slice(getListIndex + 1)
     ];

    return  Object.assign({}, currState, {
      currentBoard: Object.assign({}, currState.currentBoard, {
        lists: newEditedList
      })
    })

    case 'MOVE_CARD':
      const fromList = currState.currentBoard.lists.find(list => list.id == action.payload.fromListId);
      const fromListIndex = currState.currentBoard.lists.indexOf(fromList);      
      const sourceCardRemoved = currState.currentBoard.lists[fromListIndex].cards.filter(card => {
        return card.id !== action.payload.cardId
      })
      const removedCardList = Object.assign({}, currState.currentBoard.lists[fromListIndex], {
        cards: sourceCardRemoved
      })

      const sourceCard = currState.currentBoard.lists[fromListIndex].cards.filter(card => {
        return card.id == action.payload.cardId
      })

      const moveCard = currState.currentBoard.lists.find(list => list.id == action.payload.toListId);      
      const toListIndex = currState.currentBoard.lists.indexOf(moveCard);
      const movedCards = [
        ...moveCard.cards.slice(0, action.payload.toListPosition),
        sourceCard[0],
        ...moveCard.cards.slice(action.payload.toListPosition)
      ]

      const addedCardList = Object.assign({}, currState.currentBoard.lists[toListIndex], {
        cards: movedCards
      })

      const newMovedLists = currState.currentBoard.lists.map(list => {
        if(list.id == action.payload.fromListId) {
          return removedCardList
        } else if(list.id == action.payload.toListId) {
          return addedCardList
        } else {
          return list
        }
      })
     
      return Object.assign({}, currState, {
        currentBoard: {
          lists: newMovedLists
        }
      })

    default:
      return currState;
  }
}

/*
  {
    currentBoard: {
      id: ,
      name: ,
      lists: [{
        id: ,
        name: ,
        text: 
      }]
    }
  }

  {
    type: 'ADD_CARD',
    payload: {
      listId: '',
      text: ''
    }
  }

  {
    type: 'CREATE_LIST',
    payload: {
      name: ''
    }
  }

  {
    type: 'EDIT_CARD',
    payload: {
      listId: ,
      cardId: ,
      newText: 
    }
  }

  {
    type: 'DELETE_CARD',
    payload: {
      listId: '',
      cardId: ''
    }
  }

  {
    type: 'DELETE_LIST',
    payload: {
      listId: ''
    }
  }

  {
    type: 'MOVE_CARD',
    payload: {
      fromListId: ,
      toListId: ,
      toListPosition: 
    }
  }

  {
    type: 'MOVE_LIST',
    payload: {
      fromPosition: '',
      toPosition: ''
    }
  }

  {
    type: 'EDIT_LIST',
    payload: {
      listId: '',
      newName:
    }
  }

  {
    type: 'EDIT_BOARD',
    payload: {
      newName:
    }
  }
*/



module.exports = TrelloApp;