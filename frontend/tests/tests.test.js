import renderer from 'react-test-renderer'
import LoginScreen from '../pages/Login'

test('Login.tsx', () => {
    const tree = renderer.create(<LoginScreen />).toJSON()
    expect (tree).toMatchSnapshot()
})