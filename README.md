1、如何根据输入的关键词获取到匹配的信息
 =>获取用户输入的关键词，向百度的服务器发送一个请求，百度会返回匹配的结果
   URL：https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd= (wd传递的内容就是用户输入的关键词)

 =>从我们的项目向百度发请求，属于跨域资源请求，不能直接使用AJAX获取了，百度支持的请求方式是JSONP
   > JSONP原理：需要服务器端支持(百度服务器端已经做了支持)，利用SCRIPT标签不存在域的限制，我们通过它的SRC，向指定的服务器发送一个请求，发送请求的同时，把客户端的一个方法也传递给服务器（一般通过callback=xxx，百度服务器端要求传递方式cb=xxx）；最后服务器端把需要返回的数据及传递的方法拼接为 “函数名(数据)” 这样的字符串返回给客户端；客户端接收到数据后，把本地的对应方法执行，数据当做实参传递给方法；

   基于第三方模块：jsonp 实现跨域请求
   > $ yarn add jsonp
   > ...


2、把获取的数据赋值给组件内部的STATE（不直接操作DOM），由STATE去触发视图的重新渲染




//=>INIT
defaultProps
constructor
componentWillMount
render
componentDidMount

//=>UPDATE
shouldComponentUpdate (nextProps,nextState)=>boolean
componentWillUpdate
componentDidUpdate

//=>UPDATE PROPS
componentWillReceiveProps newProps

//=>UN-INIT
componentWillUnmount




