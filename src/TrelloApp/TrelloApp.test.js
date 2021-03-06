const { createStore } = require('redux');
const TrelloApp = require('.');
const should = require('chai').should();

describe('TrelloApp', function() {
  it('should ADD_CARD', function() {
    const currState = {
      currentBoard: {
        id: 'b1',
        name: 'MyBoard',
        lists: [{
          id: '111',
          name: 'Some List Name',
          cards: [{
            id: 'abc',
            text: 'def'
          }, {
            id: 'abc1',
            text: 'def1'
          }]
        }, {
          id: '112',
          name: 'Some List Name 1',
          cards: []
        }]
      }
    }

    const action = {
      type: 'ADD_CARD',
      payload: {
        listId: '111',
        text: 'ghi'
      }
    };

    const store = createStore(TrelloApp, currState);
    store.dispatch(action);

    store.getState().should.have.property('currentBoard');
    store.getState().currentBoard.should.have.property('lists').and.be.an('array').of.length(2);
    store.getState().currentBoard.lists[0].should.have.property('cards').and.be.an('array').of.length(3);
    store.getState().currentBoard.lists[0].cards[2].should.have.property('id');
    store.getState().currentBoard.lists[0].cards[2].should.have.property('text').and.equal('ghi');
  });

  it('should EDIT_BOARD', function() {
    const currState = {
      currentBoard: {
        id: 'b1',
        name: 'MyBoard',
        lists: [{
          id: '111',
          name: 'Some List Name',
          cards: [{
            id: 'abc',
            text: 'def'
          }, {
            id: 'abc1',
            text: 'def1'
          }]
        }, {
          id: '112',
          name: 'Some List Name 1',
          cards: []
        }]
      }
    }

    const action = {
      type: 'EDIT_BOARD',
      payload: {
        newName: 'New Board'    
      }
    };

    const store = createStore(TrelloApp, currState);
    store.dispatch(action);   
    store.getState().should.have.property('currentBoard')
  });


  it('should CREATE_LIST', function() {
    const currState = {     
        currentBoard: {
          id: 'b1',
          name: 'MyBoard',
          lists: [
              {
                  id: '111',
                  name: 'Some List Name',
                  cards: [
                      {
                          id: 'abc',
                          text: 'def'
                      }, 
                      {
                          id: 'abc1',
                          text: 'def1'
                      }
                  ]
              }, 
              {
                  id: '112',
                  name: 'Some List Name 1',
                  cards: []
              }
          ]
        }
    }

    const action = {
      type: 'CREATE_LIST',
      payload: {
        name: 'Pending Item'
      }
    }

    const store = createStore(TrelloApp, currState);
    store.dispatch(action);    
    store.getState().currentBoard.lists.should.to.have.lengthOf(3)

  });
  
  

  it('should EDIT_LIST', function() {
    const currState = {     
      currentBoard: {
        id: 'b1',
        name: 'MyBoard',
        lists: [
            {
                id: '111',
                name: 'Some List Name',
                cards: [
                    {
                        id: 'abc',
                        text: 'def'
                    }, 
                    {
                        id: 'abc1',
                        text: 'def1'
                    }
                ]
            }, 
            {
                id: '112',
                name: 'Some List Name 1',
                cards: []
            }
        ]
      }
  }
    const action = {
      type: 'EDIT_LIST',
      payload: {
        listId: 112,
        name: 'Edited List Name'
      }
    }
    const store = createStore(TrelloApp, currState);
    store.dispatch(action);
    store.getState().currentBoard.lists.should.have.lengthOf(2);    
    store.getState().currentBoard.lists[1].should.have.property('name').and.equal('Edited List Name');

  });


  it('should MOVE_LIST', function() {
    const currState = {     
      currentBoard: {
        id: 'b1',
        name: 'MyBoard',
        lists: [
            {
                id: '111',
                name: 'Some List Name',
                cards: [
                    {
                        id: 'abc',
                        text: 'def'
                    }, 
                    {
                        id: 'abc1',
                        text: 'def1'
                    }
                ]
            }, 
            {
                id: '112',
                name: 'Some List Name 1',
                cards: []
            },
            {
              id: '113',
              name: 'Some List Name 2',
              cards: []
            },
            {
              id: '114',
              name: 'Some List Name 3',
              cards: []
            },
            {
              id: '115',
              name: 'Some List Name 4',
              cards: []
           },
        ]
      }
  }
  const action = {
    type: 'MOVE_LIST',
    payload: {
      fromPosition: '3',
      toPosition: '0'
    }
  }

    const store = createStore(TrelloApp, currState);
    store.getState().currentBoard.lists[0].should.have.property('id').and.equal('111');
    store.dispatch(action);
    store.getState().currentBoard.lists[0].should.have.property('id').and.equal('114');
    
  });


  it('should EDIT_CARD', function() {
    const currState = {     
      currentBoard: {
        id: 'b1',
        name: 'MyBoard',
        lists: [
            {
                id: '111',
                name: 'Some List Name',
                cards: [
                    {
                        id: 'abc',
                        text: 'def'
                    }, 
                    {
                        id: 'abc1',
                        text: 'def1'
                    }
                ]
            }, 
            {
                id: '112',
                name: 'Some List Name 1',
                cards: []
            }
        ]
      }
  }
    const action = {
      type: 'EDIT_CARD',
      payload: {
        listId: '111',
        cardId: 'abc1',
        newText: 'New Card'
      }
    }

    const store = createStore(TrelloApp, currState);
    store.dispatch(action);
    store.getState().currentBoard.lists[0].cards[1].should.have.property('text').and.equal('New Card');
  });


  it('should MOVE_CARD', function() {
    const currState = {     
      currentBoard: {
        id: 'b1',
        name: 'MyBoard',
        lists: [
            {
                id: '111',
                name: 'Some List Name',
                cards: [
                    {
                        id: 'abc',
                        text: 'def'
                    }, 
                    {
                        id: 'abc1',
                        text: 'def1'
                    }
                ]
            }, 
            {
                id: '112',
                name: 'Some List Name 1',
                cards: [
                  {
                    id: '1',
                    text: 'qweweq'
                  }, 
                  {
                    id: '2',
                    text: 'trtet'
                  }
                ]
            },
            {
              id: '113',
              name: 'Some List Name 2',
              cards: [
                {
                  id: '5',
                  text: 'qqqqq'
                }, 
                {
                    id: '6',
                    text: 'wwwww'
                }
              ]
            },
            {
              id: '114',
              name: 'Some List Name 3',
              cards: []
            },
            {
              id: '115',
              name: 'Some List Name 4',
              cards: []
           },
        ]
      }
    }
    const action = {
      type: 'MOVE_CARD',
      payload: {
        fromListId: '111',
        toListId: '112',
        toListPosition: '1',
        cardId: 'abc1'
      }
    }

    const store = createStore(TrelloApp, currState);
    store.getState().currentBoard.lists[0].cards.should.have.lengthOf(2);
    store.getState().currentBoard.lists[1].cards.should.have.lengthOf(2);
    store.dispatch(action);
    store.getState().currentBoard.lists[0].cards.should.have.lengthOf(1);
    store.getState().currentBoard.lists[1].cards.should.have.lengthOf(3);
  });
});