# react-transition-child

[![Build Status](https://travis-ci.org/bloodyowl/react-transition-child.svg)](https://travis-ci.org/bloodyowl/react-transition-child)

transitionChild is a little ES7 decorator that lets you easily wrap react
components to animate their appearance and disappearance in the DOM.

## install

```console
$ npm install --save bloody-react-transition-child
```

## @transitionChild({ enterDuration = 300, leaveDuration = 300 }) class

wraps a react component. this component will then receive as additional props:

- `enterAnimation`: number (progress of the enterAnimation from 0 to 1)
- `leaveAnimation`: number (progress of the leaveAnimation from 0 to 1)
- `isRunningEnterAnimation`: boolean
- `isRunningLeaveAnimation`: boolean

## example

```javascript
@transitionChild()
class Slide extends Component {

  static propTypes = {
    enterAnimation: PropTypes.number,
    leaveAnimation: PropTypes.number,
    isRunningEnterAnimation: PropTypes.bool,
    isRunningLeaveAnimation: PropTypes.bool,
  }

  render() {
    const {
      enterAnimation,
      leaveAnimation,
      isRunningEnterAnimation,
      isRunningLeaveAnimation,
      children,
    } = this.props
    return (
      <div
        style={{
          ...styles.slide,
          ...isRunningEnterAnimation && {
            transform:
              `translateX(` +
                `${ comesFrom === "left" ? "-" : "" }` +
                `${ (1 - enterAnimation) * 100 }%)`,
          },
          ...isRunningLeaveAnimation && {
            opacity: (1 - leaveAnimation) * 1,
          },
        }}>
        {children}
      </div>
    )
  }
}
```
