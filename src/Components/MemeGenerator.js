import React, {Component} from "react"



class MemeGenerator extends Component {
    constructor() {
        super()
        this.state = {
            topText: "Top Text",
            bottomText: "Bottom Text",
            randomImage: "http://i.imgflip.com/1bij.jpg",
            allMemesImgs: []

        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => {
                const {memes} = response.data
                console.log(memes[0])
                this.setState({ allMemesImgs: memes})
            })
    }

    handleChange(event) {
        const {name, value} = event.target
        this.setState({ [name]: value })
    }
    
    handleSubmit(event) {
        event.preventDefault()
        // get a random number int (index of the array)
        const randNum = Math.floor(Math.random() * this.state.allMemesImgs.length)
        const randomMemeImg = this.state.allMemesImgs[randNum].url
        // get the meme from the index
        // set randonImg to the url of the random item I got
        this.setState({ randomImage: randomMemeImg })
    }
   

    render() {
        return(
            <div>
                <form className="meme-form" onSubmit={this.handleSubmit}>
                    <input 
                        type="text"
                        name="topText"
                        value={this.state.topText}
                        onChange={this.handleChange}
                        placeholder="Top Text"
                    />
                    
                    <input 
                        type="text"
                        name="bottomText"
                        value={this.state.bottomText}
                        onChange={this.handleChange}
                        placeholder="Botttom Text"
                    />

                    <button>Gen</button>
                </form>

                <div className="meme">
                    <img src={this.state.randomImage} alt="" />
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>
                </div>
            </div>
        )
    }
}

export default MemeGenerator