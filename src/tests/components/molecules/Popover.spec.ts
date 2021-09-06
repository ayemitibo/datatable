import { shallowMount } from '@vue/test-utils'
import { nextTick } from 'vue'
import Popover from '/@src/components/molecules/Popover.vue'

describe('Popover', () => {
  it('is hidden by default', () => {
    const wrapper = shallowMount(Popover)

    const body = wrapper.get('[data-test="body"]')

    expect(body.isVisible()).toBe(false)
  })

  it('is toggles visibility when the toggle method is invoked', async () => {
    const wrapper = shallowMount(Popover)

    const body = wrapper.get('[data-test="body"]')

    expect(body.isVisible()).toBe(false)

    wrapper.vm.toggle()
    await nextTick()

    expect(body.isVisible()).toBe(true)

    wrapper.vm.toggle()
    await nextTick()

    expect(body.isVisible()).toBe(false)
  })

  it('is hidden when the hide method is invoked', async () => {
    const wrapper = shallowMount(Popover)

    const body = wrapper.get('[data-test="body"]')

    wrapper.vm.toggle()
    await nextTick()

    expect(body.isVisible()).toBe(true)

    wrapper.vm.hide()
    await nextTick()

    expect(body.isVisible()).toBe(false)
  })

  it('emits a shown event when shown and a hidden event when hidden', async () => {
    const wrapper = shallowMount(Popover)

    expect(wrapper.emitted().shown).toBeFalsy
    expect(wrapper.emitted().hidden).toBeFalsy

    wrapper.vm.toggle()
    await nextTick()

    expect(wrapper.emitted().shown.length).toBe(1)
    expect(wrapper.emitted().hidden).toBeFalsy

    wrapper.vm.hide()
    await nextTick()

    expect(wrapper.emitted().shown.length).toBe(1)
    expect(wrapper.emitted().hidden.length).toBe(1)
  })
})
