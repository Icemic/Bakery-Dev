import React from 'react';
import ReactDOM from 'react-dom';
import { Alert, Table, Modal, Button, Input, Form, Row, Col, Icon } from 'antd';
const FormItem = Form.Item;

export default function FormModal(config) {
    
    let div = document.createElement('div');
    document.body.appendChild(div);
    
    let self;
    
    function handleOk() {   //暂不支持Promise
        let ok = document.getElementById('FormModal').reportValidity();
        if (!ok) return;
        let json = self.getFieldsValue();
        if (config.onOk)
            config.onOk(error, close, json);
        else
            close();
    }
    
    function handleCancel() {   //暂不支持Promise
        if (config.onCancel)
            config.onCancel(error, close);
        else
            close();
    }

    
    function close() {
        self.setState({
            visible: false
        });
        ReactDOM.unmountComponentAtNode(div);
        div.parentNode.removeChild(div);
    }
    function error(msg) {
        self.setState({
            msg: msg
        });
    }
    
    let Body = React.createClass({
        getInitialState() {
            return {
                visible: true,
                msg: ''
            }
        },
        handleChange() {
            this.setState({
                msg: ''
            })
        },
        render() {
            const { getFieldProps } = this.props.form;
            const formItemLayout = {
                    labelCol: { span: 6 },
                    wrapperCol: { span: 14 },
                };
            return (
                <Modal title="添加更新"
                    visible={this.state.visible}
                    onOk={handleOk}
                    onCancel={handleCancel}>
                    <Form horizontal onSubmit={null} onChange={this.handleChange} id='FormModal'>
                        {config.fields && config.fields.map((item, index) => {
                            return <FormItem key={index}
                            {...formItemLayout}
                            label={item.label}>
                            <Input type={item.type} placeholder={item.placeholder} {...getFieldProps(item.name) } required={item.required} />
                        </FormItem>
                        })}
                        
                    </Form>
                    { this.state.msg ? <Alert message={this.state.msg} type="error" /> : null }
                </Modal>
            )
        }
    });
    
    Body = Form.create()(Body);
    
    ReactDOM.render(<Body />, div, function () {
        self = this;
        if (config.defaultData)
            this.setFieldsValue(config.defaultData);
    })
}