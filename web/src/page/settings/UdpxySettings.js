import { Button, Form, Input, message, Radio } from 'antd';
import React, { useEffect } from 'react';
import { fetchUdpxySettings, updateUdpxySettings } from '../../api';

function UdpxySettings({ form }) {
  const { getFieldDecorator, setFieldsValue, getFieldValue, validateFields } = form;
  const formItemLayout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 14 },
  };

  useEffect(() => {
    fetchUdpxySettings().then(settings => {
      setFieldsValue({
        enable: settings.addr !== null,
        addr: settings.addr
      });
    })
  }, [setFieldsValue]);

  const handleSubmit = e => {
    e.preventDefault();
    validateFields(error => {
      if (!error) {
        updateUdpxySettings({
          addr: (form.getFieldValue('enable') && form.getFieldValue('addr')) || null
        }).then(() => message.success('Successfully saved'), () => message.error('Save failed
'));
      }
    })
  }

  return (
    <Form {...formItemLayout} onSubmit={handleSubmit}>
      <Form.Item label="Open">
        {getFieldDecorator('enable', {
          rules: [{
            required: true,
            message: 'Please Choose'
          }]
        })(
          <Radio.Group>
            <Radio value={true}>Yes</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
        )}
      </Form.Item>
      <Form.Item label="Address">
        {getFieldDecorator('addr', {
          rules: [{
            required: getFieldValue('enable') === true,
            message: 'Address cannot be empty
'
          }]
        })(
          <Input placeholder="192.168.1.254:1212" disabled={!getFieldValue('enable')} />
        )}
      </Form.Item>
      <Form.Item wrapperCol={{ span: 2, offset: 2 }}>
        <Button type="primary" htmlType="submit">
          Preservation
          </Button>
      </Form.Item>
    </Form>
  );
};

export default Form.create()(UdpxySettings);
