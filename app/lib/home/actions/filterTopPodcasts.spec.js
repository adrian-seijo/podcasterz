
import test from 'ava';
import mock from 'mock-require';
import {mockState} from '../../../../test/util/mockState.js';

test('Should return the podcast in state if search is undefined', (t) => {

	const dummyList = [
		{key: 'foo', visible: true}
	];

	const updateStub = mockState({podcasts: dummyList});

	const {filterTopPodcasts} = mock.reRequire('./filterTopPodcasts.js');
	filterTopPodcasts();

	t.deepEqual(updateStub.called, true);
	t.deepEqual(updateStub.callCount, 1);
	t.deepEqual(updateStub.getCall(0).args, ['podcasts', dummyList]);
});
