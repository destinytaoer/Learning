const CHANGE_TITLE_CONTENT = 'change_title_content';
const CHANGE_CONTENT_COLOR = 'change_content_color';
function createStore(reducer) {
  let state;
  function dispatch(action) {
    state = reducer(state, action)
  }
  dispatch({})

  let getState = () => JSON.parse(JSON.stringify(state));
  return {
    getState,
    dispatch
  }
}

let initState = {
  titleState: {
    color: 'red',
    text: '标题'
  },
  contentState: {
    color: 'green',
    text: '内容'
  }
}
function reducer(state=initState, action) {
  switch (action.type) {
    case CHANGE_TITLE_CONTENT:
      return {...state, titleState: {...state.titleState, text: action.text}}
    case CHANGE_CONTENT_COLOR:
      return {...state, contentState: {...state.contentState, color: action.color}}
  }
  return state;
}
let store = createStore(reducer)

function renderTitle() {
  let title = document.querySelector('.title')
  title.innerHTML = store.getState().titleState.text;
  title.style.color = store.getState().titleState.color;
}
function renderContent() {
  let content = document.querySelector('.content')
  content.innerHTML = store.getState().contentState.text;
  content.style.color = store.getState().contentState.color;
}
function renderApp() {
  renderTitle()
  renderContent()
}
renderApp()

setTimeout(() => {
  store.dispatch({ type: CHANGE_TITLE_CONTENT, text: '长标题' });
  store.dispatch({ type: CHANGE_CONTENT_COLOR, color: 'blue' });
  renderApp();
}, 2000);