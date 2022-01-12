import localForage from "localforage";
import moment from "moment";
import * as types from "../types/eventActionTypes";

export const GetInitialEvents = () => {
  return async (dispatch, getState) => {
    var allEvents = [
      {
        id: 0,
        title: "Today!",
        allDay: true,
        start: new Date(moment()),
        end: new Date(moment()),
        hexColor: "#265985",
        notes: "Have a great day!",
      },
    ];

    localForage.getItem("AllEvents", function (err, allEve) {
      if (allEve) {
        allEvents = allEve;
      } else {
        localForage.setItem("AllEvents", allEvents);
      }

      dispatch({ type: types.ALL_EVENTS, allEvents });
    });
  };
};
