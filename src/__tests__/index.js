import tape from "tape-catch"
import React, {Component, PropTypes, addons} from "react/addons"
import transitionChild from ".."

const {TestUtils, TransitionGroup} = addons

tape("transitionChild decorator", (test) => {

  let ended = false

  @transitionChild()
  class TestComponent extends Component {

    static propTypes = {
      enterAnimation: PropTypes.number.isRequired,
      leaveAnimation: PropTypes.number.isRequired,
      isRunningEnterAnimation: PropTypes.bool.isRequired,
      isRunningLeaveAnimation: PropTypes.bool.isRequired,
    }

    render() {
      const {
        enterAnimation,
        leaveAnimation,
        isRunningEnterAnimation,
        isRunningLeaveAnimation,
      } = this.props
      if(isRunningEnterAnimation) {
        test.equal(
          isRunningLeaveAnimation,
          false,
          "animations are not ran in parallel"
        )
        test.equal(
          leaveAnimation,
          0,
          "leaveAnimation doesn't update when startAnimation runs"
        )
        test.ok(enterAnimation >= 0 && enterAnimation <= 1)
      }
      if(isRunningLeaveAnimation) {
        test.equal(
          isRunningEnterAnimation,
          false,
          "animations are not ran in parallel"
        )
        test.equal(
          enterAnimation,
          1,
          "enterAnimation doesn't update when leaveAnimation runs"
        )
        test.ok(leaveAnimation >= 0 && leaveAnimation <= 1)
      }
      if(enterAnimation === 1 &&
        leaveAnimation === 1 &&
        !isRunningEnterAnimation &&
        !isRunningEnterAnimation &&
        !ended) {
        ended = true
        test.end()
      }
      return null
    }
  }

  class ParentComponent extends Component {

    state = {
      active: false,
    }

    componentDidMount() {
      this.setState({
        active: true,
      }, () => {
        setTimeout(() => {
          this.setState({
            active: false,
          })
        }, 100)
      })
    }

    render() {
      const {active} = this.state
      return (
        <TransitionGroup component="div">
          {active && <TestComponent key={0}/>}
        </TransitionGroup>
      )
    }
  }

  TestUtils.renderIntoDocument(<ParentComponent />)

})
