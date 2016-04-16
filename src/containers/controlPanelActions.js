import * as types from '../constants/ActionTypes';

/*export function getVolunteer(volunteers, n) {
    let selectedVolunteers = [];
    selectedVolunteers.push(volunteers[Math.floor(Math.random() * volunteers.length)]);
	console.log();
    return {
        type: types.GET_VOLUNTEER,
        selectedVolunteers
    };
}*/

export function setVolunteers(volunteers) {
    return {
        type: types.SET_VOLUNTEERS,
        volunteers
    };
}

export function fetchAvailableVolunteers(classcode) {
    return (dispatch) => {
        // ajax request to /api/sample
        fetch('/api/volunteer/available/' + classcode, {
            method: 'GET'
        }).then((res) => {
            return res.json();
        }).then((students) => {
            // dispatch action with data from server
            dispatch(setVolunteers(students));
        });
    };
}