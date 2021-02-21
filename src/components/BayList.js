import React, { Component } from 'react'
import { Avatar, Badge } from 'antd';
import { throws } from 'assert';

export default class BayList extends Component {
    render() {
        return (
            <div>
                <h1>Hello</h1>
                {
                    this.props.lst.map(ls => {
                        return <Badge status="success" className="uk-margin" dot><Avatar shape="square" />{ls.in_date}</Badge>
                    })
                }

            </div>
        )
    }
}
