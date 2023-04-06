### 查询

```sql
select * from edu_course; // 查询所有
select id as 标志, title as 名称 from edu_course ec; // 别名
select distinct title as 名称 from edu_course ec; // 去重


// 条件
select title from edu_course where price >= 88; // 价格大于等于88
select * from edu_course where title like ''; // % 任意多个 _ 一个
select * from user where username is null; // 姓名为空
select * from user where id = 3 and password = 123; // id为3 密码为123

// 聚集函数
select count(teacher_id) from edu_course ec; // 计数 含重复
select count(distinct teacher_id) from edu_course ec; // 计数 去重
select teacher_id from edu_course group_by teacher_id; // 分组 不能查全部
select teacher_id from edu_course group_by teacher_id having teacher_id = 1; // 分组 筛选

// 表连接
select * from edu_course ec, edu_course_description ecd where ec.id = ecd.id;
select * from edu_course ec1, edu_course ec2 where ec1.id = ec2.id;
// 左外连接
select * from edu_course ec left outer join edu_course_description ecd on ec.id = ecd.id;
select * from edu_course ec inner join edu_course_description ecd on ec.id = ecd.id;

// 多表查询
select * from edu_course ec,edu_course_description ecd,edu_chapter ech where ec.id = ecd.id and ec.id = ech.course_id;

// 嵌套查询
select * from edu_course ec where teacher_id in (
    select teacher_id from edu_course where teacher_id = 10 or teacher_id = 0
)

// any all
select * from edu_course ec where price > any ( // 大于0
    select price from edu_course where price < 10 // 小于10 （这里是0，2）
)

// exists
// 查询没有一门课是不选修的
select name from Student where not exists ( // 查询学生
    select * from Course where not exists ( // 查询选修了所有课
        select * from sc where Sao = Student.Sao and Cao = Caurse.Cao
)))


// 集合查询 union 并 intersect 交 except 差
select * from Student where Sdept="cs" union select * from Student where Sage <=19; // 并
```






















