import { MyContext } from "../context/MyContext";
import { useContext } from "react";
import { updateRequest } from '../utils/request-update';

export function UpdateBtn() {
  const { isValid, fileInfos, setFileInfo } = useContext(MyContext);

  const update = async () => {
    await updateRequest(fileInfos);
    setFileInfo(null);
  }

  return(
    <button
      id="btn"
      disabled={ !isValid }
      onClick={ update }
    >
      ATUALIZAR
    </button>
  )
}
