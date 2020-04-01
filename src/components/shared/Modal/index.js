import { SHOW_MODAL } from "store/constants/modalConstants";
import React from "react";
import { createPortal } from "react-dom";
import { connect } from "react-redux";
import modalActions from "store/actions/modalActions";
import "./Modal.scss";

const modalRoot = document.getElementById("modal");

class PortalModal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.element = document.createElement("div");
  }

  componentDidMount() {
    modalRoot.appendChild(this.element);
  }
  componentWillUnmount() {
    modalRoot.removeChild(this.element);
  }

  render() {
    return createPortal(this.props.children, this.element);
  }
}

class WrappedModal extends React.PureComponent {
  constructor() {
    super();
    this.modalEl = React.createRef();
  }

  handleClose = () => {
    this.props.onClose();
  };

  render() {
    const visible = this.props.visible;
    return (
      <PortalModal>
        <div
          ref={this.modalEl}
          className="modal"
          style={{ display: this.props.visible ? "block" : "none" }}
        >
          <div className="modal-content">
            <span className="close" onClick={this.props.onClose}>
              &times;
            </span>
            <h1>{this.props.title}</h1>

            <p>{this.props.content}</p>
          </div>
        </div>
      </PortalModal>
    );
  }
}

const mapStateToProps = state => ({
  title: state.modalReducer.title,
  visible: state.modalReducer.visible,
  content: state.modalReducer.content,
  component: state.modalReducer.component
});

const mapDispatchToProps = {
  onClose: modalActions.closeModal,
  onOpen: modalActions.openModal
};

//połączyć redux z componentem
export default connect(mapStateToProps, mapDispatchToProps)(WrappedModal);

/* <Modal
            title={this.props.title}
            visible={visible}
            footer={null}
            maskClosable={true}
            onCancel={this.handleClose}
            closeIcon={<CloseCircleOutlined />}
            onClick={this.handleClose}
            getContainer={() => this.dom}
            width={756}
          >
            {(this.props.component && (
              <this.props.component
                style={{ cursor: "pointer" }}
                onClick={this.handleFullScreen}
              />
            )) || <p>{this.props.content}</p>}
          </Modal> */
