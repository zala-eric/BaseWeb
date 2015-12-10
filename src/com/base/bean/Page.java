package com.base.bean;

import java.util.List;
import java.util.Map;


/**
 * 分页对象
 * 2014-11-26
 */
public class Page {

    /** 第一页 页号 */
    private static final int FIRST_PAGE_NUM = 1;

    /** 默认页面大小 */
    private static final int DEFAULT_PAGE_SIZE = 10;

    /** 页面大小 */
    private int pageSize = DEFAULT_PAGE_SIZE;

    /** 当前页号, 从1开始 */
    private int currentPage = FIRST_PAGE_NUM;
    
    /**
     * 当前记录数，供数据库分页查询
     */
    private int startNum = 0;
    
    /**
     * 总记录数
     */
    private int totleRows = 0;

    /** 结果集 */   
	private List<Map<String, Object>> dataList = null;

    /** 查询条件 */
    private Map<String, Object> param = null;

    public Page() {
    	super();
    }

    /**
     * @param page - 页码
     */
    public Page(Map<String, Object> selectParam) {
        this.param = selectParam;
		Object pSize = selectParam.get("pageSize");
		Object cur = selectParam.get("curPage");
		try {
        	this.currentPage = (null == cur) ? FIRST_PAGE_NUM : Integer.parseInt(cur.toString());
        } catch (NumberFormatException e) {
        	e.printStackTrace();
            this.currentPage = FIRST_PAGE_NUM;
        }
        try {
        	this.pageSize = (null == pSize) ? DEFAULT_PAGE_SIZE : Integer.parseInt(pSize.toString());
        } catch (NumberFormatException e) {
        	e.printStackTrace();
            this.pageSize = DEFAULT_PAGE_SIZE;
        }
        this.startNum = (this.currentPage - 1) * this.pageSize;
    }

    /**
     * @param page - 页码
     */
    public Page(String currentPage) {
        try {
        	this.currentPage = (null == currentPage) ? FIRST_PAGE_NUM : Integer.parseInt(currentPage);
        } catch (NumberFormatException e) {
        	e.printStackTrace();
            this.currentPage = FIRST_PAGE_NUM;
        }
        this.startNum = (this.currentPage - 1) * this.pageSize;
    }

    /**
     * @param page - 页码
     */
    public Page(String currentPage , String pageSize) {
        try {
        	this.currentPage = (null == currentPage) ? FIRST_PAGE_NUM : Integer.parseInt(currentPage);
        } catch (NumberFormatException e) {
        	e.printStackTrace();
            this.currentPage = FIRST_PAGE_NUM;
        }
        try {
        	this.pageSize = (null == pageSize) ? DEFAULT_PAGE_SIZE : Integer.parseInt(pageSize);
        } catch (NumberFormatException e) {
        	e.printStackTrace();
            this.pageSize = DEFAULT_PAGE_SIZE;
        }
        this.startNum = (this.currentPage - 1) * this.pageSize;
    }

    /* ######################################### */

    /**
     * @return Returns the currentPage.
     */
    public int getCurrentPage() {
        return currentPage;
    }

    public void setCurrentPage(int currentPage) {
        this.currentPage = currentPage;
    }

    public int getPageSize() {
        return pageSize;
    }
    
	public void setPageSize(int pageSize) {
        if (pageSize > 0) {
            this.pageSize = pageSize;
        }
    }

    /** 设置总记录数,并计算出总页数 */
    public void setTotleRows(String totleRows) {
        try {
        	if(null == totleRows) {
            	this.totleRows = 0;
        	} else {
        		this.setTotleRows(Integer.parseInt(totleRows) );
        	}
        } catch (NumberFormatException e) {
        	e.printStackTrace();
            this.totleRows = 0;
        }
    }

    /** 设置总记录数,并计算出总页数 */
    public void setTotleRows(int totleRow) {
    	this.totleRows = totleRow;
    }

    public int getTotleRows() {
		return totleRows;
	}

	public List<Map<String, Object>> getDataList() {
		return dataList;
	}

	public void setDataList(List<Map<String, Object>> dataList) {
		this.dataList = dataList;
	}

    /**
     * 返回无参数的limit map 
     */
    public Map<String, Object> getParam() {
        this.param.put("start", this.startNum);
        this.param.put("size", this.getPageSize());
        return this.param;
    }

    /**
     * @param param - 可设置SQL的查询条件(包括limit后的参数)
     */
	public void setParam(Map<String, Object> param) {
        this.param = param;
    }

	public int getStartNum() {
		return startNum;
	}

	public void setStartNum(int startNum) {
		this.startNum = startNum;
	}

}
