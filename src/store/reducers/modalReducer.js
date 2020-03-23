import { SHOW_MODAL, CLOSE_MODAL } from "store/constants/modalConstants";

const reducer = (state = { visible: false }, action) => {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        visible: true,
        title: action.title,
        content: action.content,
        component: action.component,
        fullSize: action.fullSize
      };
    case CLOSE_MODAL:
      return { visible: false };
    default:
      return state;
  }
};
export default reducer;
