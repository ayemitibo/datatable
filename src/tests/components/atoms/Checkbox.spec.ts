import { shallowMount } from '@vue/test-utils'
import Checkbox from '/@src/components/atoms/Checkbox.vue'

describe('Checkbox', () => {
  it('is unchecked if modelValue is false', () => {
    const wrapper = shallowMount(Checkbox, {
      props: {
        label: 'label',
        modelValue: false,
      },
    })

    const input = wrapper.get('input[type="checkbox"]')

    expect((input.element as HTMLInputElement).checked).toBe(false)
  })

  it('is checked if modelValue is true', () => {
    const wrapper = shallowMount(Checkbox, {
      props: {
        label: 'label',
        modelValue: true,
      },
    })

    const input = wrapper.get('input[type="checkbox"]')

    expect((input.element as HTMLInputElement).checked).toBe(true)
  })


  it('is unchecked if modelValue is an Array that doesn\'t include value', () => {
    const wrapper = shallowMount(Checkbox, {
      props: {
        label: 'label',
        modelValue: [],
        value: 'foo',
      },
    })

    const input = wrapper.get('input[type="checkbox"]')

    expect((input.element as HTMLInputElement).checked).toBe(false)
  })

  it('is checked if modelValue is an Array that includes value', () => {
    const wrapper = shallowMount(Checkbox, {
      props: {
        label: 'label',
        modelValue: ['foo'],
        value: 'foo',
      },
    })

    const input = wrapper.get('input[type="checkbox"]')

    expect((input.element as HTMLInputElement).checked).toBe(true)
  })


  it('is emits update:modelValue when clicked with negated modelValue if it\'s not an array', async () => {
    const wrapper = shallowMount(Checkbox, {
      props: {
        label: 'label',
        modelValue: false,
      },
    })

    expect(wrapper.emitted()['update:modelValue']).toBeFalsy()

    let input = wrapper.get('input[type="checkbox"]')
    await input.setValue(true)
    let emitted = wrapper.emitted()

    expect(emitted['update:modelValue'].length).toBe(1)
    expect((emitted['update:modelValue'][0] as unknown[])[0]).toBe(true)

    await wrapper.setProps({ modelValue: true })

    input = wrapper.get('input[type="checkbox"]')
    await input.setValue(false)
    emitted = wrapper.emitted()
    expect(emitted['update:modelValue'].length).toBe(2)
    expect((emitted['update:modelValue'][1] as unknown[])[0]).toBe(false)
  })

  it('is emits update:modelValue with value added to modelValue array when checked', async () => {
    const wrapper = shallowMount(Checkbox, {
      props: {
        label: 'label',
        modelValue: [],
        value: 'foo',
      },
    })

    expect(wrapper.emitted()['update:modelValue']).toBeFalsy()
    const input = wrapper.get('input[type="checkbox"]')
    expect((input.element as HTMLInputElement).checked).toBe(false)

    await input.setValue(true)
    const emitted = wrapper.emitted()

    expect(emitted['update:modelValue'].length).toBe(1)
    expect((emitted['update:modelValue'][0] as unknown[])[0]).toEqual(['foo'])
  })

  it('is emits update:modelValue with value removed from modelValue array when unchecked', async () => {
    const wrapper = shallowMount(Checkbox, {
      props: {
        label: 'label',
        modelValue: ['foo'],
        value: 'foo',
      },
    })

    expect(wrapper.emitted()['update:modelValue']).toBeFalsy()
    const input = wrapper.get('input[type="checkbox"]')
    expect((input.element as HTMLInputElement).checked).toBe(true)

    await input.setValue(false)
    const emitted = wrapper.emitted()

    expect(emitted['update:modelValue'].length).toBe(1)
    expect((emitted['update:modelValue'][0] as unknown[])[0]).toEqual([])
  })
})
