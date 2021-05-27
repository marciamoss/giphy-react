import React, { Component } from 'react';
import axios from "axios";

class Giphy extends Component {
    constructor() {
      super();
      this.state = {
        giphy: "",
        fetchedGif: "",
        apiFail: "",
        giphyState: 0
      };
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        },()=>{
          this.setState({giphy: this.state.giphy, giphyState: 0});
        });
    };

    fetchGiphy = (giphy) => {
        axios.get('https://api.giphy.com/v1/gifs/search?api_key=jH0uAghmyuDvpp2NVi2uqVxYQSPEWnC4&q="' + giphy)
        .then((result) => {
            if(!result.data.data[0]) {
                this.setState({apiFail: "Not Found", fetchedGif: null});
            } else {
                this.setState({fetchedGif: result.data.data[0], apiFail: null});
            }
        }).catch(error => {
            if(error.response && error.response.data && error.response.data.message) {
                this.setState({apiFail: error.response.data.message, fetchedGif: null});
            } else {
                this.setState({apiFail: "Not Found", fetchedGif: null});
            }
        });
    }

    playGiphy = (giphyState) => {
        if(!giphyState){
            this.setState({giphyState: 1});
        }
        else if(giphyState){
            this.setState({giphyState: 0});
        }
    }

    render() {
        return (
            <div className="container">
                <form className="mt-5">
                    <div className="row">
                        <div className="col-12">
                        <label>Type in a term to search Giphy</label>
                        <input 
                            type="text" 
                            className="form-control textBoxStyle"
                            name="giphy"
                            value={this.state.giphy}
                            onChange={this.handleInputChange} 
                            placeholder="Giphy"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 mt-1" style={{textAlign:"right"}}>
                        <button 
                            className="btn btn-secondary btn-lg"
                            disabled={this.state.giphy === ""}
                            data-value={this.state.giphy}
                            onClick={(event) => {
                            event.preventDefault();
                            this.fetchGiphy(this.state.giphy);
                            }}
                        >
                            Search
                        </button>
                        </div>
                    </div>
                    { this.state.fetchedGif ? (
                        <div className="row">
                            <div className="col-12">
                                <h3 className="mt-5" style={{color:"blue"}}>Click on the image to play/pause</h3>
                                { this.state.giphyState ? (
                                    <figure>
                                        <img alt="gif" style={{width:"25rem", height: "25rem", borderStyle: "ridge", borderColor: "rgb(243, 162, 162)", float: "left"}} 
                                            src={this.state.fetchedGif.images.original.url}
                                            onClick={(event) => {
                                            event.preventDefault();
                                            this.playGiphy(this.state.giphyState);
                                            }}
                                        >
                                        </img>
                                    </figure>
                                ) : (
                                    <figure>
                                        <img alt="gif" style={{width:"25rem", height: "25rem", borderStyle: "ridge", borderColor: "rgb(243, 162, 162)", float: "left"}} 
                                            src={this.state.fetchedGif.images.original_still.url}
                                            onClick={(event) => {
                                            event.preventDefault();
                                            this.playGiphy(this.state.giphyState);
                                            }}
                                        >
                                        </img>
                                    </figure>
                                
                                )}
                            </div>
                        </div>
                    ) : (
                        null
                    )}
                    { this.state.apiFail ? (
                        <div className="row">
                            <div className="col-12">
                                <h3 style={{color:"red"}}>{this.state.apiFail}</h3>
                            </div>
                        </div>
                    ) : (
                        null
                    )}
                </form>
            </div>
        );
    }    
}

export default Giphy;
