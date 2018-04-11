import React from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import jsonp from 'jsonp';
import './search.css';


export default class Search extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            show: false,
            val: '',
            n: -1 //=>记录当前选中LI的索引(默认-1:不选中任何一个)
        };
    }

    queryData = ev => {
        //=>获取数据(JSONP)
        let val = ev.target.value.trim();
        this.setState({
            val
        });

        new Promise((resolve, reject) => {
            jsonp(`https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=${val}`,
                {param: 'cb'},
                (err, data) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(data['s']);//=>匹配信息的数组传递给THEN
                }
            );
        }).then(data => {
            //=>数据获取成功,修改组件STATE信息(触发视图重新渲染)
            this.setState({
                data, //=>data:data
                n: -1, //=>每一次数据改变，都让N回归初始值（防止上次上下切换存留的数值对本次的最新结果产生影响）
            });
        });
    };

    handKey = ev => {
        let code = ev.keyCode;//=>获取按键的键盘码  上(38) 下(40) Enter(13) ...
        let {n, data} = this.state,
            len = data.length;
        switch (code) {
            case 38:
                n--;
                n < 0 ? n = len - 1 : null;
                break;
            case 40:
                n++;
                n > len - 1 ? n = 0 : null;
                break;
            case 13:
                window.location.href = `https://www.baidu.com/s?wd=${ev.target.value.trim()}`;
                break;
        }
        if (code === 38 || code === 40) {
            this.setState({
                n,
                val: data[n] || ''
            });
        }
    };

    render() {
        let {data, show, n, val} = this.state;

        return <div className="panel panel-default">
            <header className="panel-heading">
                <input type="text"
                       className="form-control"
                       placeholder="请输入要查询的关键词"
                       value={val}
                       onChange={this.queryData}
                       onBlur={ev => this.setState({show: false})}
                       onFocus={ev => this.setState({show: true})}
                       onKeyUp={this.handKey}
                       autoFocus/>
            </header>
            <main className="panel-body"
                  style={{display: show ? 'block' : 'none'}}>
                <ul className="list-group">
                    {
                        data.map((item, index) => {
                            const active = n === index ? 'active' : '';
                            return <li className={`list-group-item ${active}`}
                                       key={index}>
                                {item}
                            </li>;
                        })
                    }
                </ul>
            </main>
        </div>;
    }
}

