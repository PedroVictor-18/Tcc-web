/*
	ActionTypes
*/
const ActionTypes = {
	UPDATE_USER_TYPE_IDS: 'userTypeReducer/UPDATE_USER_TYPE_IDS',
	UPDATE_ACTUAL_TYPE_ID: 'userTypeReducer/UPDATE_ACTUAL_TYPE_ID',
};

/*
	Reducer
*/
const initialState = {
	types: [],
	actualType: null,
};

export default function(state = initialState, action) {
	switch (action.type) {
		case ActionTypes.UPDATE_USER_TYPE_IDS:
			return {
				...state,
				types: action.payload,
			};
		case ActionTypes.UPDATE_ACTUAL_TYPE_ID:
			return {
				...state,
				actualType: action.payload,
			};
		default:
			return state;
	}
}

/*
	Actions
*/

export const UserTypeActions = {
	/**
	 * @params {number[]} ids
	 */
	updateUserTypeIds: ids => ({
		type: ActionTypes.UPDATE_USER_TYPE_IDS,
		payload: ids,
	}),
	/**
	 * @params {number} id
	 */
	updateActualTypeId: id => ({
		type: ActionTypes.UPDATE_ACTUAL_TYPE_ID,
		payload: id,
	}),
};
