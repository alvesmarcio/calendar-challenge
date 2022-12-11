const Modal = ({ children, onClose, title, className }) => {
  return (
    <>
      <div className="overlay" onClick={onClose} />
      <div className={`modal ${className}`}>
        <h3>{title}</h3>
        <div className="inner">{children}</div>
      </div>
    </>
  );
};

export default Modal;
