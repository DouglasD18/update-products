import { useContext } from "react";
import { validateRequest } from "../utils/request-validate";
import { MyContext } from "../context/MyContext";

export function ValidateBtn() {
  const { fileInfos, setIsValid, setErrors } = useContext(MyContext);

  const isDisable = fileInfos ? false : true; 

  const validate = async () => {
    if (fileInfos) {
      const result = await validateRequest(fileInfos);
      const errors = [];
      if (result.isValid) {
        setIsValid(true);
        setErrors(errors);
      } else {
        setIsValid(false);
        if (result.notFound) {
          errors.push("Não existem productos com o código passado!");
        }
        if (!result.allFieldIsValid) {
          errors.push("'product_code', 'new_price' e 'new_cost' devem ser números!")
        }
        if (!result.priceIsGreaterThanCost) {
          errors.push("O preço deve ser menor do que o custo do produto!");
        }

        setErrors(errors);
      }
    }
  }

  return(
    <button
      id="btn"
      disabled={ isDisable }
      onClick={ validate }
    >
      VALIDAR
    </button>
  )
}
