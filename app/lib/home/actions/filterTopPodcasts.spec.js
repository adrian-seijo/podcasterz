
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

test('Should return the podcast that has the same value as search in title', (t) => {

	const dummyList = [
		{title: 'foo', visible: true, author: 'bar'},
		{title: 'lorem', visible: true, author: 'ipsum'},
		{title: 'dolor', visible: true, author: 'sit amet'},
	];

	const updateStub = mockState({
		podcasts: dummyList,
		search: 'lorem'
	});

	const {filterTopPodcasts} = mock.reRequire('./filterTopPodcasts.js');
	filterTopPodcasts();

	t.deepEqual(updateStub.called, true);
	t.deepEqual(updateStub.callCount, 1);
	t.deepEqual(updateStub.getCall(0).args, ['podcasts', [
		{...dummyList[0], visible: false},
		dummyList[1],
		{...dummyList[2], visible: false}
	]]);
});

test('Should return the podcast that has the same value as search in author', (t) => {

	const dummyList = [
		{title: 'foo', visible: true, author: 'bar'},
		{title: 'lorem', visible: true, author: 'ipsum'},
		{title: 'dolor', visible: true, author: 'sit amet'},
	];

	const updateStub = mockState({
		podcasts: dummyList,
		search: 'amet'
	});

	const {filterTopPodcasts} = mock.reRequire('./filterTopPodcasts.js');
	filterTopPodcasts();

	t.deepEqual(updateStub.called, true);
	t.deepEqual(updateStub.callCount, 1);
	t.deepEqual(updateStub.getCall(0).args, ['podcasts', [
		{...dummyList[0], visible: false},
		{...dummyList[1], visible: false},
		dummyList[2]
	]]);
});

test('Should return the podcast that has the same value as search in auhor or title', (t) => {

	const dummyList = [
		{title: 'foo', visible: true, author: 'bar'},
		{title: 'lorem', visible: true, author: 'ipsum'},
		{title: 'dolor lorem', visible: true, author: 'sit amet'},
	];

	const updateStub = mockState({
		podcasts: dummyList,
		search: 'lorem'
	});

	const {filterTopPodcasts} = mock.reRequire('./filterTopPodcasts.js');
	filterTopPodcasts();

	t.deepEqual(updateStub.called, true);
	t.deepEqual(updateStub.callCount, 1);
	t.deepEqual(updateStub.getCall(0).args, ['podcasts', [
		{...dummyList[0], visible: false},
		dummyList[1],
		dummyList[2]
	]]);
});

test('Should return any podcast that has any of the values in search', (t) => {

	const dummyList = [
		{title: 'foo', visible: true, author: 'bar'},
		{title: 'lorem', visible: true, author: 'ipsum'},
		{title: 'dolor', visible: true, author: 'sit amet'},
	];

	const updateStub = mockState({
		podcasts: dummyList,
		search: 'lorem bar'
	});

	const {filterTopPodcasts} = mock.reRequire('./filterTopPodcasts.js');
	filterTopPodcasts();

	t.deepEqual(updateStub.called, true);
	t.deepEqual(updateStub.callCount, 1);
	t.deepEqual(updateStub.getCall(0).args, ['podcasts', [
		dummyList[0],
		dummyList[1],
		{...dummyList[2], visible: false},
	]]);
});
