import mock from 'mock-require';
import sinon from 'sinon';

/**
 * Mock the state so it returns the given state wehn getState is called and
 * return a stub for the updateState method.
 * @param  {Object} state
 * @return {Function}
 */
export const mockState = (state) => {

	const updateStub = sinon.stub();

	mock('../../app/lib/state.js', {
		getState: () => state,
		updateState: updateStub,
		onStateChange: () => {}
	});

	return updateStub;
};
