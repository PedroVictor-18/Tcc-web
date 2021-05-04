import React, { Component } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import api from '../../services/api';

const localizer = momentLocalizer(moment);
const event = [];

class App extends Component {
	componentDidMount() {
		api.get('/calendar/client/list-calendar')
			.then((response) => {
				console.log(response.data);
				if (response.data.error === false) {
					const array = response.data.data;
					array.forEach((item) => {
						const object = {
							title: item.service,
							start: item.start,
							end: item.end,
						};
						event.push(object);
					});
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	state = {
		event,
	};

	render() {
		return (
			<div className="card">
				<div className="calendarApp">
					<Calendar
						drilldownView="agenda"
						localizer={localizer}
						defaultDate={new Date()}
						defaultView="month"
						events={this.state.event}
						style={{ height: '100vh' }}
						views={['month', 'week', 'agenda']}
					/>
				</div>
			</div>
		);
	}
}

export default App;
