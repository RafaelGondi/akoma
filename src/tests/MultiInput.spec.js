import { describe, test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import MultiInput from '../components/MultiInput.vue'; // Ajuste o caminho conforme necessário
import CdsTextInput from '../components/TextInput.vue';
import CdsFlatButton from '../components/FlatButton.vue';
import CdsIcon from '../components/Icon.vue';


describe('MultiInput', () => {
	test('renders the correct number of inputs based on internalModel', () => {
		const wrapper = mount(MultiInput, {
			props: {
				modelValue: [
					{ id: '1', value: 'Option 1' },
					{ id: '2', value: 'Option 2' },
				],
			},
		});

		const inputs = wrapper.findAllComponents(CdsTextInput);
		expect(inputs.length).toBe(2);
	});

	test('adds a new input when the add button is clicked', async () => {
		const wrapper = mount(MultiInput);

		const initialInputs = wrapper.findAllComponents(CdsTextInput);
		expect(initialInputs.length).toBe(1);

		await wrapper.findComponent(CdsFlatButton).trigger('click');

		const updatedInputs = wrapper.findAllComponents(CdsTextInput);
		expect(updatedInputs.length).toBe(2);
	});

	test('removes an input when the remove button is clicked', async () => {
		const wrapper = mount(MultiInput, {
			props: {
				modelValue: [
					{ id: '1', value: 'Option 1' },
					{ id: '2', value: 'Option 2' },
				],
			},
		});

		const initialInputs = wrapper.findAllComponents(CdsTextInput);
		expect(initialInputs.length).toBe(2);

		await wrapper.findComponent(CdsIcon).trigger('click');

		const updatedInputs = wrapper.findAllComponents(CdsTextInput);
		expect(updatedInputs.length).toBe(1);
	});

	test('updates the modelValue when an input value changes', async () => {
		const wrapper = mount(MultiInput, {
			props: {
				modelValue: [
					{ id: '1', value: 'Option 1' },
				],
			},
		});

		const input = wrapper.findComponent(CdsTextInput);
		await input.setValue('New Option');

		expect(wrapper.vm.internalModel[0].value).toBe('New Option');
	});

	test('exposes the arrayOfValues method', () => {
		const wrapper = mount(MultiInput, {
			props: {
				modelValue: [
					{ id: '1', value: 'Option 1' },
					{ id: '2', value: 'Option 2' },
				],
			},
		});

		const values = wrapper.vm.arrayOfValues();
		expect(values).toEqual(['Option 1', 'Option 2']);
	});
});