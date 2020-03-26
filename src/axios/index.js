import axios from 'axios';
// import Cookies from 'js-cookie'

const CancelToken = axios.CancelToken;
const logout = () => {
    // location.href = `${window.location.origin}/login`
};

export const request = options => {
    const {
        type = 'get', //请求方式
        data, //数据体
        url, //请求地址
        end, //请求结束事件
        content = 'json'
    } = options;
    let status = 'error';
    let response;
    let cancel;
    const config = {
        headers: {
            'content-type': `application/${content}`,
            // Authorization: `Bearer ${Cookies.get('_pass_token')}`
        },
        withCredentials: true,
        crossDomain: true,
        cancelToken: new CancelToken(c => {
            cancel = c;
        })
    };
    axios({
        method: type,
        url: `${url}`,
        data,
        ...config,
        timeout: 30000
    })
        .then(res => {
            switch (res.data.code) {
                case 0:
                    status = 'success';
                    response = res.data.data;
                    break;
                case 301:
                    logout();
                    break;
                case 401:
                    logout();
                    break;
                case 11005:
                    location.href = `${window.location.origin}/login`;
                    break;
                default:
                    if (res.data == '' && res.status == 200) {
                        // 接口只有200 响应的情况
                        status = 'success';
                    } else {
                        // message.warning(
                        //     (res.data && res.data.msg && res.data.msg.substring(0, 400)) || '接口错误！'
                        // );
                        response = { msg: '接口错误' };
                    }
                    break;
            }
        })
        .catch(err => {
            if (!axios.isCancel(err)) {
                if (err.response && err.response.status === 401) {
                    logout();
                } else if (err.response && err.response.status === 400) {
                    // 临时措施，严格来说返回的code码不对
                    response = { msg: '账号或密码有误！' };
                } else {
                    // message.error(err.toString().substring(0, 400));
                }
            }
        })
        .then(() => {
            end(status, response);
        });
    return cancel;
};
