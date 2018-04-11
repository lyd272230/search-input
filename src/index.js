import React from 'react';
import ReactDOM from 'react-dom';
import Search from './component/search';

class Shop extends React.Component {
    constructor() {
        super();
        this.state = {
            n: 1
        };
    }

    render() {
        console.log('HAHA');
        let {n} = this.state;
        return <div className="panel panel-default">
            <div className="panel-heading">
            单价：￥100.00 <br/>
        总价：￥{n * 100}
    </div>
        <div className="panel-body">
            <input type="text" value={n}
        onChange={ev => {
            let val = ev.target.value.trim(),
                reg = /^\d+(\.\d*)?$/;
            if (val.length > 0) {
                if (!reg.test(val)) {
                    val = 0;
                }
            }
            this.setState({
                n: val
            });
        }}/>{/*当输入过程中，文本框中的内容需要跟着进行改变，我们需要修改STATE中的N的值，值修改了，组件重新渲染，文本框中的值也是渲染为最新的状态值*/}
        &nbsp;&nbsp;&nbsp;&nbsp;
    <a href="javascript:;" className="btn btn-success"
        onClick={ev => {
            this.setState({
                n: ++n
            }, () => {
                //=>执行完成RENDER（重新渲染完成后）触发的回调函数
            });//=>SET-SATE是异步操作，执行它，并没有立即重新渲染组件，而是先把同步任务执行完成，完成后再去执行RENDER实现重新渲染
            console.log('ok');
        }}>+</a>
        </div>
        </div>;
    }
}


ReactDOM.render(<div>
<Shop/>

<Search/>
</div>, window.root);