import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../store/AppContext";
import { getSupportedCurrencyApi } from "../../api/supportedCurrencyApi";
import { MenuItem, Select } from "@material-ui/core";
import { useFetch } from "../../hooks/useFetch";
import { AxiosError } from "axios";

const CurrencyOption = () => {
  const [supportedCurrency, setSupportedCurrency] = useState<Array<string>>([]);
  const { onChangeCurrency, currency } = useContext(AppContext);
  const handleChangeCurrency = (
    event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>
  ) => {
    onChangeCurrency(event.target.value as string);
  };

  const { handleError, handleSuccess, handleLoading } = useFetch();

  useEffect(() => {
    handleLoading();
    getSupportedCurrencyApi()
      .then((res) => {
        setSupportedCurrency(res);
        handleSuccess();
      })
      .catch((err) => {
        const axiosError = err as AxiosError;
        handleError(axiosError);
      });
  }, [handleError, handleSuccess, handleLoading]);

  return (
    <>
      {supportedCurrency.length > 0 && (
        <Select
          variant="outlined"
          value={currency}
          onChange={handleChangeCurrency}
        >
          {supportedCurrency.map((item) => (
            <MenuItem key={item} value={item.toUpperCase()}>
              {item.toUpperCase()}
            </MenuItem>
          ))}
        </Select>
      )}
    </>
  );
};

export default CurrencyOption;

// Fetch supported currency
// Display the supported Currency into menuitems
