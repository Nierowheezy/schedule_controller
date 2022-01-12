import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "../css/datetime.css";

const Datetime = require("react-datetime");

const EventDetails = (props) => {
  const {
    showModal,
    handleHide,
    eventType,
    eventInfo,
    newIndex,
    deleteEvent,
    addEvent,
    updateEvent,
  } = props;

  const formRef = useRef();

  const [showEventModal, setShowEventModal] = useState(showModal);

  const [formData, setFormData] = useState({
    id: eventType === "add" ? newIndex : eventInfo.id,
    title: eventInfo && eventInfo.title ? eventInfo.title : null,
    worker: eventInfo && eventInfo.worker ? eventInfo.worker : null,
    start: eventInfo && eventInfo.start ? props.eventInfo.start : moment(),
    end: eventInfo && eventInfo.end ? eventInfo.end : moment(),
    allDay: eventInfo.allDay ? true : false,
    hexColor: "#265985",
    notes: eventInfo.notes ? eventInfo.notes : "",
  });

  const changeHandler = (e, myRef) => {
    var myEventDetail = formData;
    var val = "";
    if (myRef !== "allDay") {
      if (myRef === "start" || myRef === "end") {
        val = new Date(moment(e));
      } else {
        val = e.target.value;
      }
    } else {
      var val = e.target.checked;
    }

    formData[myRef] = val;
    setFormData({
      ...formData,
      myEventDetail,
    });
  };

  useEffect(() => {
    setShowEventModal(showModal);
    // eslint-disable-next-line
  }, [showModal]);

  useEffect(() => {
    setFormData({
      ...formData,
      id: eventType === "add" ? newIndex : eventInfo.id,
      title: eventInfo && eventInfo.title ? eventInfo.title : null,
      start: eventInfo && eventInfo.start ? props.eventInfo.start : moment(),
      end: eventInfo && eventInfo.end ? eventInfo.end : moment(),
      allDay: eventInfo.allDay ? true : false,
      hexColor: "#265985",
      notes: eventInfo.notes ? eventInfo.notes : "",
    });
    // eslint-disable-next-line
  }, [eventType, eventInfo]);

  return (
    <Modal show={showEventModal} onHide={handleHide}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title">Job Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <label> Job Title </label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter the Event Name"
          ref={formRef}
          value={formData.title}
          onChange={(e) => changeHandler(e, "title")}
        />

        <label> Worker Name </label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter the Event Name"
          ref={formRef}
          value={formData.worker}
          onChange={(e) => changeHandler(e, "worker")}
        />

        <label> Start Date </label>
        {formData.allDay ? (
          <Datetime
            value={formData.start}
            dateFormat="MM-DD-YYYY"
            timeFormat={false}
            onChange={(e) => changeHandler(e, "start")}
          />
        ) : (
          <Datetime
            value={formData.start}
            onChange={(e) => changeHandler(e, "start")}
          />
        )}

        <label> End Date </label>
        {formData.allDay ? (
          <Datetime
            value={formData.end}
            dateFormat="MM-DD-YYYY"
            timeFormat={false}
            onChange={(e) => changeHandler(e, "end")}
          />
        ) : (
          <Datetime
            value={formData.end}
            onChange={(e) => changeHandler(e, "end")}
          />
        )}

        <label> Schedule Notes </label>
        <textarea
          className="form-control"
          placeholder="Event Notes"
          ref={formRef}
          value={formData.notes}
          onChange={(e) => changeHandler(e, "notes")}
        />

        <label> Event Color </label>
        <input
          type="color"
          value={formData.hexColor}
          onChange={(e) => changeHandler(e, "hexColor")}
          style={{ marginRight: "20px", marginLeft: "5px" }}
        />

        <input
          type="checkBox"
          name="all_Day"
          value={formData.id}
          checked={formData.allDay}
          onChange={(e) => changeHandler(e, "allDay")}
        />
        <label> All Day </label>
      </Modal.Body>
      <Modal.Footer>
        {props.eventType === "add" ? (
          <Button bsStyle="success" onClick={() => addEvent(formData)}>
            Add
          </Button>
        ) : (
          <Button bsStyle="warning" onClick={() => updateEvent(formData)}>
            Update
          </Button>
        )}
        {props.eventType === "add" ? null : (
          <Button bsStyle="danger" onClick={() => deleteEvent(formData.id)}>
            Delete
          </Button>
        )}
        <Button onClick={handleHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EventDetails;
