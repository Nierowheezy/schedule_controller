import moment from "moment";
import React, { useEffect, useState } from "react";
import BigCalendar from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { connect } from "react-redux";
import * as eventAction from "../redux/actions/eventAction";
import * as types from "../redux/types/eventActionTypes";
import EventDetails from "./EventDetails";

// BigCalendar.momentLocalizer(moment);

const localizer = BigCalendar.momentLocalizer(moment);

let allViews = Object.keys(BigCalendar.Views).map((k) => BigCalendar.Views[k]);

const EventCalendar = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [eventType, setEventType] = useState("add");
  const [newIndex, setNewIndex] = useState(0);
  const [eventInfo, setEventInfo] = useState({});

  useEffect(() => {
    props.dispatch(eventAction.GetInitialEvents());
  }, []);

  const handleHide = () => {
    setShowModal(false);
  };

  const handleShow = (slotInfo, eventType) => {
    var currentIndex = props.events.allEvents.length;
    setShowModal(true);
    setEventType(eventType);
    setEventInfo(slotInfo);
    setNewIndex(currentIndex);
  };

  const deleteEvent = (id) => {
    props.dispatch({
      type: types.REMOVE_EVENT,
      payload: id,
    });
    setShowModal(false);
  };

  const addEvent = (obj) => {
    const { title, worker } = obj;
    if (!title || !worker) {
      alert("Please fill in the title and worker name");
      return;
    }
    props.dispatch({
      type: types.ADD_EVENT,
      payload: obj,
    });
    setShowModal(false);
  };

  const updateEvent = (obj) => {
    props.dispatch({
      type: types.UPDATE_EVENT,
      payload: {
        id: obj.id,
        obj: obj,
      },
    });
    setShowModal(false);
  };

  const eventStyle = (event, start, end, isSelected) => {
    var bgColor = event.hexColor ? event.hexColor : "#265985";
    var style = {
      backgroundColor: bgColor,
      borderRadius: "5px",
      opacity: 1,
      color: "white",
      border: "0px",
      display: "block",
    };
    return {
      style: style,
    };
  };

  return (
    <div className="bodyContainer">
      <div className="well well-sm">
        <h3 className="instruction">Instructions</h3>
        <strong>To add an event: </strong> Click on the day you want to add an
        event or drag up to the day you want to add the event for multiple day
        event! <br />
        <strong>To update and delete an event:</strong> Click on the event you
        wish to update or delete!
      </div>
      <EventDetails
        showModal={showModal}
        handleHide={handleHide}
        eventType={eventType}
        eventInfo={eventInfo}
        newIndex={newIndex}
        deleteEvent={deleteEvent}
        addEvent={addEvent}
        updateEvent={updateEvent}
      />
      <BigCalendar
        selectable
        localizer={localizer}
        events={props.events.allEvents}
        views={allViews}
        step={60}
        showMultiDayTimes
        defaultDate={new Date(moment())}
        onSelectEvent={(event) => handleShow(event, "edit")}
        onSelectSlot={(slotInfo) => handleShow(slotInfo, "add")}
        style={{ minHeight: "500px" }}
        eventPropGetter={eventStyle}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  const { events } = state;
  return {
    events,
  };
};

export default connect(mapStateToProps)(EventCalendar);
