export type ModalState = {
	modalOpen: boolean;
}

const initialState: ModalState = {
	modalOpen: false
}

const TOGGLE_MODAL = "app/TOGGLE_MODAL";

export type ModalAction = 
	{
		type: typeof TOGGLE_MODAL;
	};

const Reducer = (state = initialState, action: ModalAction): ModalState => {
	switch(action.type) {
		case TOGGLE_MODAL:
		return {
			...state,
			modalOpen: !state.modalOpen
		}
		default:
			return state;
	}
	}

	export {initialState as initialModalState}
	export {Reducer as modalReducer}