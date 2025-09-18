import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectRequestStatus } from "../entities/requests/slice";

export const useRequest = (thunk, ...params) => {
  const dispatch = useDispatch();
  const [request, setRequest] = useState(null);

  const requestStatus = useSelector((state) =>
    selectRequestStatus(state, request?.requestId)
  );

  useEffect(() => {
    const request = dispatch(thunk(...params));
    setRequest(request);

    return () => {
      request.abort();
      setRequest(null);
    };
  }, [dispatch, thunk, ...params]);

  return requestStatus;
};
