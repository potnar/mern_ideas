import { SHOW_MODAL, CLOSE_MODAL } from "store/constants/modalConstants";

export const openModal = ({ title, content }) => ({
  type: SHOW_MODAL,
  title,
  content
});

export const closeModal = () => ({
  type: CLOSE_MODAL
});

export default { openModal, closeModal };
