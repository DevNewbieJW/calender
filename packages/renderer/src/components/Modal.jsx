import React from "react";

import { FaWindowClose } from "react-icons/fa";
import { motion } from "framer-motion";

const Backdrop = ({ children, clicked }) => {
  return (
    <motion.div
      className="absolute top-0 left-0 h-full w-full z-30  bg-black bg-opacity-80 flex justify-center items-center"
      onClick={clicked}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};

const Modal = ({ handleClose, children }) => {
  const dropIn = {
    hidden: {
      y: "-100vh",
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
    },
    exit: {
      y: "100vh",
      opacity: 0,
    },
  };
  return (
    <Backdrop clicked={handleClose}>
      <motion.div
        className="w-4/6 h-3/4 m-auto border-2 border-white bg-slate-700 rounded"
        onClick={(e) => e.stopPropagation()}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="h-full w-full flex flex-col">
          <button className="absolute top-2 right-2" onClick={handleClose}>
            <FaWindowClose />
          </button>
          <div className="p-2">{children}</div>
        </div>
      </motion.div>
    </Backdrop>
  );
};

export default Modal;
