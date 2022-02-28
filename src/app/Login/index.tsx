import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Input, Button, Checkbox, Link, Message } from '@arco-design/web-react';
import { IconLock, IconUser } from '@arco-design/web-react/icon';
import { useNavigate } from 'react-router-dom';
import { useLocalStorageState } from 'ahooks';
import Banner from './modules/Banner';
import './mock/user';
import './index.less';

type IUserParams = {
  username: string;
  password: string;
};

const classPrefix = 'login';
const FormItem = Form.Item;

export const Login: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [userToken, setUserToken] = useLocalStorageState('userToken');
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // 判断是否登陆
    if (userToken) {
      navigate('/');
    }
  }, []);

  const onSubmit = () => {
    form.validate((err, values) => {
      if (err) {
        return;
      }
      const { username, password } = values;
      login({ username, password });
    });
  };

  const login = (params: IUserParams) => {
    setLoading(true);
    axios
      .post('/api/user/login', params)
      .then((res) => {
        const {
          status,
          msg,
          data: { token },
        } = res.data;
        console.log(msg);
        if (status === 'ok') {
          Message.success('登录成功');
          navigate('/');
          setUserToken(token);
        } else {
          Message.error(msg);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className={`${classPrefix}`}>
      <div className={`${classPrefix}-logo`}>
        <h1 style={{ margin: 0, marginLeft: '10px' }}>React Arco Admin</h1>
      </div>
      <div className={`${classPrefix}-left`}>
        <Banner />
      </div>
      <div className={`${classPrefix}-right`}>
        <div>
          <div className={`${classPrefix}-right-title`}>登录React Arco Admin</div>
          <Form
            form={form}
            style={{ width: 320 }}
            wrapperCol={{
              span: 24,
            }}
            initialValues={{
              username: 'admin',
              password: 'admin',
            }}
            onSubmit={onSubmit}
          >
            <FormItem field="username" rules={[{ required: true, message: '用户名不能为空' }]}>
              <Input prefix={<IconUser />} type="text" placeholder="用户名：admin" />
            </FormItem>
            <FormItem field="password" rules={[{ required: true, message: '密码不能为空' }]}>
              <Input.Password prefix={<IconLock />} placeholder="密码：admin" visibilityToggle />
            </FormItem>
            <FormItem>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Checkbox>记住密码</Checkbox>
                <Link>忘记密码</Link>
              </div>
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit" long loading={loading}>
                登录
              </Button>
            </FormItem>
            <FormItem>
              <Button type="text" long>
                注册账号
              </Button>
            </FormItem>
          </Form>
        </div>
        <div className={`${classPrefix}-right-footer`}>鄂ICP备18026800号-1</div>
      </div>
    </div>
  );
};
