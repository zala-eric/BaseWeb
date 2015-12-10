package com.base.table.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.alibaba.fastjson.JSONArray;

public class EmpeeServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;

	/**
	 * Constructor of the object.
	 */
	public EmpeeServlet() {
		super();
	}

	/**
	 * Destruction of the servlet. <br>
	 */
	public void destroy() {
		super.destroy();
	}

	/**
	 * The doGet method of the servlet. <br>
	 *
	 * This method is called when a form has its tag value method equals to get.
	 * 
	 * @param request the request send by the client to the server
	 * @param response the response send by the server to the client
	 * @throws ServletException if an error occurred
	 * @throws IOException if an error occurred
	 */
	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		this.doPost(request, response);
	}

	/**
	 * The doPost method of the servlet. <br>
	 *
	 * This method is called when a form has its tag value method equals to post.
	 * 
	 * @param request the request send by the client to the server
	 * @param response the response send by the server to the client
	 * @throws ServletException if an error occurred
	 * @throws IOException if an error occurred
	 */
	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		int pageSize = Integer.parseInt(request.getParameter("pageSize"));	// 每页显示数量
		int startNum = Integer.parseInt(request.getParameter("startNum"));	// 当前记录数开始序列，默认从0开始

		// STEP-1 按照pageSize+startNum作为分页查询条件查询数据
		// STEP-2 按照分页查询条件查询总记录数
		
		// STEP-3 
		// 返回格式以JSON格式{data={totleRows:25,
		// dataList=[{EMPEE_CODE:'A001',EMPEE_NAME:'张三',EMPEE_ACCT:'zhangsan',USER_TYPE_NAME:'系统用户',EMPEE_MOB_NO:'13888888888',STATE_NAME:'有效'}]}}
		Map<String,Object> responseMap = new HashMap<String,Object>(0);
		responseMap.put("totleRows", 98);
		int maxSize = startNum + pageSize;
		if(maxSize > 98 ) {
			maxSize = 98;
		}
		List<Map<String,Object>> dataList = new ArrayList<Map<String,Object>>(0);
		for (int i = startNum; i < maxSize; i++) {
			Map<String,Object> userMap = new HashMap<String,Object>(0);
			userMap.put("EMPEE_CODE", "A00" + i);
			userMap.put("EMPEE_NAME", "张三" + i);
			userMap.put("EMPEE_ACCT", "zhangsan" + i);
			userMap.put("USER_TYPE_NAME", "系统用户");
			userMap.put("EMPEE_MOB_NO", "138888888" + i);
			userMap.put("STATE_NAME", "有效");
			dataList.add(userMap);
		}
		responseMap.put("dataList", dataList);
		Map<String,Object> jsonMap = new HashMap<String,Object>(0);
		jsonMap.put("data", responseMap);
		System.out.println(JSONArray.toJSONString(jsonMap));
		PrintWriter out = response.getWriter();
		out.println(JSONArray.toJSONString(jsonMap));
		out.flush();
		out.close();
	}
	
}
