import React, {Component} from "react"
import requestAnimationFrame from "./requestAnimationFrame"

export default ({enterDuration = 300, leaveDuration = 300} = {}) => {
  return (AnimatedComponent) => {
    class AnimationWrapper extends Component {

      state = {
        enterAnimation: 0,
        leaveAnimation: 0,
        isRunningEnterAnimation: false,
        isRunningLeaveAnimation: false,
      }

      componentWillEnter(callback) {
        const start = Date.now()
        this.setState({
          isRunningEnterAnimation: true,
        })
        const tick = () => {
          const enterAnimation = (Date.now() - start) / enterDuration
          const isLastFrame = enterAnimation >= 1
          this.setState({
            enterAnimation: isLastFrame ? 1 : enterAnimation,
          })
          if(!isLastFrame) {
            requestAnimationFrame(tick)
          } else {
            this.setState({
              isRunningEnterAnimation: false,
            }, () => {
              callback()
            })
          }
        }
        tick()
      }

      componentWillLeave(callback) {
        const start = Date.now()
        this.setState({
          isRunningLeaveAnimation: true,
        })
        const tick = () => {
          const leaveAnimation = (Date.now() - start) / leaveDuration
          const isLastFrame = leaveAnimation >= 1
          this.setState({
            leaveAnimation: isLastFrame ? 1 : leaveAnimation,
          })
          if(!isLastFrame) {
            requestAnimationFrame(tick)
          } else {
            this.setState({
              isRunningLeaveAnimation: false,
            }, () => {
              callback()
            })
          }
        }
        tick()
      }

      render() {
        return (
          <AnimatedComponent
            {...this.props}
            {...this.state} />
        )
      }
    }

    return AnimationWrapper
  }
}
