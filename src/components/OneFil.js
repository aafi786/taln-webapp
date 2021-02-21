import React, { Component } from 'react'
import { Table } from 'antd';
import reqwest from 'reqwest';
import { Modal, Button } from 'antd';

const columns = [{
    title: 'In Date',
    dataIndex: 'in_date',
    sorter: true,
    width: '20%',
},
{
    title: 'In Time',
    dataIndex: 'in_time',
},
{
    title: 'Token',
    dataIndex: 'token',
},
{
    title: 'Number',
    dataIndex: 'Vnum',
},
{
    title: 'Type',
    dataIndex: 'Vtype',
},
{
    title: 'Slot',
    dataIndex: 'slot',
    filters: [
        { text: 'JJ', value: 'JJ' },
        { text: 'JG', value: 'JG' },
        { text: 'PNP', value: 'PNP' },
        { text: '12A', value: '12A' },
    ]

}];

export default class OneFil extends Component {
    state = {
        data: [],
        pagination: {},
        loading: false,
        visible: false,
        filtr: null
    };

    componentDidMount() {
        this.fetch();
    }
    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        console.log(filters)

        const result = this.state.data.filter(word => word.slot === filters.slot[0]);
        // this.setState({
        //     pagination: pager,
        //     data: result
        // });
        // console.log(filters)
        this.fetch({
            results: pagination.pageSize,
            page: pagination.current,
            sortField: sorter.field,
            sortOrder: sorter.order,
            datax: result


        });
    }

    fetch = (params = {}) => {
        console.log('params:', params);
        this.setState({ loading: true });
        reqwest({
            url: 'https://apiparking.herokuapp.com/get/parked',
            method: 'get',
            type: 'json',
        }).then((data) => {
            // console.log(params.datax.length)
            const pagination = { ...this.state.pagination };
            // Read total count from server
            pagination.total = data.length;
            // pagination.total = 20;
            if (typeof params.datax !== 'undefined') {
                const columns = [{
                    title: 'In Date',
                    dataIndex: 'in_date',
                    key: 'name',
                }, {
                    title: 'In Time',
                    dataIndex: 'in_time',
                    key: 'age',
                }, {
                    title: 'Token',
                    dataIndex: 'token',
                    key: 'token',
                }, {
                    title: 'Number',
                    dataIndex: 'Vnum',
                    key: 'Vnum',
                }, {
                    title: 'Type',
                    dataIndex: 'Vtype',
                    key: 'Vtype',
                }, {
                    title: 'Slot',
                    dataIndex: 'slot',
                    key: 'slot',
                }


                ];
                let trp = <Table dataSource={params.datax} columns={columns} />
                this.setState({
                    filtr: trp
                })
                this.showModal()
            }
            this.setState({
                loading: false,
                data: data,
                pagination,
            });
        });
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }

    render() {
        return (
            <div>
                <Modal
                    title="Basic Modal"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    style={{ width: '630px' }}
                >
                    {this.state.filtr}
                </Modal>
                <Table
                    columns={columns}
                    rowKey={this.state.data._id}
                    dataSource={this.state.data}
                    pagination={this.state.pagination}
                    loading={this.state.loading}
                    onChange={this.handleTableChange}
                />
            </div>
        )
    }
}
