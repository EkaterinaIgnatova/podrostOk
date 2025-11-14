import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectRequestStatus } from "../entities/requests/slice";

export const useRequest = (thunk) => {
  const dispatch = useDispatch();
  const [request, setRequest] = useState(null);

  const requestStatus = useSelector((state) =>
    selectRequestStatus(state, request?.requestId)
  );

  const sendRequest = (params) => {
    const request = dispatch(thunk(params));
    setRequest(request);
  };

  return { requestStatus, sendRequest };
};
