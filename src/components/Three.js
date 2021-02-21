import React, { Component } from 'react'
import axios from "axios";

export default class Three extends Component {
    state = {
        data: null
    }
    componentDidMount() {
        axios.get('https://apiparking.herokuapp.com/get/parked')
            .then(res => {
                this.setState({
                    dats: res.data
                })
                console.log(res.data)
            })
            .catch(err => console.log(err))
    }
    render() {
        return (
            <div>
                <h1>Slots</h1>
            </div>
        )
    }
}
