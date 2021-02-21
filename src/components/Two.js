import React, { Component } from 'react'
import { Select } from 'antd';
import { Button } from 'antd';
import { Table, Divider, Tag } from 'antd';
import axios from "axios";
import CsvDownload from 'react-json-to-csv'
const { Column, ColumnGroup } = Table;
const Option = Select.Option;

export default class Two extends Component {
    constructor(props) {
        super(props);
        this.state = {
            month: null,
            year: null,
            data: null
        }
    }

    componentDidMount() {
        axios.get('https://apiparking.herokuapp.com/get/all')
            .then(res => {
                console.log(res.data);
                this.setState({
                    data: res.data
                })

            })
            .catch(err => console.log(err))
    }
    handleChangeMonth(value) {
        console.log(`Month ${value}`);
        this.setState({
            month: value
        })
    }
    handleChangeYear(value) {

        console.log(`Year ${value}`);
        this.setState({
            year: value
        })
    }

    handleFilter() {
        axios.post('https://apiparking.herokuapp.com/get/yearmonth', {
            month: this.state.month,
            year: this.state.year
        })
            .then(res => {

                this.setState({
                    data: res.data
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    }



    render() {
        return (
            <div>
                <h1>Analytics</h1>
                <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Select Month"
                    optionFilterProp="children"
                    onChange={this.handleChangeMonth.bind(this)}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                    <Option value="1">Jan</Option>
                    <Option value="2">Feb</Option>
                    <Option value="3">Mar</Option>
                    <Option value="4">Apr</Option>
                    <Option value="5">May</Option>
                    <Option value="6">Jun</Option>
                    <Option value="7">Jul</Option>
                    <Option value="8">Aug</Option>
                    <Option value="9">Sept</Option>
                    <Option value="10">Oct</Option>
                    <Option value="11">Nov</Option>
                    <Option value="12">Dec</Option>

                </Select>
                <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Select Year"
                    optionFilterProp="children"
                    className="uk-margin-left"
                    onChange={this.handleChangeYear.bind(this)}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                    <Option value="2019">2019</Option>


                </Select>
                <Button type="primary" className="uk-margin-left" onClick={this.handleFilter.bind(this)}>Search</Button>
                <br />
                <br />
                <CsvDownload className="ant-btn" style={{ background: '#2ecc71', color: '#fff' }} data={this.state.data} />
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
                        title="Out Date"
                        dataIndex="out_date"
                        key="out_date"
                    />
                    <Column
                        title="Out Time"
                        dataIndex="out_time"
                        key="out_time"
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
