import moment from 'moment/moment';
import "react-big-calendar/lib/css/react-big-calendar.css";
import React, { useEffect } from 'react';
import { Calendar, momentLocalizer } from "react-big-calendar";

export default function CalendarTraining() {

    const localizer = momentLocalizer(moment);
    const [trainings, setTrainings] = React.useState([]);


    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then((response) => response.json())
        .then(data => setTrainings(data))
        .catch((err) => console.error(err));
    }
    
    useEffect(() => {
        fetchTrainings()
    });

    return (
        <div>
            <Calendar
                localizer={localizer}
                events={trainings}
                style={{height: 700}}
                titleAccessor={(event) => {return moment(event.date).toDate().getHours() + ":" + moment(event.date).toDate().getMinutes() + " - "
                        +  moment(event.date).add(event.duration, "minutes").toDate().getHours() + ":" + moment(event.date).toDate().getMinutes()
                        + " \n" + event.activity + " / " + event.customer.firstname + " " + event.customer.lastname;
                     }
                    }
                startAccessor={startTime => moment(startTime.date).toDate()}
                endAccessor={endTime => moment(endTime.date).add(endTime.duration, "minutes").toDate()}
            />
        </div>
    );
}
