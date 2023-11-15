import { describe, vi, it, expect, beforeEach } from 'vitest'

import { mount } from '@vue/test-utils'
import AppNotifications from '../AppNotifications.vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import { createTestingPinia } from '@pinia/testing'

import { useNotificationsStore } from '@/stores/notifications'
import { nextTick } from 'vue'
import { ENotifLevel } from '@/models/notifications/notifications-vos'

const vuetify = createVuetify({
  components,
  directives
})

describe('Notifications.Vue', () => {
  const pinia = createTestingPinia({ stubActions: false })
  const wrapper = mount(AppNotifications, {
    // props: { },
    global: {
      plugins: [vuetify, pinia]
    }
  })
  const notificationsStore = useNotificationsStore(pinia)
  const notificationsAddSpy = vi.spyOn(notificationsStore, 'add')
  beforeEach(() => {
    notificationsStore.clearNotifications()
    notificationsStore.visible = true
    notificationsStore.expanded = true
    notificationsAddSpy.mockClear()
  })
  it('hides notifications', async () => {
    notificationsStore.visible = false
    notificationsStore.expanded = false
    await nextTick() // Wait for the next rendering cycle
    expect(wrapper.text()).toContain('notifications-visible:false')
    expect(wrapper.text()).toContain('notifications-expanded:false')
  })
  it('renders properly', () => {
    // console.log("wrapper.html()", wrapper.html());
    // expect(wrapper.text()).toContain("notificationsComponent");
  })
  it('shows notification', async () => {
    const NotifTitle: string = 'User is already in the team'
    notificationsStore.add({ title: NotifTitle, level: ENotifLevel.WARNING })
    await nextTick() // Wait for the next rendering cycle
    // expect(wrapper.text()).toContain("notificationsComponent");
    // expect(wrapper.html()).toContain(NotifTitle);
    expect(notificationsStore.notifications.length).toBe(1)
    expect(notificationsStore.add).toHaveBeenCalledTimes(1)

    notificationsStore.add({ title: NotifTitle, level: ENotifLevel.SUCCESS })
    await nextTick() // Wait for the next rendering cycle
    expect(notificationsStore.notifications.length).toBe(2)
    expect(notificationsStore.add).toHaveBeenCalledTimes(2)

    const instance = wrapper.vm
    const notifNoFunction = (instance as any).notifNo
    const result = notifNoFunction
    console.log('[Notifications.Vue] notifNoFunction() result', result)

    console.log('[Notifications.Vue] wrapper.html() after adding notifications:', wrapper.html())

    const alerts = wrapper.findAll('[data-test="alert"]')

    // Assert that there are exactly 2 'alert' instances
    expect(alerts.length).toBe(2)
    console.log('alert 0:', alerts[0].element.innerHTML)
    expect(alerts[0].element.textContent).toContain(NotifTitle)

    // Regular expression pattern for mdi-alert-circle class in alerts[0]
    const alertPattern = /<i class="mdi-alert-circle[^"]*"/

    // Regular expression pattern for mdi-check-circle class in alerts[1]
    const checkPattern = /<i class="mdi-check-circle[^"]*"/

    // Check if alerts[0] contains mdi-alert-circle class
    expect(alerts[0].html()).toMatch(alertPattern)

    // Check if alerts[1] contains mdi-check-circle class
    expect(alerts[1].html()).toMatch(checkPattern)
  })
  it('closes notification and removes notifications from store', async () => {
    const NotifTitle: string = 'User is already in the team'
    notificationsStore.add({ title: NotifTitle, level: ENotifLevel.WARNING })
    await nextTick() // Wait for the next rendering cycle
    expect(notificationsStore.count).toBe(1)
    expect(notificationsStore.add).toHaveBeenCalledTimes(1)
    notificationsStore.add({ title: NotifTitle, level: ENotifLevel.WARNING })
    await nextTick() // Wait for the next rendering cycle
    expect(notificationsStore.count).toBe(2)
    expect(notificationsStore.add).toHaveBeenCalledTimes(2)

    // Find the close button within the v-alert component
    let closeButton = wrapper.find("[data-test='alert'] .v-alert__close button")

    await closeButton.trigger('click')
    expect(notificationsStore.count).toBe(1)

    //we have to search again - the fist `closeButton` was for the already closed alert
    closeButton = wrapper.find("[data-test='alert'] .v-alert__close button")

    await closeButton.trigger('click')
    expect(notificationsStore.count).toBe(0)
  })
  it('alertClosed is called correctly', async () => {
    const alertClosedSpy = vi.fn()

    // Assign the mock function to the component's alertClosed method
    ;(wrapper.vm as any).alertClosed = alertClosedSpy

    const NotifTitle: string = 'User is already in the team'
    notificationsStore.add({ title: NotifTitle, level: ENotifLevel.WARNING })
    await nextTick() // Wait for the next rendering cycle

    // Find the close button within the v-alert component
    const closeButton = wrapper.find("[data-test='alert'] .v-alert__close button")
    // Trigger a click event on the close button
    await closeButton.trigger('click')

    // Assert that alertClosed was called or perform other necessary assertions
    // wrapper.vm as any).alertClosed
    // const alertClosedSpy = vi.spyOn(wrapper.vm, 'alertClosed');
    expect(alertClosedSpy).toHaveBeenCalled()

    //resetting to do the real call:
    // alertClosedSpy.mockReset();
    alertClosedSpy.mockClear()
    expect(alertClosedSpy).toBeCalledTimes(0)
  })
})
