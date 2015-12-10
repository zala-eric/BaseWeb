<%@ page language="java" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>UI开发使用说明书V0.1</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	
  </head>
  
  <body>
	<center><font color="red" size="5">UI开发使用说明书V0.1</font></center><br/>
	<font color="#000000">弹出层使用说明，基于div：</font>
	<a href="api/artDialog-api.html">进入</a><br/>
	
	<font color="#000000">弹出层使用说明，基于iframe：</font>
	<a href="api/iframeTools-api.html">进入</a><br/>
	
	<font color="#000000">表单校验使用说明：</font>
	<a href="api/niceValidator-api.html">进入</a><br/>
	
	<font color="#000000">进度条使用说明：</font>
	<a href="api/progressbar-api.html">进入</a><br/>
	
	<font color="#000000">列表分页控件使用说明：</font>
	<a href="api/tablePage-api.html">进入</a><br/>
	
	<font color="#000000">多标签panel页使用说明：</font>
	<a href="api/panels-api.html">进入</a><br/>
	
	<font color="#000000">自定义树使用说明：</font>
	<a href="api/tree-api.html">进入</a><br/>
	
	<font color="#000000">时间控件使用说明：</font>
	<a href="api/my97-api.html">进入</a><br/>
	
	<font color="#000000">跨平台兼容：</font>
	<font color="blue">兼容：IE6+、Firefox、Chrome、Safari、Opera以及iPad等移动设备。</font><br/>
  </body>
</html>
