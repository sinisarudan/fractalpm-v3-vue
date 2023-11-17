import { describe, test, expect } from 'vitest';

import NotificationsState from './NotificationsState';

// import { sum } from "../HelloWorld.vue";

describe('NotificationsState', () => {
  test('constructor', async () => {
    const notificationsState = new NotificationsState([], true, true);
    expect(notificationsState.notifications.length).toEqual(0);
    expect(notificationsState.visible).toBeTruthy();
    expect(notificationsState.expanded).toBeTruthy();
    notificationsState.expanded = false;
    expect(notificationsState.expanded).toBeFalsy();
  });
});
