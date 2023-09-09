import { useState } from "react";
import PropTypes from "prop-types";

import { MyContext } from "./MyContext";

export function Provider({ children }) {
  const [fileInfos, setFileInfos] = useState(null);
  const [isValid, setIsValid] = useState(false);
  const [hasFile, setHasFile] = useState(false);
  const [errors, setErrors] = useState([]);

  const states = {
    fileInfos,
    setFileInfos,
    isValid,
    setIsValid,
    hasFile,
    setHasFile,
    errors,
    setErrors
  }

  return (
    <main>
      <MyContext.Provider value={ states }>
        { children }
      </MyContext.Provider>
    </main>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
