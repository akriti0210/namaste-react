import React from "react"

class UserClass extends React.Component{

    constructor(props) {
        super(props)

        this.state = {
            userInfo: {
                name: "Dummy",
                location: "Default"
            }
        }
        // console.log(this.props.name +" Child Constructor")
    }

    async componentDidMount() {
        // console.log(this.props.name +" Child Component Did Mount")
        const data = await fetch("https://api.github.com/users/akriti0210");
        const json = await data.json();

        this.setState({
            userInfo: json
        })

        this.timer = setInterval(() => {
            console.log("timer")
        },1000)
        console.log(json)
    }

    componentDidUpdate() {
        console.log("Component Did Update")
    }

    componentWillUnmount() {
        clearInterval(this.timer)
        console.log("Component Will Unmount")
    }

    render() {
        // console.log(this.props.name +" Child Render")
        // const { name, location } = this.props
        // const { count } = this.state

        const {name,location}=this.state.userInfo
        
        return (
            <div className='user-card'>
                {/* <h1>Count: {count}</h1>
                <button onClick={() => {
                    // Never update state variables directly
                    this.setState({
                        count: this.state.count + 1
                    })
                }}>Count Increase</button> */}
                <h2>Name: {name}</h2>
                <h3>Location: {location}</h3>
                <h4>Contact: @akritisingh02</h4>
            </div>
        )
    }
}

export default UserClass