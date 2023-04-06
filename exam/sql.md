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

### 插入

```sql
insert into user(id, username, password) values (10, 'juzi', 123456);
insert into user(id, username) values (11, 'cwz');
insert into user values (13, 'p990', 123456);

// 批量插入
insert into user values
    (14, 'name1', 123456),
    (15, 'name2', 123456);

```

### 修改

```sql
update user set username = '修改名字', password = 123 where id = 14;
```

### 删除

```sql
delete from user where id = 12;
```

### 视图

> 视图（view）也被称为虚表，即虚拟的表，是一组数据的逻辑表示，其本质是对应于一条select语句，结果集被赋予一个名字，即视图的名字
> 
> 视图本身并不包含任何数据，它只包含映射到基表的一个查询语句，当基表数据发生变化，视图数据也随之变化

```sql
// 以后对该视图进行插入、修改、删除操作时，会自动加上 = IS的条件
create view IS_Student as
    select no,name,age from Student where Sdept='IS' with check opinion;

// 删除视图
drop view IS_Student cascade // 该视图导出了其他视图 一并删除

// 更新视图 还要更新原表
update IS_Student set name='李晨' where no='20120202';
update Student set name='李晨' where no='20120202' and Sdept='IS';
```


