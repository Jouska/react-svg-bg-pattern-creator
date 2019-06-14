import React from 'react'
import ReactDOM from 'react-dom'
import styled from '@emotion/styled'
import 'boxicons'

import './index.css'



const SVGWrapper = styled.div`
    position: absolute;
    width: 100vw;
    height: 50vh;
    background-color: #03BF67;
    overflow: hidden;
`

const IconWrapper = styled.div`
    margin: 10px;
    margin-bottom: 8px;
    margin-top: 8px;
    display: inline-block;
    overflow: hidden;
`

// Full SVG pattern (won't animate in edge/ie, full rotate of pattern) ***OLD***
const FullPattern = () => {
    return (
        <SVGWrapper>
            <svg width="100%" height="100%">
                <defs>
                    <pattern id="polka-dots" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                        <animateTransform attributeType="xml"
                        attributeName="patternTransform"
                        type="rotate" from="35" to="395" begin="0"
                        dur="190s" repeatCount="indefinite"/>
                        <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="#02723E">
                            <path d="M7.375 16.781l1.25-1.562L4.601 12l4.024-3.219-1.25-1.562-5 4C2.138 11.409 2 11.696 2 12s.138.591.375.781L7.375 16.781zM16.625 7.219l-1.25 1.562L19.399 12l-4.024 3.219 1.25 1.562 5-4C21.862 12.591 22 12.304 22 12s-.138-.591-.375-.781L16.625 7.219z"/>
                            <path transform="rotate(102.527 12 12)" d="M2.78 11H21.219V13.001H2.78z"/>
                        </svg>
                    </pattern>
                </defs>
                <rect x="0" y="0" width="100%" height="100%" fill="url(#polka-dots)"></rect>
            </svg>

            <box-icon type="solid" name="rocket"></box-icon>
        </SVGWrapper>
    )
}


// Main App component (Refactor out)
class App extends React.Component {
    constructor(props) {
        super(props)
        // Create ref to parent container to allow calculation
        this.container = React.createRef()
    }

    // Set dimensions state up
    state = {
        dimensions: {
            width: 0,
            height: 0
        }
    }

    // Calculates the amount of icons needed dependent on width and height of parent container
    calcIconAmount() {
        const { dimensions } = this.state
        let iconNumWidth = dimensions.width / 44
        let iconNumHeight = dimensions.height / 44
        let sum = Math.floor(iconNumHeight * iconNumWidth)

        return sum

        /*
        /container width / (icon width + margin)

            eg 1440px / 24px + 20px = 32.72

            container height /  (icon height + margin)

            eg 378.5 / 

        */
    }
    
    //Function to render icons
    IconRepeat() {
        // Create empty array
        let iconList = []


        // Set iconAmount to current sum total of parent container pixel width and height after divided by 44 (icon size including margin)
        let iconAmount = this.calcIconAmount()

        // For the amount calculated, populate array with JSX icons, needs to take iconAmount when fixed
        for(let i = 0; i <= iconAmount; i++) {
            iconList.push(<box-icon key={i} type="code" name="code-alt" color="#02723E"></box-icon>)
        }

        // MAP OUT JSX with keys
        let iconListPop = iconList.map((icon) => {
            let wrapperKey = `wrapper-${icon.key}`
            return <IconWrapper key={wrapperKey}>{icon}</IconWrapper>
        })

        // Return finished Mapped Array
        return (
            <div>
                {iconListPop}
            </div>
        )
}

    // When it's rendered, store width and height of the parent container to state
    componentDidMount() {
        const width = this.container.current.offsetWidth
        const height = this.container.current.offsetHeight
        this.setState({
            dimensions: {
                width: width,
                height: height
            }
        })
        // Left this here to REMIND MYSELF that if you log it at this lifecycle stage, it won't have updated yet. Needs to happen from componentDidUpdate (I guess because that's when state is updated?)
        console.log(this.state.dimensions)

    }

    componentDidUpdate() {
        // Test and log out dimensions state once updated
        const { dimensions } = this.state
        console.log(dimensions)
    }

    renderContent() {
        // Render function to chuck out width (notice how this works 'cos it's updated by state)
        const {dimensions} = this.state
        return (
            <div>
            width: {dimensions.width}
            </div>
        )
    }

    render() {
        return(
            <SVGWrapper ref={this.container}>
                {this.IconRepeat()}{this.renderContent()}
            </SVGWrapper>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'))
