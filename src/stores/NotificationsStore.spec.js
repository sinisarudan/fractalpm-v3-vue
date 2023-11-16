import { describe, it, expect, beforeEach } from 'vitest'

import { setActivePinia, createPinia } from 'pinia'

import { useNotificationsStore } from '@/stores/notifications';
import { NotifLevel } from '@/models/notifications/NotifLevel';

describe('Notifications.Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  it('stores correct notifications', () => {
    // console.log("wrapper.html()", wrapper.html());
    const notificationsStore = useNotificationsStore()
    const NotifTitle = 'User is already in the team'
    notificationsStore.add({ title: NotifTitle, level: NotifLevel.WARNING })
    expect(notificationsStore.notifications.length).toBe(1)
    notificationsStore.add({ title: NotifTitle, level: NotifLevel.SUCCESS })
    expect(notificationsStore.notifications.length).toBe(2)
    expect(notificationsStore.notifications[0].level).toBe(NotifLevel.WARNING)
    expect(notificationsStore.notifications[0].title).toBe(NotifTitle)
    expect(notificationsStore.notifications[1].level).toBe(NotifLevel.SUCCESS)
    expect(notificationsStore.notifications[1].title).toBe(NotifTitle)
  })
  it('removes correct notifications', () => {
    // console.log("wrapper.html()", wrapper.html());
    const notificationsStore = useNotificationsStore()
    const NotifTitle = 'User is already in the team'
    const notifId = notificationsStore.add({
      title: NotifTitle,
      level: NotifLevel.WARNING
    })
    expect(notificationsStore.notifications.length).toBe(1)
    expect(notificationsStore.count).toBe(1)
    // expect(notifications.show).toHaveBeenCalledTimes(1);
    notificationsStore.remove(notifId)
    expect(notificationsStore.notifications.length).toBe(0)
    expect(notificationsStore.count).toBe(0)
    // expect(notifications.notifications[0].level).toBe(NotifLevel.WARNING);
    // expect(notifications.notifications[0].title).toBe(NotifTitle);
  })
})
