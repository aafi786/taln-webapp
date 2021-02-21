import React, { Component } from 'react'
import { Table, Divider, Tag } from 'antd';
import axios from "axios";
import CsvDownload from 'react-json-to-csv'
const { Column, ColumnGroup } = Table;


export default class One extends Component {
    state = {
        data: null,
        sata: null
    }
    componentDidMount() {
        axios.get('https://apiparking.herokuapp.com/get/parked')
            .then(res => {
                this.setState({
                    data: res.data
                })

            })
            .catch(err => console.log(err))

        this.setState({
            sata: [{
                key: '1',
                firstName: 'Ankush',
                lastName: 'Brown',
                age: 32,
                address: 'New York No. 1 Lake Park',
                tags: ['nice', 'developer'],
            }, {
                key: '2',
                firstName: 'Jim',
                lastName: 'Green',
                age: 42,
                address: 'London No. 1 Lake Park',
                tags: ['loser'],
            }, {
                key: '3',
                firstName: 'Joe',
                lastName: 'Black',
                age: 32,
                address: 'Sidney No. 1 Lake Park',
                tags: ['cool', 'teacher'],
            }]
        })
    }
    abc() {
        console.log(this.state.data);
    }

    render() {

        return (
            <div>
                <h1>Parked Cars</h1>
                <br />
                <CsvDownload className="ant-btn" style={{ background: '#2ecc71', color: '#fff' }} data={this.state.data} />
                <br />
                <br />
                <Table dataSource={this.state.data}>

                    <Column
                        title="In Date"
                        dataIndex="in_date"
                        key="in_date"
                    />
                    <Column
                        title="In Time"
                        dataIndex="in_time"
                        key="in_time"
                    />

                    <Column
                        title="Token No"
                        dataIndex="token"
                        key="token"
                    />
                    <Column
                        title="Number"
                        dataIndex="Vnum"
                        key="Vnum"
                    />
                    <Column
                        title="Type"
                        dataIndex="Vtype"
                        key="vtype"
                    />
                    <Column
                        title="Slot"
                        dataIndex="slot"
                        key="slot"
                    />

                </Table>
            </div>
        )
    }
}
