import React, { Component } from 'react'
import { Layout, Menu, Icon } from 'antd';
import One from "./One";
import Two from "./Two";
import OneFill from "./OneFil";
import Slot from './Slot';
// import Three from "./Three";
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

export default class LayoutTemp extends Component {

    state = {
        collapsed: false,
        viee: null

    };
    componentDidMount() {
        this.setState({
            viee: <One />
        })
    }
    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({ collapsed });
    }
    HandleOption(e) {
        // console.log('clicked');
        console.log(e.key)
        // this.setState({
        //     whichview: e.key
        // })
        // console.log(this.state.whichview);
        if (e.key === '1') {
            console.log('key is one')

            this.setState({
                viee: <One />
            })
        }
        else if (e.key === '2') {
            console.log('key is two')
            this.setState({
                viee: <Two />
            })
        }
        else if (e.key === '3') {
            console.log('key is two')
            this.setState({
                viee: <Slot />
            })
        }
        else if (e.key === '9') {
            console.log('key is two')
            this.setState({
                viee: <OneFill />
            })
        }
    }

    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider
                    collapsible
                    collapsed={this.state.collapsed}
                    onCollapse={this.onCollapse}
                >
                    <div className="logo" />
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1" style={{ height: '60px', paddingTop: '12px' }} onClick={this.HandleOption.bind(this)}>
                            <Icon type="car" style={{ fontSize: '25px' }} />

                            <span style={{ fontFamily: '"Quicksand", sans-serif', letterSpacing: '0.5px' }}>Car Parked</span>
                        </Menu.Item>
                        <Menu.Item key="2" onClick={this.HandleOption.bind(this)}>
                            <Icon type="area-chart" style={{ fontSize: '25px' }} />
                            <span style={{ fontFamily: '"Quicksand", sans-serif', letterSpacing: '0.5px' }}>Analytics</span>
                        </Menu.Item>
                        <Menu.Item key="3" onClick={this.HandleOption.bind(this)}>
                            <Icon type="box-plot" style={{ fontSize: '25px' }} />
                            <span style={{ fontFamily: '"Quicksand", sans-serif', letterSpacing: '0.5px' }}>Slots</span>
                        </Menu.Item>

                    </Menu>
                </Sider>
                <Layout>
                    {/* <Header style={{ background: '#fff', padding: 0 }} /> */}
                    <Content style={{ margin: '0 16px' }}>

                        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                            {this.state.viee}
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        SDMC ©2019 Created by Pinkfry
          </Footer>
                </Layout>
            </Layout>
        )
    }
}
