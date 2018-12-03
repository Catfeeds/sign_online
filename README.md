在线签约系统

>协议书任务原始PDF文件位置
````
admin/public/upload/protocol/pdf/ . $protocol_id. '.pdf';
````

>签约状态

1:保密工作责任书

状态码 | 注释
------ | ------
-1| 审核失败
0 | 待签约
1 | 已签约,待保密委审核
2 | 保密委已审核,待后台管理员审核
9 | 签约完成,无法修改

2:员工保密承诺书

状态码 | 注释
------ | ------
-1| 审核失败
0 | 待签约
1 | 员工已签约,待部门负责人签约
2 | 部门负责人已签约,已添加保密委印章,待后台管理员审核
9 | 签约完成,无法修改

3:涉密人员保证书

状态码 | 注释
------ | ------
-1| 审核失败
0 | 待签约
1 | 涉密人员已签约,已添加保密委印章,待后台管理员审核
9 | 签约完成,无法修改

4:涉密人员离岗保密承诺书