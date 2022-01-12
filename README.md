# schedule_controller

## Run examples locally

```sh
$ git clone git@github.com:Nierowheezy/schedule_controller.git
$ cd schedule_controller
$ yarn or npm i
```

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### FILES ARE CONTAINED IN THE SRC FOLDER

```
container folder--- contains two components, EventDetails and EventCalender

css folder--- contains a css file for styling the datetime

redux--- contains redux setup and the store

utils-- contains some utility components
```

### BRIEF DESCRIPTION

This project uses a library called react-big-calender

### react-big-calendar

An events calendar component built for React and made for modern browsers (read: IE10+) and uses flexbox over the classic tables-ception approach.

https://github.com/jquense/react-big-calendar#readme

- A user can Schedule, Job, Worker entities.
- It's a simple CRUD application .

#### Simple Documentation on how to use React BigCalender

```js
import moment from "moment";
import BigCalendar from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = BigCalendar.momentLocalizer(moment);

let allViews = Object.keys(BigCalendar.Views).map((k) => BigCalendar.Views[k]);

const EventCalendar = (props) => {
  return (
    <div>
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
```
