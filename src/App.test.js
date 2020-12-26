import App from './App';
import Enzyme, {shallow} from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

Enzyme.configure({ adapter: new Adapter()});
/**
 * Factory function to create a ShallowWrapper for the App component.]
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = (props) => shallow(<App props={props}/>)
const findByTestAttr = (wrapper, val) => wrapper.find(`[data-test='${val}']`);

test("render without error", () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, "component-app");
  expect(appComponent.length).toBe(1);
});
test('render button', () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper, "increment-button");
  expect(button.length).toBe(1);
});
test('renders increment counter display', () => {
  const wrapper = setup();
  const counterDisplay = findByTestAttr(wrapper, "counter-display");
  expect(counterDisplay.length).toBe(1);
});
test('counter starts at 0', () => {
  const wrapper = setup();
  const count = findByTestAttr(wrapper, "count").text();
  expect(count).toBe('0');
});
test('clicking on  increment button increments counter display', () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper, "increment-button");
  button.simulate('click');
  const count = findByTestAttr(wrapper, "count").text();
  expect(count).toBe("1");
});
test('renders decrement button', () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper, 'decrement-button');
  expect(button.length).toBe(1);
});
test('clicking decrement button decrements counter display', () => {
  const wrapper = setup();
  const incrementButton = findByTestAttr(wrapper, 'increment-button');
  incrementButton.simulate('click');
  const decrementButton = findByTestAttr(wrapper, 'decrement-button');
  decrementButton.simulate('click');
  incrementButton.simulate('click')
  setTimeout(() => {
    incrementButton.simulate('click')
    let count = findByTestAttr(wrapper, 'count').text();
    expect(count).toBe('2');
  }, 1);
});
describe('click decrement when count equal zero', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup();
    const decrementButton = findByTestAttr(wrapper, "decrement-button");
    decrementButton.simulate("click");
  });
  test('error message shown if decrement button clicked is 0', () => {
    const errorMessage = findByTestAttr(wrapper, "error-message");
    expect(errorMessage.length).toBe(1);
  });
  test('decrement button is not working if count equal 0', () => {
    let count = findByTestAttr(wrapper, 'count').text();
    expect(count).toBe("0");
  });
  test('error message is hide when increment button click', () => {
    const incrementButton = findByTestAttr(wrapper, 'increment-button');
    incrementButton.simulate('click');
    const errorMessage = findByTestAttr(wrapper, 'error-message');
    expect(errorMessage.length).toBe(0);
  });
})
