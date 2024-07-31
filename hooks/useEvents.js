import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";

const useEvents = () => {
  const dispatch = useDispatch();

  const events = [];

  return useMemo(
    () => ({
      events,
    }),
    [events]
  );
};

export default useEvents;
