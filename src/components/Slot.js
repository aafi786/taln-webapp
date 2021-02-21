import React, { Component } from 'react'
import { Table, Divider, Tag } from 'antd';
import axios from "axios";
import { Empty } from 'antd';

const columns = [{
    title: 'Slot Name',
    dataIndex: 'slot_name',
    key: 'slot_name'
},
{
    title: 'Slot Status',
    key: 'slot_status',
    dataIndex: 'slot_status',
    render: slot_status => (
        <span>
            <Tag color={(slot_status === '0') ? 'green' : 'volcano'} key={slot_status}>{(slot_status === '0') ? 'Empty' : 'Parked'}</Tag>
        </span>
    ),
}];

export default class Slot extends Component {
    constructor() {
        super();
        this.state = {
            dats: null,
            redats: null,
            loader: null
        }

    }


    componentDidMount() {
        axios.get('https://apiparking.herokuapp.com/get/slots')
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
                <Table columns={columns} dataSource={this.state.dats} />

            </div>
        )
    }
}
